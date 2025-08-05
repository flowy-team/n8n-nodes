import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function deleteObjective(this: IExecuteFunctions, itemIndex: number): Promise<INodeExecutionData[]> {
	const objectiveId = this.getNodeParameter('objectiveId', itemIndex) as string;

	const responseData = await ApiRequest.call(this, 'DELETE', `/objectives/${objectiveId}`);

	// Handle different response structures for delete operations
	let deleteResponse;
	if (responseData.status !== undefined && responseData.message) {
		// Standard API response: { status: true, message: "Objective deleted successfully" }
		deleteResponse = {
			success: responseData.status,
			message: responseData.message,
			objectiveId: objectiveId,
			deletedAt: new Date().toISOString(),
		};
	} else if (responseData.data) {
		// Response with deleted objective data: { status: true, message: "...", data: {...} }
		deleteResponse = {
			success: true,
			message: responseData.message || 'Objective deleted successfully',
			objectiveId: objectiveId,
			deletedObjective: {
				id: responseData.data.id,
				title: responseData.data.obj_title || responseData.data.title,
				type: responseData.data.type,
			},
			deletedAt: new Date().toISOString(),
		};
	} else {
		// Fallback: assume success if no error was thrown
		deleteResponse = {
			success: true,
			message: 'Objective deleted successfully',
			objectiveId: objectiveId,
			deletedAt: new Date().toISOString(),
		};
	}

	return [{ json: deleteResponse, pairedItem: { item: itemIndex } }];
} 