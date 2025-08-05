import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function createTaskCategory(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const name = this.getNodeParameter('name', index) as string;

	const body: IDataObject = {
		category_name: name,
	};

	const responseData = await ApiRequest.call(this, 'POST', '/task-category', body);

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