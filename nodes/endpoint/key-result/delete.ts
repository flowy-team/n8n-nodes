import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function deleteKeyResult(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const keyResultId = this.getNodeParameter('keyResultId', index) as string;

	const responseData = await ApiRequest.call(this, 'DELETE', `/key-result/${keyResultId}`);

	// Handle different response structures for delete operations
	let deleteResponse;
	if (responseData.status !== undefined && responseData.message) {
		// Standard API response: { status: true, message: "Key result deleted successfully" }
		deleteResponse = {
			success: responseData.status,
			message: responseData.message,
			keyResultId: keyResultId,
			deletedAt: new Date().toISOString(),
		};
	} else if (responseData.data) {
		// Response with deleted key result data: { status: true, message: "...", data: {...} }
		deleteResponse = {
			success: true,
			message: responseData.message || 'Key result deleted successfully',
			keyResultId: keyResultId,
			deletedKeyResult: {
				id: responseData.data.id,
				title: responseData.data.krs_title || responseData.data.title,
				owner: responseData.data.krs_owner,
			},
			deletedAt: new Date().toISOString(),
		};
	} else {
		// Fallback: assume success if no error was thrown
		deleteResponse = {
			success: true,
			message: 'Key result deleted successfully',
			keyResultId: keyResultId,
			deletedAt: new Date().toISOString(),
		};
	}

	return [{ json: deleteResponse, pairedItem: { item: index } }];
} 