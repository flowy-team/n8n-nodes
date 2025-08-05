import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function createObjective(this: IExecuteFunctions, itemIndex: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', itemIndex) as string;
	const obj_title = this.getNodeParameter('obj_title', itemIndex) as string;
	const weight = this.getNodeParameter('weight', itemIndex) as string;
	const st_date = this.getNodeParameter('st_date', itemIndex) as string;
	const fin_date = this.getNodeParameter('fin_date', itemIndex) as string;
	
	// Additional fields from collection
	const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as any;
	const type = additionalFields.type || 'team';
	const currentCycle = additionalFields.currentCycle || '';
	const key_result_parent_id = additionalFields.key_result_parent_id || null;
	const description = additionalFields.description || '';
	const confidence = additionalFields.confidence || '2';
	const leader_model_id = additionalFields.leader_model_id || '';
	const view_options = additionalFields.view_options || 'everyone';
	const employee_access = additionalFields.employee_access || [];
	const obj_remarks = additionalFields.obj_remarks || null;

	const body: any = {
		obj_title,
		weight,
		st_date,
		fin_date,
		type,
		description,
		confidence,
		view_options,
	};

	// Add ID field if provided
	if (id) body.id = id;

	// Add optional fields if provided
	if (currentCycle) body.currentCycle = currentCycle;
	if (key_result_parent_id) body.key_result_parent_id = key_result_parent_id;
	if (leader_model_id) body.leader_model_id = leader_model_id;
	if (employee_access && employee_access.length > 0) body.employee_access = employee_access;
	if (obj_remarks) body.obj_remarks = obj_remarks;

	const responseData = await ApiRequest.call(this, 'POST', '/objectives', body);

	// Always return simplified response - handle different response structures
	let objectiveData;
	if (responseData.data) {
		// Standard structure: { status: true, message: "...", data: {...} }
		objectiveData = responseData.data;
	} else if (responseData.id || responseData.obj_title) {
		// Direct structure: { id: 123, obj_title: "...", ... }
		objectiveData = responseData;
	} else {
		// Fallback: return the raw response
		return [{ json: responseData, pairedItem: { item: itemIndex } }];
	}

	// Simplify the response according to n8n UX guidelines
	const simplifiedObjective = {
		id: objectiveData.id,
		title: objectiveData.obj_title || objectiveData.title,
		weight: objectiveData.weight,
		startDate: objectiveData.st_date,
		endDate: objectiveData.fin_date,
		type: objectiveData.type,
		description: objectiveData.description,
		confidence: objectiveData.confidence,
		leaderModelId: objectiveData.leader_model_id,
		viewOptions: objectiveData.view_options,
		currentCycle: objectiveData.currentCycle,
		keyResultParentId: objectiveData.key_result_parent_id,
		employeeAccess: objectiveData.employee_access,
		remarks: objectiveData.obj_remarks,
		createdAt: objectiveData.created_at,
		updatedAt: objectiveData.updated_at,
		// Remove API metadata: status, message, company_id, etc.
	};

	return [{ json: simplifiedObjective, pairedItem: { item: itemIndex } }];
} 