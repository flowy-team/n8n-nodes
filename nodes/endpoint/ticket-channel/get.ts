import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function getTicketChannel(
  this: IExecuteFunctions, 
  index: number
): Promise<INodeExecutionData[]> {
  const ticketChannelId = this.getNodeParameter('ticketChannelId', index) as string;
  const simplify = this.getNodeParameter('simplify', index, true) as boolean;

  const responseData = await ApiRequest.call(this, 'GET', `/ticket-channel/${ticketChannelId}`);

  // If simplify is false, return raw API response
  if (!simplify) {
    return [{ json: responseData, pairedItem: { item: index } }];
  }

  // Handle different response structures for simplified output
  let channelData;
  if (responseData.data) {
    // Standard structure: { status: true, message: "...", data: {...} }
    channelData = responseData.data;
  } else if (responseData.id) {
    // Direct structure: { id: 123, channel_name: "...", ... }
    channelData = responseData;
  } else {
    // Fallback: return the raw response
    return [{ json: responseData, pairedItem: { item: index } }];
  }

  // Simplify the response according to n8n UX guidelines
  const simplifiedChannel = {
    id: channelData.id,
    channelName: channelData.channel_name,
    createdAt: channelData.created_at,
    updatedAt: channelData.updated_at,
    // Remove: status, message, company_id (internal reference)
  };

  return [{ json: simplifiedChannel, pairedItem: { item: index } }];
}

export default getTicketChannel;
