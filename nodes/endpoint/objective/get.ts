import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function getObjective(this: IExecuteFunctions, itemIndex: number): Promise<INodeExecutionData[]> {
	const objectiveId = this.getNodeParameter('objectiveId', itemIndex) as string;

	const responseData = await ApiRequest.call(this, 'GET', `/objectives/${objectiveId}`);

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
		modelId: objectiveData.model_id,
		modelType: objectiveData.model_type,
		performanceCycleId: objectiveData.performance_cycle_id,
		viewOptions: objectiveData.view_options,
		currentCycle: objectiveData.currentCycle,
		keyResultParentId: objectiveData.key_result_parent_id,
		employeeAccess: objectiveData.employee_access,
		remarks: objectiveData.obj_remarks,
		resultPercentage: objectiveData.result_percentage,
		keyResultCount: objectiveData.key_result_count,
		startedAt: objectiveData.started_at,
		finishedAt: objectiveData.finished_at,
		createdAt: objectiveData.created_at,
		updatedAt: objectiveData.updated_at,
		// Include simplified key results if they exist
		keyResults: objectiveData.key_results ? objectiveData.key_results.map((kr: any) => ({
			id: kr.id,
			leaderModelId: kr.leader_model_id,
			objectiveId: kr.objective_id,
			title: kr.title,
			description: kr.description || 'No Description',
			objectiveType: kr.objective_type,
			unitValue: kr.unit_value,
			weight: kr.weight,
			confidence: kr.confidence,
			initialValue: kr.initial_value,
			targetValue: kr.target_value,
			currentValue: kr.current_value,
			currentPercentage: kr.current_percentage,
			createdAt: kr.created_at,
			updatedAt: kr.updated_at,
		})) : [],
		// Remove API metadata: status, message, company_id, etc.
	};

	return [{ json: simplifiedObjective, pairedItem: { item: itemIndex } }];
} 