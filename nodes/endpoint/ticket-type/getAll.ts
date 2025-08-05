import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function getAllTicketTypes(
  this: IExecuteFunctions, 
  index: number
): Promise<INodeExecutionData[]> {
  const simplify = this.getNodeParameter('simplify', index, true) as boolean;
  const sortDirection = this.getNodeParameter('sortDirection', index, 'ASC') as string;
  const sortField = this.getNodeParameter('sortField', index, 'type') as string;

  // Build query parameters for sorting
  const queryParams = new URLSearchParams();
  if (sortField) {
    queryParams.append('sort_field', sortField);
  }
  if (sortDirection) {
    queryParams.append('sort_direction', sortDirection);
  }

  const queryString = queryParams.toString();
  const url = queryString ? `/ticket-type?${queryString}` : '/ticket-type';

  const responseData = await ApiRequest.call(this, 'GET', url);

  // If simplify is false, return raw API response
  if (!simplify) {
    return [{ json: responseData, pairedItem: { item: index } }];
  }

  // Handle different response structures for simplified output
  let typesArray;
  if (responseData.data && Array.isArray(responseData.data)) {
    // Standard structure: { status: true, message: "...", data: [...] }
    typesArray = responseData.data;
  } else if (Array.isArray(responseData)) {
    // Direct array structure: [...]
    typesArray = responseData;
  } else {
    // Fallback: return the raw response
    return [{ json: responseData, pairedItem: { item: index } }];
  }

  // Simplify each type in the array
  const simplifiedTypes = typesArray.map((type: any) => ({
    id: type.id,
    type: type.type,
    createdAt: type.created_at,
    updatedAt: type.updated_at,
    // Remove API metadata: status, message, pagination, company_id
  }));

  // Return array of simplified types
  return simplifiedTypes.map((type: any) => ({
    json: type,
    pairedItem: { item: index }
  }));
}

export default getAllTicketTypes;
