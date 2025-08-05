import { IDataObject, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function createDesignation(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
  const designationName = this.getNodeParameter('designationName', index) as string;
  const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;
  const simplify = this.getNodeParameter('simplify', index, true) as boolean;

  const body: IDataObject = {
    designation_name: designationName,
  };

  // Add optional fields if provided
  if (additionalFields.description) {
    body.description = additionalFields.description as string;
  }

  const responseData = await ApiRequest.call(this, 'POST', '/designation', body);

  // If simplify is false, return raw API response
  if (!simplify) {
    return [{ json: responseData, pairedItem: { item: index } }];
  }

  // Return simplified response for created designation
  const simplifiedDesignation = {
    id: responseData.data?.id || responseData.id,
    companyId: responseData.data?.company_id || responseData.company_id,
    name: responseData.data?.name || responseData.name,
    description: responseData.data?.description || responseData.description || 'No description',
    createdAt: responseData.data?.created_at || responseData.created_at,
    updatedAt: responseData.data?.updated_at || responseData.updated_at,
    membersCount: responseData.data?.members_count || responseData.members_count || 0,
  };

  return [{ json: simplifiedDesignation, pairedItem: { item: index } }];
}
