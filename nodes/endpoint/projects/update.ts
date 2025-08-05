import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function updateProject(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const projectId = this.getNodeParameter('projectId', index) as string;
	
	// Get main update fields
	const projectName = this.getNodeParameter('projectName', index, '') as string;
	const startDate = this.getNodeParameter('startDate', index, '') as string;
	const deadline = this.getNodeParameter('deadline', index, '') as string;

	// Get additional update fields
	const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;

	// Build the body with only provided fields
	const body: IDataObject = {};

	// Add main fields if provided
	if (projectName) {
		body.project_name = projectName;
	}
	if (startDate) {
		body.start_date = startDate;
	}
	if (deadline) {
		body.deadline = deadline;
	}

	// Add optional fields from additionalFields if they exist
	if (additionalFields.templateId) {
		body.template_id = additionalFields.templateId;
	}
	if (additionalFields.categoryId) {
		body.category_id = additionalFields.categoryId;
	}
	if (additionalFields.withoutDeadline !== undefined) {
		body.without_deadline = additionalFields.withoutDeadline;
	}
	if (additionalFields.clientId) {
		body.client_id = additionalFields.clientId;
	}
	if (additionalFields.manualTimelog !== undefined) {
		body.manual_timelog = additionalFields.manualTimelog;
	}
	if (additionalFields.defaultProjectMember !== undefined) {
		body.default_project_member = additionalFields.defaultProjectMember;
	}
	if (additionalFields.projectSummary) {
		body.project_summary = additionalFields.projectSummary;
	}
	if (additionalFields.notes) {
		body.notes = additionalFields.notes;
	}
	if (additionalFields.projectBudget !== undefined) {
		body.project_budget = additionalFields.projectBudget;
	}
	if (additionalFields.currencyId) {
		body.currency_id = additionalFields.currencyId;
	}
	if (additionalFields.hoursAllocated !== undefined) {
		body.hours_allocated = additionalFields.hoursAllocated;
	}
	if (additionalFields.status) {
		body.status = additionalFields.status;
	}
	if (additionalFields.projectID) {
		body.project_id = additionalFields.projectID;
	}

	const responseData = await ApiRequest.call(this, 'PUT', `/projects/${projectId}`, body);

	// Always return simplified response - handle different response structures
	let projectData;
	if (responseData.data) {
		// Standard structure: { status: true, message: "...", data: {...} }
		projectData = responseData.data;
	} else if (responseData.id) {
		// Direct structure: { id: 123, project_name: "...", ... }
		projectData = responseData;
	} else {
		// Fallback: return the raw response
		return [{ json: responseData, pairedItem: { item: index } }];
	}

	// Transform to simplified format
	const simplifiedProject = {
		id: projectData.id,
		projectName: projectData.project_name,
		startDate: projectData.start_date,
		deadline: projectData.deadline,
		completionPercent: projectData.completion_percent || 0,
		status: projectData.status,
		projectBudget: projectData.project_budget || 0,
		currencyId: projectData.currency_id,
		clientId: projectData.client_id,
		categoryId: projectData.category_id,
		projectSummary: projectData.project_summary || '',
		notes: projectData.notes || '',
		hoursAllocated: projectData.hours_allocated || 0,
		companyId: projectData.company_id,
		createdAt: projectData.created_at,
		updatedAt: projectData.updated_at,
		// Remove API metadata: status, message, etc.
	};

	return [{ json: simplifiedProject, pairedItem: { item: index } }];
} 