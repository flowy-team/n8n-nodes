import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function getAllTicketChannels(
  this: IExecuteFunctions, 
  index: number
): Promise<INodeExecutionData[]> {
  try {
  const simplify = this.getNodeParameter('simplify', index, true) as boolean;
  const sortDirection = this.getNodeParameter('sortDirection', index, 'ASC') as string;
  const sortField = this.getNodeParameter('sortField', index, 'channel_name') as string;

  // Build query parameters for sorting
  const queryParams = new URLSearchParams();
  if (sortField) {
    queryParams.append('sort_field', sortField);
  }
  if (sortDirection) {
    queryParams.append('sort_direction', sortDirection);
  }

  const queryString = queryParams.toString();
  const url = queryString ? `/ticket-channel?${queryString}` : '/ticket-channel';

  const responseData = await ApiRequest.call(this, 'GET', url);

  // If simplify is false, return raw API response
  if (!simplify) {
    return [{ json: responseData, pairedItem: { item: index } }];
  }

  // Handle different response structures for simplified output
  let channelsArray;
  if (responseData.data && Array.isArray(responseData.data)) {
    // Standard structure: { status: true, message: "...", data: [...] }
    channelsArray = responseData.data;
    } else if (responseData.data && responseData.data.data && Array.isArray(responseData.data.data)) {
      // Nested pagination structure: { status: true, message: "...", data: { current_page: 1, data: [...] } }
      channelsArray = responseData.data.data;
  } else if (Array.isArray(responseData)) {
    // Direct array structure: [...]
    channelsArray = responseData;
  } else {
      // Fallback: return the raw response if no recognizable structure
    return [{ json: responseData, pairedItem: { item: index } }];
  }

    // Handle empty results
    if (!channelsArray || channelsArray.length === 0) {
      return [{ 
        json: { 
          status: true, 
          message: 'No ticket channels found', 
          data: [] 
        }, 
        pairedItem: { item: index } 
      }];
    }

  // Simplify each channel in the array
  const simplifiedChannels = channelsArray.map((channel: any) => ({
    id: channel.id,
    channelName: channel.channel_name,
      companyId: channel.company_id,
    createdAt: channel.created_at,
    updatedAt: channel.updated_at,
      // Clean, simplified structure with camelCase naming
  }));

  // Return array of simplified channels
  return simplifiedChannels.map((channel: any) => ({
    json: channel,
    pairedItem: { item: index }
  }));

  } catch (error) {
    // Improved error handling
    if (error.httpCode === 404) {
      return [{ 
        json: { 
          status: false, 
          message: 'No ticket channels found', 
          data: [] 
        }, 
        pairedItem: { item: index } 
      }];
    }
    
    if (error instanceof Error) {
      throw new Error(`Failed to retrieve ticket channels: ${error.message}`);
    }
    
    throw new Error('An unknown error occurred while retrieving ticket channels');
  }
}

export default getAllTicketChannels;
