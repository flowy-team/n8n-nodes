import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function deleteDepartment(
  this: IExecuteFunctions, 
  index: number
): Promise<INodeExecutionData[]> {
  const departmentId = this.getNodeParameter('departmentId', index) as number;
  const responseData = await ApiRequest.call(this, 'DELETE', `/department/${departmentId}`);

  // Handle delete response - usually returns success/status message
  let result;
  if (responseData.status !== undefined) {
    // Standard structure: { status: true, message: "..." }
    result = {
      success: responseData.status,
      message: responseData.message || 'Department deleted successfully',
      departmentId: departmentId,
    };
  } else {
    // Fallback: return the raw response
    result = responseData;
  }

  return [{ json: result, pairedItem: { item: index } }];
}
