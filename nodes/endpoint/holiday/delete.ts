import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function deleteHoliday(
  this: IExecuteFunctions, 
  index: number
): Promise<INodeExecutionData[]> {
  const holidayId = this.getNodeParameter('holidayId', index) as string;
  
  const responseData = await ApiRequest.call(this, 'DELETE', `/holiday/${holidayId}`);

  // Handle delete response - usually returns success/status message
  let result;
  if (responseData.status !== undefined) {
    // Standard structure: { status: true, message: "..." }
    result = {
      success: responseData.status,
      message: responseData.message || 'Holiday deleted successfully',
      holidayId: holidayId,
    };
  } else {
    // Fallback: return the raw response
    result = responseData;
  }

  return [{ json: result, pairedItem: { item: index } }];
}
