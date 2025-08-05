import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function getKPIs(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const simplify = this.getNodeParameter('simplify', index, true) as boolean;
	const sortDirection = this.getNodeParameter('sortDirection', index, 'DESC') as string;
	const sortField = this.getNodeParameter('sortField', index, 'id') as string;

	const qs: IDataObject = {};

	// Add sorting parameters
	if (sortField) {
		qs.sort_field = sortField;
	}
	if (sortDirection) {
		qs.sort_direction = sortDirection;
	}

	const responseData = await ApiRequest.call(this, 'GET', '/indicators', {}, qs);

	// If simplify is false, return raw API response
	if (!simplify) {
		return [{ json: responseData, pairedItem: { item: index } }];
	}

	// Handle different response structures for simplified output
	let kpiArray;
	if (responseData.data && Array.isArray(responseData.data)) {
		// Standard structure: { status: true, message: "...", data: [...] }
		kpiArray = responseData.data;
	} else if (Array.isArray(responseData)) {
		// Direct array structure: [...]
		kpiArray = responseData;
	} else {
		// Fallback: return the raw response
		return [{ json: responseData, pairedItem: { item: index } }];
	}

	// Simplify each KPI in the array
	const simplifiedKPIs = kpiArray.map((kpi: any) => ({
		id: kpi.id,
		companyId: kpi.company_id,
		indicatorTypeId: kpi.indicator_type_id,
		title: kpi.title,
		type: kpi.type,
		occurance: kpi.occurance,
		direction: kpi.direction,
		unitValue: kpi.unit_value,
		indicatorParentId: kpi.indicator_parent_id,
		targetValue: kpi.target_value,
		targetFixed: kpi.target_fixed,
		remark: kpi.remark,
		calculated: kpi.calculated,
		calculatedValue: kpi.calculated_value,
		aggregate: kpi.aggregate,
		description: kpi.description || 'No description',
		colorFail: kpi.color_fail,
		colorPass: kpi.color_pass,
		sort: kpi.sort,
		modelId: kpi.model_id,
		modelType: kpi.model_type,
		startDate: kpi.start_date,
		endDate: kpi.end_date,
		score: kpi.score,
		createdBy: kpi.created_by,
		planningStrategyTargetId: kpi.planning_strategy_target_id,
		createdAt: kpi.created_at,
		updatedAt: kpi.updated_at,
		category: kpi.category || 'No category',
		team: kpi.team,
		personal: kpi.personal,
		permissions: kpi.permissions,
		// Remove unnecessary API metadata for simplified view
	}));

	// Return array of simplified KPIs
	return simplifiedKPIs.map((kpi: any) => ({
		json: kpi,
		pairedItem: { item: index }
	}));
} 