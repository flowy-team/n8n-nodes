import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

interface IDepartmentData {
  team_name?: string;
  description?: string;
  parent_id?: number;
}

export async function updateDepartment(
  this: IExecuteFunctions, 
  index: number
): Promise<INodeExecutionData[]> {
  const departmentId = this.getNodeParameter('departmentId', index) as number;
	const teamName = this.getNodeParameter('teamName', index) as string;

	const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;

	const body: IDepartmentData = {
		team_name: teamName,
	};

	if (additionalFields.description) {
		body.description = additionalFields.description as string;
	}

	if (additionalFields.parentId) {
		body.parent_id = additionalFields.parentId as number;
	}

  const responseData = await ApiRequest.call(this, 'PUT', `/department/${departmentId}`, body);

  // Always return simplified response - handle different response structures
  let departmentData;
  if (responseData.data) {
    // Standard structure: { status: true, message: "...", data: {...} }
    departmentData = responseData.data;
  } else if (responseData.id) {
    // Direct structure: { id: 123, team_name: "...", ... }
    departmentData = responseData;
  } else {
    // Fallback: return the raw response
    return [{ json: responseData, pairedItem: { item: index } }];
  }

  // Simplify the response according to n8n UX guidelines
  const simplifiedDepartment = {
    id: departmentData.id,
    teamName: departmentData.team_name,
    description: departmentData.description,
    parentId: departmentData.parent_id,
    companyId: departmentData.company_id,
    lft: departmentData._lft,
    rgt: departmentData._rgt,
    createdAt: departmentData.created_at,
    updatedAt: departmentData.updated_at,
    // Remove internal fields and keep user-friendly names
  };

  return [{ json: simplifiedDepartment, pairedItem: { item: index } }];
}
