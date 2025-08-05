import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function createKPI(
	this: IExecuteFunctions, 
	index: number
): Promise<INodeExecutionData[]> {
	const body: any = {};

	// Required fields
	const title = this.getNodeParameter('title', index) as string;
	const category = this.getNodeParameter('category', index) as string;
	const type = this.getNodeParameter('type', index) as string;
	const occurance = this.getNodeParameter('occurance', index) as string;
	const view_options = this.getNodeParameter('view_options', index) as string;
	const aggregate = this.getNodeParameter('aggregate', index) as string;

	body.title = title;
	body.category = category;
	body.type = type;
	body.occurance = occurance;
	body.view_options = view_options;
	body.aggregate = aggregate;

	// Additional fields from collection
	const additionalFields = this.getNodeParameter('additionalFields', index) as any;
	
	if (additionalFields.target_value) body.target_value = additionalFields.target_value;
	if (additionalFields.unit_value) body.unit_value = additionalFields.unit_value;
	if (additionalFields.sort) body.sort = additionalFields.sort;
	if (additionalFields.team) body.team = additionalFields.team;
	if (additionalFields.personal) body.personal = additionalFields.personal;
	if (additionalFields.description) body.description = additionalFields.description;
	if (additionalFields.indicator_parent_id) body.indicator_parent_id = additionalFields.indicator_parent_id;
	if (additionalFields.calculated_value) body.calculated_value = additionalFields.calculated_value;
	if (additionalFields.color_range) body.color_range = additionalFields.color_range;
	
	// Handle employee_access as array
	if (additionalFields.employee_access) {
		body.employee_access = additionalFields.employee_access.split(',').map((id: string) => id.trim());
	}

	const responseData = await ApiRequest.call(this, 'POST', '/indicators', body);

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
		title: kpiData.title,
		category: kpiData.category,
		type: kpiData.type,
		occurance: kpiData.occurance,
		viewOptions: kpiData.view_options,
		aggregate: kpiData.aggregate,
		targetValue: kpiData.target_value,
		unitValue: kpiData.unit_value,
		sort: kpiData.sort,
		team: kpiData.team,
		personal: kpiData.personal,
		description: kpiData.description,
		indicatorParentId: kpiData.indicator_parent_id,
		calculatedValue: kpiData.calculated_value,
		colorRange: kpiData.color_range,
		employeeAccess: kpiData.employee_access,
		companyId: kpiData.company_id,
		createdAt: kpiData.created_at,
		updatedAt: kpiData.updated_at,
		// Remove internal fields and keep user-friendly names
	};

	return [{ json: simplifiedKPI, pairedItem: { item: index } }];
} 