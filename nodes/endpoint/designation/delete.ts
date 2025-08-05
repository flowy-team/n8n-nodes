import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function deleteDesignation(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
  const designationId = this.getNodeParameter('designationId', index) as number;
  const simplify = this.getNodeParameter('simplify', index, true) as boolean;

  const responseData = await ApiRequest.call(this, 'DELETE', `/designation/${designationId}`);

  // If simplify is false, return raw API response
  if (!simplify) {
    return [{ json: responseData, pairedItem: { item: index } }];
  }

  // Return simplified response for delete operation
  const simplifiedResponse = {
    success: responseData.status || true,
    message: responseData.message || 'Designation deleted successfully',
    deletedId: designationId,
  };

  return [{ json: simplifiedResponse, pairedItem: { item: index } }];
}
