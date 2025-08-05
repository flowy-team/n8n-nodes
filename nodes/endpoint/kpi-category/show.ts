import { INodeExecutionData, IExecuteFunctions } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function showKpiCategory(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const kpiCategoryId = this.getNodeParameter('kpiCategoryId', index) as string;
	
	const responseData = await ApiRequest.call(this, 'GET', `/indicator-category/${kpiCategoryId}`);

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