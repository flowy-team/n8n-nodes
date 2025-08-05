import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function getTicket(
  this: IExecuteFunctions, 
  index: number
): Promise<INodeExecutionData[]> {
  const ticketId = this.getNodeParameter('ticketId', index) as string;
  const simplify = this.getNodeParameter('simplify', index, true) as boolean;

  const responseData = await ApiRequest.call(this, 'GET', `/tickets/${ticketId}`);

  // If simplify is false, return raw API response
  if (!simplify) {
    return [{ json: responseData, pairedItem: { item: index } }];
  }

  // Handle different response structures for simplified output
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

export async function getAllTickets(
  this: IExecuteFunctions, 
  index: number
): Promise<INodeExecutionData[]> {
  const simplify = this.getNodeParameter('simplify', index, true) as boolean;
  const sortDirection = this.getNodeParameter('sortDirection', index, 'DESC') as string;
  const sortField = this.getNodeParameter('sortField', index, 'created_at') as string;

  // Build query parameters for sorting
  const queryParams = new URLSearchParams();
  if (sortField) {
    queryParams.append('sort_field', sortField);
  }
  if (sortDirection) {
    queryParams.append('sort_direction', sortDirection);
  }

  const queryString = queryParams.toString();
  const url = queryString ? `/tickets?${queryString}` : '/tickets';

  const responseData = await ApiRequest.call(this, 'GET', url);

  // If simplify is false, return raw API response
  if (!simplify) {
    return [{ json: responseData, pairedItem: { item: index } }];
  }

  // Handle different response structures for simplified output
  let ticketsArray;
  if (responseData.data && Array.isArray(responseData.data)) {
    // Standard structure: { status: true, message: "...", data: [...] }
    ticketsArray = responseData.data;
  } else if (Array.isArray(responseData)) {
    // Direct array structure: [...]
    ticketsArray = responseData;
  } else {
    // Fallback: return the raw response
    return [{ json: responseData, pairedItem: { item: index } }];
  }

  // Simplify each ticket in the array
  const simplifiedTickets = ticketsArray.map((ticket: any) => ({
    id: ticket.id,
    ticketNumber: ticket.ticket_number,
    subject: ticket.subject,
    status: ticket.status,
    priority: ticket.priority,
    userId: ticket.user_id,
    agentId: ticket.agent_id || 'Unassigned',
    typeId: ticket.type_id || 'Not Specified',
    type: ticket.type || 'Not Specified',
    channelId: ticket.channel_id || 'Not Specified',
    dueDate: ticket.due_date,
    createdAt: ticket.created_at,
    updatedAt: ticket.updated_at,
    // Remove API metadata: status, message, pagination, company_id, deleted_at, created_on
  }));

  // Return array of simplified tickets
  return simplifiedTickets.map((ticket: any) => ({
    json: ticket,
    pairedItem: { item: index }
  }));
}

export default getTicket; 