import type { IDataObject, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function createTicket(
	this: IExecuteFunctions,
	index: number
): Promise<INodeExecutionData[]> {
	const subject = this.getNodeParameter('subject', index) as string;
	const description = this.getNodeParameter('description', index) as string;
	const priority = this.getNodeParameter('priority', index) as string;
	const userId = this.getNodeParameter('user_id', index) as string;

	const additionalFields = this.getNodeParameter('additionalFields', index) as IDataObject;

	const body: IDataObject = {
		subject,
		description,
		priority,
		user_id: userId,
		...additionalFields,
	};

	if (additionalFields.tags) {
		const tags = additionalFields.tags as IDataObject;
		if (tags.tag && Array.isArray(tags.tag)) {
			body.tags = (tags.tag as IDataObject[]).map((t: IDataObject) => t.value);
		}
	}

	const responseData = await ApiRequest.call(this, 'POST', '/tickets', body);

	// Always return simplified response - handle different response structures
	let ticketData;
	if (responseData.data) {
		// Standard structure: { status: true, message: "...", data: {...} }
		ticketData = responseData.data;
	} else if (responseData.id) {
		// Direct structure: { id: 123, subject: "...", ... }
		ticketData = responseData;
	} else {
		// Fallback: return the raw response
		return [{ json: responseData, pairedItem: { item: index } }];
	}

	// Simplify the response according to n8n UX guidelines
	const simplifiedTicket = {
		id: ticketData.id,
		ticketNumber: ticketData.ticket_number,
		subject: ticketData.subject,
		status: ticketData.status,
		priority: ticketData.priority,
		userId: ticketData.user_id,
		agentId: ticketData.agent_id || 'Unassigned',
		typeId: ticketData.type_id || 'Not Specified',
		channelId: ticketData.channel_id || 'Not Specified',
		dueDate: ticketData.due_date,
		createdAt: ticketData.created_at,
		// Remove: status, message, company_id, updated_at, created_on, type
	};

	return [{ json: simplifiedTicket, pairedItem: { item: index } }];
}

export default createTicket; 