import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function getAllPerformanceCycles(
	this: IExecuteFunctions, 
	itemIndex: number
): Promise<INodeExecutionData[]> {
	const sortDirection = this.getNodeParameter('sortDirection', itemIndex, 'DESC') as string;
	const sortField = this.getNodeParameter('sortField', itemIndex, 'created_at') as string;

	const qs: IDataObject = {};

	// Add sorting parameters
	if (sortField) {
		qs.sort_field = sortField;
	}
	if (sortDirection) {
		qs.sort_direction = sortDirection;
	}

	const responseData = await ApiRequest.call(this, 'GET', '/performance-cycle', {}, qs);

	// Always return simplified response - handle different response structures
	let cyclesArray;
	if (responseData.data && responseData.data.data && Array.isArray(responseData.data.data)) {
		// Nested pagination structure: { status: true, message: "...", data: { current_page: 1, data: [...] } }
		cyclesArray = responseData.data.data;
	} else if (responseData.data && Array.isArray(responseData.data)) {
		// Standard structure: { status: true, message: "...", data: [...] }
		cyclesArray = responseData.data;
	} else if (Array.isArray(responseData)) {
		// Direct array structure: [...]
		cyclesArray = responseData;
	} else {
		// Fallback: return the raw response
		return [{ json: responseData, pairedItem: { item: itemIndex } }];
	}

	// Handle empty results
	if (!cyclesArray || cyclesArray.length === 0) {
		return [{ 
			json: { 
				status: true, 
				message: 'No performance cycles found', 
				data: [] 
			}, 
			pairedItem: { item: itemIndex } 
		}];
	}

	// Simplify each performance cycle in the array
	const simplifiedCycles = cyclesArray.map((cycle: any) => ({
		id: cycle.id,
		name: cycle.name,
		cycleType: cycle.cycle_type,
		type: cycle.type,
		startedAt: cycle.started_at,
		finishedAt: cycle.finished_at,
		resultsValue: cycle.results_value,
		vision: cycle.vision || 'No Vision',
		mission: cycle.mission || 'No Mission',
		displayLock: cycle.display_lock,
		previousCycleId: cycle.previous_cycle_id,
		createdAt: cycle.created_at,
		updatedAt: cycle.updated_at,
		// Remove API metadata: status, message, pagination, company_id
	}));

	// Return array of simplified performance cycles
	return simplifiedCycles.map((cycle: any) => ({
		json: cycle,
		pairedItem: { item: itemIndex }
	}));
}
