import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function showKeyResults(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const sortDirection = this.getNodeParameter('sortDirection', index, 'DESC') as string;
	const sortField = this.getNodeParameter('sortField', index, 'created_at') as string;
	const objectiveId = this.getNodeParameter('objectiveId', index, '') as string;

	const qs: IDataObject = {};

	// Pagination parameters
	const limit = this.getNodeParameter('limit', index, 10) as number;
	const page = this.getNodeParameter('page', index, 1) as number;

	qs.limit = limit;
	qs.page = page;

	// Add objective ID filter if provided
	if (objectiveId && objectiveId.trim()) {
		qs.objective_id = objectiveId.trim();
	}

	// Add sorting parameters
	if (sortField) {
		qs.sort_field = sortField;
	}
	if (sortDirection) {
		qs.sort_direction = sortDirection;
	}

	const responseData = await ApiRequest.call(this, 'GET', '/key-result', {}, qs);

	// Always return simplified response - handle different response structures
	let keyResultsArray;
	if (responseData.data && responseData.data.data && Array.isArray(responseData.data.data)) {
		// Nested pagination structure: { status: true, message: "...", data: { current_page: 1, data: [...] } }
		keyResultsArray = responseData.data.data;
	} else if (responseData.data && Array.isArray(responseData.data)) {
		// Standard structure: { status: true, message: "...", data: [...] }
		keyResultsArray = responseData.data;
	} else if (Array.isArray(responseData)) {
		// Direct array structure: [...]
		keyResultsArray = responseData;
	} else {
		// Fallback: return the raw response
		return [{ json: responseData, pairedItem: { item: index } }];
	}

	// Handle empty results
	if (!keyResultsArray || keyResultsArray.length === 0) {
		return [{ 
			json: { 
				status: true, 
				message: 'No key results found', 
				data: [] 
			}, 
			pairedItem: { item: index } 
		}];
	}

	// Simplify each key result in the array
	const simplifiedKeyResults = keyResultsArray.map((keyResult: any) => ({
		id: keyResult.id,
		objectiveId: keyResult.objective_id,
		title: keyResult.title,
		description: keyResult.description || 'No Description',
		objectiveType: keyResult.objective_type,
		unitValue: keyResult.unit_value,
		weight: keyResult.weight,
		confidence: keyResult.confidence,
		initialValue: keyResult.initial_value,
		targetValue: keyResult.target_value,
		currentValue: keyResult.current_value,
		currentPercentage: keyResult.current_percentage,
		createdAt: keyResult.created_at,
		updatedAt: keyResult.updated_at,
		// Remove API metadata: status, message, pagination, company_id, deleted_at, 
		// task_id, planning_strategy_target_id, leader_model_id, leader_model_type, 
		// order, objective_override, remark, sort
	}));

	// Return array of simplified key results
	return simplifiedKeyResults.map((keyResult: any) => ({
		json: keyResult,
		pairedItem: { item: index }
	}));
} 