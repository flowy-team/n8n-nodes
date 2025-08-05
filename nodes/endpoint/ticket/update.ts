import type { IDataObject, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function updateTicket(
  this: IExecuteFunctions, 
  index: number
): Promise<INodeExecutionData[]> {
  const ticketId = this.getNodeParameter('ticketId', index) as string;
  const priority = this.getNodeParameter('priority', index) as string;
  const message = this.getNodeParameter('message', index, '') as string;

  const additionalFields = this.getNodeParameter('additionalFields', index) as IDataObject;

  const body: IDataObject = {
    priority,
    message,
    ...additionalFields,
  };

  const responseData = await ApiRequest.call(this, 'PUT', `/tickets/${ticketId}`, body);

  // Always return simplified response - handle different response structures
  let ticketData;
  if (responseData.data) {
    // Standard structure: { status: true, message: "...", data: {...} }
    ticketData = responseData.data;
  } else if (responseData.id) {
    // Direct structure: { id: 123, subject: "...", ... }
    ticketData = responseData;
  } else {
    // Fallback: return the raw response
    return [{ json: responseData, pairedItem: { item: index } }];
  }

  // Simplify the response according to n8n UX guidelines
  const simplifiedTicket = {
    id: ticketData.id,
    ticketNumber: ticketData.ticket_number,
    subject: ticketData.subject,
    status: ticketData.status,
    priority: ticketData.priority,
    userId: ticketData.user_id,
    agentId: ticketData.agent_id || 'Unassigned',
    typeId: ticketData.type_id || 'Not Specified',
    type: ticketData.type || 'Not Specified',
    channelId: ticketData.channel_id || 'Not Specified',
    dueDate: ticketData.due_date,
    createdAt: ticketData.created_at,
    updatedAt: ticketData.updated_at,
    // Remove API metadata: status, message, company_id, deleted_at, created_on
  };

  return [{ json: simplifiedTicket, pairedItem: { item: index } }];
}

export default updateTicket; 