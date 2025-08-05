// delete.ts stub

import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function deleteTask(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const taskId = this.getNodeParameter('taskId', index) as string;
	const responseData = await ApiRequest.call(this, 'DELETE', `/tasks/${taskId}`);

	// Handle delete response - usually returns success/status message
	let result;
	if (responseData.status !== undefined) {
		result = {
			success: responseData.status,
			message: responseData.message || 'Task deleted successfully',
			taskId: taskId,
		};
	} else {
		result = {
			success: true,
			message: 'Task deleted successfully',
			taskId: taskId,
		};
	}

	return [{ json: result, pairedItem: { item: index } }];
}
