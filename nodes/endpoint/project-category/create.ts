import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function createProjectCategory(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const categoryName = this.getNodeParameter('categoryName', index) as string;

	const body: IDataObject = {
		category_name: categoryName,
	};

	const responseData = await ApiRequest.call(this, 'POST', '/project-category', body);

	// Always return simplified response - handle different response structures
	let categoryData;
	if (responseData.data) {
		// Standard structure: { status: true, message: "...", data: {...} }
		categoryData = responseData.data;
	} else if (responseData.id) {
		// Direct structure: { id: 123, category_name: "...", ... }
		categoryData = responseData;
	} else {
		// Fallback: return the raw response
		return [{ json: responseData, pairedItem: { item: index } }];
	}

	// Transform to simplified format
	const simplifiedCategory = {
		id: categoryData.id,
		categoryName: categoryData.category_name,
		companyId: categoryData.company_id,
		createdAt: categoryData.created_at,
		updatedAt: categoryData.updated_at,
		// Remove API metadata: status, message, etc.
	};

	return [{ json: simplifiedCategory, pairedItem: { item: index } }];
} 