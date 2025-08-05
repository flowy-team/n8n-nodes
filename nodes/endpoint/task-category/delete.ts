import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function deleteTaskCategory(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const categoryId = this.getNodeParameter('categoryId', index) as string;
	const responseData = await ApiRequest.call(this, 'DELETE', `/task-category/${categoryId}`);

	// Handle delete response - usually returns success/status message
	let result;
	if (responseData.status !== undefined) {
		result = {
			success: responseData.status,
			message: responseData.message || 'Task Category deleted successfully',
			categoryId: categoryId,
		};
	} else {
		result = {
			success: true,
			message: 'Task Category deleted successfully',
			categoryId: categoryId,
		};
	}

	return [{ json: result, pairedItem: { item: index } }];
} 