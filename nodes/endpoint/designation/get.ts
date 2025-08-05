import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function getDesignation(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
  const designationId = this.getNodeParameter('designationId', index) as string;
  const simplify = this.getNodeParameter('simplify', index, true) as boolean;
  
  const responseData = await ApiRequest.call(this, 'GET', `/designation/${designationId}`);

  // If simplify is false, return raw API response
  if (!simplify) {
    return [{ json: responseData, pairedItem: { item: index } }];
  }

  // Return simplified response for single designation
  const designation = responseData.data || responseData;
  const simplifiedDesignation = {
    id: designation.id,
    companyId: designation.company_id,
    name: designation.name,
    description: designation.description || 'No description',
    createdAt: designation.created_at,
    updatedAt: designation.updated_at,
    membersCount: designation.members_count || 0,
  };

  return [{ json: simplifiedDesignation, pairedItem: { item: index } }];
}

export async function getAllDesignations(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
  try {
    const returnAll = this.getNodeParameter('returnAll', index, false) as boolean;
    const simplify = this.getNodeParameter('simplify', index, true) as boolean;
    const sortDirection = this.getNodeParameter('sortDirection', index, 'DESC') as string;
    const sortField = this.getNodeParameter('sortField', index, 'id') as string;
    const qs: IDataObject = {};

    // Handle pagination - use offset-based pagination as the original API expects
    if (!returnAll) {
      const limit = this.getNodeParameter('limit', index, 50) as number;
      const page = this.getNodeParameter('page', index, 1) as number;
      
      if (limit < 1 || limit > 1000) {
        throw new Error('Limit must be between 1 and 1000');
      }
      
      qs.limit = limit;
      // Convert page to offset (page 1 = offset 0, page 2 = offset limit, etc.)
      qs.offset = (page - 1) * limit;
    }

    // Add sorting parameters (direct fields)
    if (sortField) {
      qs.sort_field = sortField;
    }

    if (sortDirection) {
      qs.sort_direction = sortDirection;
    }

    // Make API request
    const responseData = await ApiRequest.call(this, 'GET', '/designation', {}, qs);
    
    // If simplify is false, return raw API response
    if (!simplify) {
      return [{ json: responseData, pairedItem: { item: index } }];
    }

    // Handle different response structures for simplified output
    let designationsArray;
    if (responseData.data && Array.isArray(responseData.data)) {
      // Standard structure: { status: true, message: "...", data: [...] }
      designationsArray = responseData.data;
    } else if (Array.isArray(responseData)) {
      // Direct array structure: [...]
      designationsArray = responseData;
    } else {
      // Fallback: return the raw response if no data found
      return [{ json: responseData, pairedItem: { item: index } }];
    }

    // Simplify each designation in the array
    const simplifiedDesignations = designationsArray.map((designation: any) => ({
      id: designation.id,
      companyId: designation.company_id,
      name: designation.name,
      description: designation.description || 'No description',
      createdAt: designation.created_at,
      updatedAt: designation.updated_at,
      membersCount: designation.members_count || 0,
      // Remove unnecessary API metadata for simplified view
    }));

    // Return array of simplified designations
    return simplifiedDesignations.map((designation: any) => ({
      json: designation,
      pairedItem: { item: index }
    }));

  } catch (error) {
    // Improve error messages for user
    if (error.httpCode === 404) {
      return [{ json: { status: false, message: 'No designations found', data: [] }, pairedItem: { item: index } }];
    }
    
    if (error instanceof Error) {
      throw new Error(`Failed to retrieve designations: ${error.message}`);
    }
    
    throw new Error('An unknown error occurred while retrieving designations');
  }
}
