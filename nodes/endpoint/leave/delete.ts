import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function deleteLeave(
  this: IExecuteFunctions, 
  index: number
): Promise<INodeExecutionData[]> {
  const leaveId = this.getNodeParameter('leaveId', index) as string;
  
  if (!leaveId) {
    throw new Error('Leave ID is required');
  }

  const responseData = await ApiRequest.call(this, 'DELETE', `/leave/${leaveId}`);

  // Handle delete response - usually returns success/status message
  let result;
  if (responseData.status !== undefined) {
    // Standard structure: { status: true, message: "..." }
    result = {
      success: responseData.status,
      message: responseData.message || 'Leave deleted successfully',
      leaveId: leaveId,
    };
  } else {
    // Fallback: return success with leave ID
    result = {
      success: true,
      message: 'Leave deleted successfully',
      leaveId: leaveId,
    };
  }

  return [{ json: result, pairedItem: { item: index } }];
}
