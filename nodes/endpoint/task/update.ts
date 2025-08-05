// update.ts stub

import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function updateTask(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const taskId = this.getNodeParameter('taskId', index) as string;
	
	// Main update fields (potentially required for update)
	const heading = this.getNodeParameter('heading', index, '') as string;
	const userId = this.getNodeParameter('userId', index) as string; // Required
	const startDate = this.getNodeParameter('startDate', index, '') as string;
	const dueDate = this.getNodeParameter('dueDate', index, '') as string;
	const priority = this.getNodeParameter('priority', index, '') as string;

	// Additional fields (optional)
	const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;

	const body: IDataObject = {};

	// Always include user_id as it's required
	body.user_id = userId;

	// Handle main update fields
	if (heading) {
		body.heading = heading;
	}

	if (startDate) {
		body.start_date = startDate;
	}

	if (dueDate) {
		body.due_date = dueDate;
	}

	if (priority) {
		body.priority = priority;
	}

	// Handle additional fields
	if (additionalFields.categoryId) {
		body.category_id = additionalFields.categoryId;
	}

	if (additionalFields.projectId) {
		body.project_id = additionalFields.projectId;
	}

	if (additionalFields.taskBoards) {
		body.task_boards = additionalFields.taskBoards;
	}

	if (additionalFields.keyResultsId) {
		body.key_results_id = additionalFields.keyResultsId;
	}

	if (additionalFields.description) {
		body.description = additionalFields.description;
	}

	if (additionalFields.dependentTaskId) {
		body.dependent_task_id = additionalFields.dependentTaskId;
	}

	if (additionalFields.employeeAccess) {
		const employeeAccessString = additionalFields.employeeAccess as string;
		const employeeAccess = employeeAccessString.split(',').map(id => id.trim()).filter(id => id.length > 0);
		if (employeeAccess.length > 0) {
			body.employee_access = employeeAccess;
		}
	}

	if (additionalFields.repeatCount) {
		body.repeat_count = additionalFields.repeatCount;
	}

	if (additionalFields.repeatType) {
		body.repeat_type = additionalFields.repeatType;
	}

	if (additionalFields.repeatCycles) {
		body.repeat_cycles = additionalFields.repeatCycles;
	}

	if (additionalFields.imageUrl) {
		body.image_url = additionalFields.imageUrl;
	}

	const responseData = await ApiRequest.call(this, 'PUT', `/tasks/${taskId}`, body);

	// Always return simplified response - handle different response structures
	let taskData;
	if (responseData.data) {
		taskData = responseData.data;
	} else if (responseData.id) {
		taskData = responseData;
	} else {
		return [{ json: responseData, pairedItem: { item: index } }];
	}

	const simplifiedTask = {
		id: taskData.id,
		heading: taskData.heading,
		description: taskData.description || '',
		userId: taskData.user_id,
		projectId: taskData.project_id,
		categoryId: taskData.category_id,
		startDate: taskData.start_date,
		dueDate: taskData.due_date,
		priority: taskData.priority,
		status: taskData.status || 'incomplete',
		taskBoards: taskData.task_boards,
		repeatCount: taskData.repeat_count,
		repeatType: taskData.repeat_type,
		repeatCycles: taskData.repeat_cycles,
		dependentTaskId: taskData.dependent_task_id,
		keyResultsId: taskData.key_results_id,
		imageUrl: taskData.image_url,
		companyId: taskData.company_id,
		createdAt: taskData.created_at,
		updatedAt: taskData.updated_at,
	};

	return [{ json: simplifiedTask, pairedItem: { item: index } }];
}
