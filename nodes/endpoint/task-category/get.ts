import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function getTaskCategory(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const categoryId = this.getNodeParameter('categoryId', index) as string;
	const responseData = await ApiRequest.call(this, 'GET', `/task-category/${categoryId}`);

	// Always return simplified response - handle different response structures
	let categoryData;
	if (responseData.data) {
		categoryData = responseData.data;
	} else if (responseData.id) {
		categoryData = responseData;
	} else {
		return [{ json: responseData, pairedItem: { item: index } }];
	}

	const simplifiedCategory = {
		id: categoryData.id,
		categoryName: categoryData.category_name,
		companyId: categoryData.company_id,
		createdAt: categoryData.created_at,
		updatedAt: categoryData.updated_at,
	};

	return [{ json: simplifiedCategory, pairedItem: { item: index } }];
}

export async function getAllTaskCategories(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const limit = this.getNodeParameter('limit', index, 10) as number;
	const page = this.getNodeParameter('page', index, 1) as number;
	const search = this.getNodeParameter('search', index, '') as string;
	const simplify = this.getNodeParameter('simplify', index, true) as boolean;
	const sortDirection = this.getNodeParameter('sortDirection', index, 'DESC') as string;
	const sortField = this.getNodeParameter('sortField', index, 'id') as string;

	const qs: IDataObject = {
		limit,
		page,
	};

	if (search) {
		qs.search = search;
	}

	// Add sorting parameters
	if (sortField) {
		qs.sort_field = sortField;
	}
	if (sortDirection) {
		qs.sort_direction = sortDirection;
	}

	const responseData = await ApiRequest.call(this, 'GET', '/task-category', {}, qs);

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

	// Simplify each task category in the array
	const simplifiedCategories = categoriesArray.map((category: any) => ({
		id: category.id,
		categoryName: category.category_name,
		companyId: category.company_id,
		createdAt: category.created_at,
		updatedAt: category.updated_at,
		// Remove unnecessary API metadata for simplified view
	}));

	// Return array of simplified task categories
	return simplifiedCategories.map((category: any) => ({
		json: category,
		pairedItem: { item: index }
	}));
} 