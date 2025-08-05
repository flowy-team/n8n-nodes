import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function deleteProjectCategory(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const categoryId = this.getNodeParameter('categoryId', index) as string;

	const responseData = await ApiRequest.call(this, 'DELETE', `/project-category/${categoryId}`);

	// Handle different response structures for delete operations
	let deleteResponse;
	if (responseData.status !== undefined && responseData.message) {
		// Standard API response: { status: true, message: "Project category deleted successfully" }
		deleteResponse = {
			success: responseData.status,
			message: responseData.message,
			categoryId: categoryId,
			deletedAt: new Date().toISOString(),
		};
	} else if (responseData.data) {
		// Response with deleted category data: { status: true, message: "...", data: {...} }
		deleteResponse = {
			success: true,
			message: responseData.message || 'Project category deleted successfully',
			categoryId: categoryId,
			deletedCategory: {
				id: responseData.data.id,
				categoryName: responseData.data.category_name,
			},
			deletedAt: new Date().toISOString(),
		};
	} else {
		// Fallback: assume success if no error was thrown
		deleteResponse = {
			success: true,
			message: 'Project category deleted successfully',
			categoryId: categoryId,
			deletedAt: new Date().toISOString(),
		};
	}

	return [{ json: deleteResponse, pairedItem: { item: index } }];
} 