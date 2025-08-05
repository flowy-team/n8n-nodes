import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function getAllClients(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const simplify = this.getNodeParameter('simplify', index, true) as boolean;
  const sortDirection = this.getNodeParameter('sortDirection', index, 'ASC') as string;
  const sortField = this.getNodeParameter('sortField', index, 'name') as string;
  const returnAll = this.getNodeParameter('returnAll', index, false) as boolean;

  const qs: IDataObject = {};

  // Handle pagination
  if (!returnAll) {
    const limit = this.getNodeParameter('limit', index, 10) as number;
    const page = this.getNodeParameter('page', index, 1) as number;
    
    if (limit < 1 || limit > 1000) {
      throw new Error('Limit must be between 1 and 1000');
    }
    
    qs.limit = limit;
    qs.page = page;
  }

  // Add sorting parameters
  if (sortField) {
    qs.sort_field = sortField;
  }
  if (sortDirection) {
    qs.sort_direction = sortDirection;
  }

  // Get additional fields for filtering
  const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;
  
  // Add search parameter if provided
  if (additionalFields.search) {
    const searchTerm = (additionalFields.search as string).trim();
    if (searchTerm) {
      qs.search = searchTerm;
    }
  }

  // Add status filter if provided and not 'all'
  if (additionalFields.status && additionalFields.status !== 'all') {
    qs.status = additionalFields.status;
  }

  // Add date range filters if provided
  if (additionalFields.startDate) {
    const startDate = new Date(additionalFields.startDate as string);
    qs.startDate = startDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  }

  if (additionalFields.endDate) {
    const endDate = new Date(additionalFields.endDate as string);
    qs.endDate = endDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  }

  // Add specific client ID filter if provided
  if (additionalFields.client) {
    const clientId = (additionalFields.client as string).trim();
    if (clientId && clientId !== 'all') {
      qs.client = clientId;
    }
  }

  try {
    // Make API request
    const responseData = await ApiRequest.call(this, 'GET', '/clients', {}, qs);

    // If simplify is false, return raw API response
    if (!simplify) {
      return [{ json: responseData, pairedItem: { item: index } }];
    }

    // Handle different response structures for simplified output
    let clientsArray;
    if (responseData.data && Array.isArray(responseData.data)) {
      // Standard structure: { status: true, message: "...", data: [...] }
      clientsArray = responseData.data;
    } else if (Array.isArray(responseData)) {
      // Direct array structure: [...]
      clientsArray = responseData;
    } else {
      // Fallback: return the raw response
      return [{ json: responseData, pairedItem: { item: index } }];
    }

    // Simplify each client in the array
    const simplifiedClients = clientsArray.map((client: any) => ({
      id: client.id,
      userId: client.user_id,
      name: client.name || 'No Name',
      companyName: client.company_name || 'No Company',
      email: client.email,
      status: client.status,
      createdAt: client.created_at,
      // Remove API metadata: status, message, pagination from parent object
    }));

    // Return array of simplified clients
    return simplifiedClients.map((client: any) => ({
      json: client,
      pairedItem: { item: index }
    }));

  } catch (error) {
    // Improve error messages for user
    if (error.httpCode === 404) {
      const fallbackResponse = { status: false, message: 'No clients found', data: [] };
      return simplify 
        ? [] 
        : [{ json: fallbackResponse, pairedItem: { item: index } }];
    }
    
    if (error instanceof Error) {
      throw new Error(`Failed to retrieve clients: ${error.message}`);
    }
    
    throw new Error('An unknown error occurred while retrieving clients');
  }
}

export default getAllClients;
