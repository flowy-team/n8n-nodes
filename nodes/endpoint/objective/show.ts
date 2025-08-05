import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function showObjectives(
	this: IExecuteFunctions, 
	itemIndex: number
): Promise<INodeExecutionData[]> {
	const simplify = this.getNodeParameter('simplify', itemIndex, true) as boolean;
	const sortDirection = this.getNodeParameter('sortDirection', itemIndex, 'DESC') as string;
	const sortField = this.getNodeParameter('sortField', itemIndex, 'created_at') as string;
	const type = this.getNodeParameter('type', itemIndex, '') as string;
	const modelId = this.getNodeParameter('modelId', itemIndex, '') as string;
	const cycleId = this.getNodeParameter('cycleId', itemIndex, '') as string;

	const qs: IDataObject = {};

	// Add type filter if provided (use 'type' parameter as per API)
	if (type && type.trim()) {
		qs.type = type.trim();
	}

	// Add model ID filter if provided (for team/personal objectives)
	if (modelId && modelId.trim()) {
		qs.model_id = modelId.trim();
	}

	// Add cycle ID filter if provided (use 'cycle_id' parameter as per API)
	if (cycleId && cycleId.trim()) {
		qs.cycle_id = cycleId.trim();
	}

	// Add sorting parameters
	if (sortField) {
		qs.sort_field = sortField;
	}
	if (sortDirection) {
		qs.sort_direction = sortDirection;
	}

	// Use the correct API endpoint as per your Postman example
	const responseData = await ApiRequest.call(this, 'GET', '/objectives', {}, qs);

	// If simplify is false, return raw API response
	if (!simplify) {
		return [{ json: responseData, pairedItem: { item: itemIndex } }];
	}

	// Handle different response structures for simplified output
	let objectivesArray;
	if (responseData.data && responseData.data.data && Array.isArray(responseData.data.data)) {
		// Nested pagination structure: { status: true, message: "...", data: { current_page: 1, data: [...] } }
		objectivesArray = responseData.data.data;
	} else if (responseData.data && Array.isArray(responseData.data)) {
		// Standard structure: { status: true, message: "...", data: [...] }
		objectivesArray = responseData.data;
	} else if (Array.isArray(responseData)) {
		// Direct array structure: [...]
		objectivesArray = responseData;
	} else {
		// Fallback: return the raw response
		return [{ json: responseData, pairedItem: { item: itemIndex } }];
	}

	// Handle empty results
	if (!objectivesArray || objectivesArray.length === 0) {
		return [{ 
			json: { 
				status: true, 
				message: 'No objectives found', 
				data: [] 
			}, 
			pairedItem: { item: itemIndex } 
		}];
	}

	// Simplify each item in the array - handling the actual data structure returned
	const simplifiedObjectives = objectivesArray.map((item: any) => {
		// Check if this looks like objective data or key result data
		if (item.objective_id !== undefined) {
			// This appears to be key result data associated with objectives
			return {
				id: item.id,
				leaderModelId: item.leader_model_id,
				objectiveId: item.objective_id,
				title: item.title,
				description: item.description,
				objectiveType: item.objective_type,
				unitValue: item.unit_value,
				weight: item.weight,
				confidence: item.confidence,
				initialValue: item.initial_value,
				targetValue: item.target_value,
				currentValue: item.current_value,
				currentPercentage: item.current_percentage,
				order: item.order,
				remark: item.remark,
				sort: item.sort,
				createdAt: item.created_at,
				updatedAt: item.updated_at,
				// Remove: company_id, objective_override, leader_model_type, 
				// task_id, planning_strategy_target_id, deleted_at
			};
		} else {
			// This appears to be actual objective data
			return {
				id: item.id,
				leaderModelId: item.leader_model_id,
				title: item.title,
				description: item.description || 'No Description',
				objectiveType: item.objective_type,
				modelId: item.model_id,
				modelType: item.model_type,
				performanceCycleId: item.performance_cycle_id,
				weight: item.weight,
				confidence: item.confidence,
				resultPercentage: item.result_percentage,
				keyResultCount: item.key_result_count,
				startedAt: item.started_at,
				finishedAt: item.finished_at,
				createdAt: item.created_at,
				updatedAt: item.updated_at,
				// Include simplified key results if they exist
				keyResults: item.key_results ? item.key_results.map((kr: any) => ({
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
			};
		}
	});

	// Return array of simplified objectives/key results
	return simplifiedObjectives.map((item: any) => ({
		json: item,
		pairedItem: { item: itemIndex }
	}));
} 