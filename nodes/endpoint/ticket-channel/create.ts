import type { IDataObject, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function createTicketChannel(
  this: IExecuteFunctions, 
  index: number
): Promise<INodeExecutionData[]> {
  const channelName = this.getNodeParameter('channelName', index) as string;

  const body: IDataObject = {
    channel_name: channelName,
  };

  const responseData = await ApiRequest.call(this, 'POST', '/ticket-channel', body);

  // Always return simplified response - handle different response structures
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

export default createTicketChannel;
