import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function showKPI(
	this: IExecuteFunctions, 
	index: number
): Promise<INodeExecutionData[]> {
	const indicatorId = this.getNodeParameter('indicatorId', index) as string;
	
	const responseData = await ApiRequest.call(this, 'GET', `/indicators/${indicatorId}`);

	// Always return simplified response - handle different response structures
	let kpiData;
	if (responseData.data) {
		// Standard structure: { status: true, message: "...", data: {...} }
		kpiData = responseData.data;
	} else if (responseData.id) {
		// Direct structure: { id: 123, title: "...", ... }
		kpiData = responseData;
	} else {
		// Fallback: return the raw response
		return [{ json: responseData, pairedItem: { item: index } }];
	}

	// Simplify the response according to n8n UX guidelines
	const simplifiedKPI = {
		id: kpiData.id,
		companyId: kpiData.company_id,
		indicatorTypeId: kpiData.indicator_type_id,
		title: kpiData.title,
		category: kpiData.category,
		type: kpiData.type,
		occurance: kpiData.occurance,
		viewOptions: kpiData.view_options,
		aggregate: kpiData.aggregate,
		direction: kpiData.direction,
		unitValue: kpiData.unit_value,
		indicatorParentId: kpiData.indicator_parent_id,
		targetValue: kpiData.target_value,
		targetFixed: kpiData.target_fixed,
		remark: kpiData.remark,
		calculated: kpiData.calculated,
		calculatedValue: kpiData.calculated_value,
		description: kpiData.description,
		colorFail: kpiData.color_fail,
		colorPass: kpiData.color_pass,
		sort: kpiData.sort,
		modelId: kpiData.model_id,
		modelType: kpiData.model_type,
		startDate: kpiData.start_date,
		endDate: kpiData.end_date,
		score: kpiData.score,
		createdBy: kpiData.created_by,
		planningStrategyTargetId: kpiData.planning_strategy_target_id,
		team: kpiData.team,
		personal: kpiData.personal,
		employeeAccess: kpiData.employee_access,
		permissions: kpiData.permissions,
		createdAt: kpiData.created_at,
		updatedAt: kpiData.updated_at,
		// Remove internal fields and keep user-friendly names
	};

	return [{ json: simplifiedKPI, pairedItem: { item: index } }];
} 