import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function deletePerformanceCycle(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const performanceCycleId = this.getNodeParameter('performanceCycleId', index) as string;
  
  const responseData = await ApiRequest.call(this, 'DELETE', `/performance-cycle/${performanceCycleId}`);

  // Handle different response structures for delete operations
  let deleteResponse;
  if (responseData.status !== undefined && responseData.message) {
    // Standard API response: { status: true, message: "Performance cycle deleted successfully" }
    deleteResponse = {
      success: responseData.status,
      message: responseData.message,
      performanceCycleId: performanceCycleId,
      deletedAt: new Date().toISOString(),
    };
  } else if (responseData.data) {
    // Response with deleted cycle data: { status: true, message: "...", data: {...} }
    deleteResponse = {
      success: true,
      message: responseData.message || 'Performance cycle deleted successfully',
      performanceCycleId: performanceCycleId,
      deletedCycle: {
        id: responseData.data.id,
        name: responseData.data.name,
        cycleType: responseData.data.cycle_type,
      },
      deletedAt: new Date().toISOString(),
    };
  } else {
    // Fallback: assume success if no error was thrown
    deleteResponse = {
      success: true,
      message: 'Performance cycle deleted successfully',
      performanceCycleId: performanceCycleId,
      deletedAt: new Date().toISOString(),
    };
  }

  return [{ json: deleteResponse, pairedItem: { item: index } }];
}

export default deletePerformanceCycle;
