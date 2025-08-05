import type { IDataObject, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function updateTicketType(
  this: IExecuteFunctions, 
  index: number
): Promise<INodeExecutionData[]> {
  const ticketTypeId = this.getNodeParameter('ticketTypeId', index) as string;
  const type = this.getNodeParameter('type', index) as string;

  const body: IDataObject = {
    type,
  };

  const responseData = await ApiRequest.call(this, 'PUT', `/ticket-type/${ticketTypeId}`, body);

  // Always return simplified response - handle different response structures
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

export default updateTicketType;
