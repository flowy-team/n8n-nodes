import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function deleteTicketType(
  this: IExecuteFunctions, 
  index: number
): Promise<INodeExecutionData[]> {
  const ticketTypeId = this.getNodeParameter('ticketTypeId', index) as string;
  const simplify = this.getNodeParameter('simplify', index, true) as boolean;

  const responseData = await ApiRequest.call(this, 'DELETE', `/ticket-type/${ticketTypeId}`);

  // If simplify is false, return raw API response
  if (!simplify) {
    return [{ json: responseData, pairedItem: { item: index } }];
  }

  // Simplify the response according to n8n UX guidelines
  // Instead of returning API metadata, return useful confirmation
  const result = {
    success: true,
    typeId: ticketTypeId,
    action: 'deleted',
    timestamp: new Date().toISOString(),
    // Remove: status, message (API metadata)
  };

  return [{ json: result, pairedItem: { item: index } }];
}

export default deleteTicketType;
