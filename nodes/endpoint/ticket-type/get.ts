import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function getTicketType(
  this: IExecuteFunctions, 
  index: number
): Promise<INodeExecutionData[]> {
  const ticketTypeId = this.getNodeParameter('ticketTypeId', index) as string;
  const simplify = this.getNodeParameter('simplify', index, true) as boolean;

  const responseData = await ApiRequest.call(this, 'GET', `/ticket-type/${ticketTypeId}`);

  // If simplify is false, return raw API response
  if (!simplify) {
    return [{ json: responseData, pairedItem: { item: index } }];
  }

  // Handle different response structures for simplified output
  let typeData;
  if (responseData.data) {
    // Standard structure: { status: true, message: "...", data: {...} }
    typeData = responseData.data;
  } else if (responseData.id) {
    // Direct structure: { id: 123, type: "...", ... }
    typeData = responseData;
  } else {
    // Fallback: return the raw response
    return [{ json: responseData, pairedItem: { item: index } }];
  }

  // Simplify the response according to n8n UX guidelines
  const simplifiedType = {
    id: typeData.id,
    type: typeData.type,
    createdAt: typeData.created_at,
    updatedAt: typeData.updated_at,
    // Remove: status, message, company_id (internal reference)
  };

  return [{ json: simplifiedType, pairedItem: { item: index } }];
}

export default getTicketType;
