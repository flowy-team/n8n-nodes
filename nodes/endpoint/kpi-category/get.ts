import { INodeExecutionData, IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function getKpiCategories(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
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

	const responseData = await ApiRequest.call(this, 'GET', '/indicator-category', {}, qs);

	// If simplify is false, return raw API response
	if (!simplify) {
		return [{ json: responseData, pairedItem: { item: index } }];
	}

	// Handle different response structures for simplified output
	let categoriesArray;
	if (responseData.data && Array.isArray(responseData.data)) {
		// Standard structure: { status: true, message: "...", data: [...] }
		categoriesArray = responseData.data;
	} else if (Array.isArray(responseData)) {
		// Direct array structure: [...]
		categoriesArray = responseData;
	} else {
		// Fallback: return the raw response
		return [{ json: responseData, pairedItem: { item: index } }];
	}

	// Simplify each KPI category in the array
	const simplifiedCategories = categoriesArray.map((category: any) => ({
		id: category.id,
		companyId: category.company_id,
		name: category.name,
		createdAt: category.created_at,
		updatedAt: category.updated_at,
		// Remove unnecessary API metadata for simplified view
	}));

	// Return array of simplified KPI categories
	return simplifiedCategories.map((category: any) => ({
		json: category,
		pairedItem: { item: index }
	}));
} 