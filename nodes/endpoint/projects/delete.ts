import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function deleteProject(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const projectId = this.getNodeParameter('projectId', index) as string;

	const responseData = await ApiRequest.call(this, 'DELETE', `/projects/${projectId}`);

	// Handle different response structures for delete operations
	let deleteResponse;
	if (responseData.status !== undefined && responseData.message) {
		// Standard API response: { status: true, message: "Project deleted successfully" }
		deleteResponse = {
			success: responseData.status,
			message: responseData.message,
			projectId: projectId,
			deletedAt: new Date().toISOString(),
		};
	} else if (responseData.data) {
		// Response with deleted project data: { status: true, message: "...", data: {...} }
		deleteResponse = {
			success: true,
			message: responseData.message || 'Project deleted successfully',
			projectId: projectId,
			deletedProject: {
				id: responseData.data.id,
				projectName: responseData.data.project_name,
				status: responseData.data.status,
			},
			deletedAt: new Date().toISOString(),
		};
	} else {
		// Fallback: assume success if no error was thrown
		deleteResponse = {
			success: true,
			message: 'Project deleted successfully',
			projectId: projectId,
			deletedAt: new Date().toISOString(),
		};
	}

	return [{ json: deleteResponse, pairedItem: { item: index } }];
} 