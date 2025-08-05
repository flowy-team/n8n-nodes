import { INodeExecutionData, IExecuteFunctions } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function createKpiCategory(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const body: any = {};
	
	// Get the indicator_type_name parameter
	const indicatorTypeName = this.getNodeParameter('indicator_type_name', index) as string;
	if (indicatorTypeName) {
		body.indicator_type_name = indicatorTypeName;
	}

	const responseData = await ApiRequest.call(this, 'POST', '/indicator-category', body);

	// Always return simplified response - handle different response structures
	let categoryData;
	if (responseData.data) {
		// Standard structure: { status: true, message: "...", data: {...} }
		categoryData = responseData.data;
	} else if (responseData.id) {
		// Direct structure: { id: 123, name: "...", ... }
		categoryData = responseData;
	} else {
		// Fallback: return the raw response
		return [{ json: responseData, pairedItem: { item: index } }];
	}

	// Simplify the response according to n8n UX guidelines
	const simplifiedCategory = {
		id: categoryData.id,
		name: categoryData.name,
		companyId: categoryData.company_id,
		createdAt: categoryData.created_at,
		updatedAt: categoryData.updated_at,
		// Remove internal fields and keep user-friendly names
	};

	return [{ json: simplifiedCategory, pairedItem: { item: index } }];
} 