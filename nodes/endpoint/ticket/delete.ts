import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function deleteTicket(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const ticketId = this.getNodeParameter('ticketId', index) as string;
	const simplify = this.getNodeParameter('simplify', index, true) as boolean;

	const responseData = await ApiRequest.call(this, 'DELETE', `/tickets/${ticketId}`);

	// If simplify is false, return raw API response
	if (!simplify) {
		return [{ json: responseData, pairedItem: { item: index } }];
	}

	// Simplify the response according to n8n UX guidelines
	// Instead of returning API metadata, return useful confirmation
	const result = {
		success: true,
		ticketId: ticketId,
		action: 'deleted',
		timestamp: new Date().toISOString(),
		// Remove: status, message (API metadata)
	};

	return [{ json: result, pairedItem: { item: index } }];
}

export default deleteTicket; 