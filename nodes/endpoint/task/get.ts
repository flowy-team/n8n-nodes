// get.ts stub

import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function getTask(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const taskId = this.getNodeParameter('taskId', index) as string;
	const responseData = await ApiRequest.call(this, 'GET', `/tasks/${taskId}`);

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

export async function getAllTasks(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	try {
		const returnAll = this.getNodeParameter('returnAll', index, false) as boolean;
		const simplify = this.getNodeParameter('simplify', index, true) as boolean;
		const sortDirection = this.getNodeParameter('sortDirection', index, 'DESC') as string;
		const sortField = this.getNodeParameter('sortField', index, 'id') as string;
		const qs: IDataObject = {};

		// Handle pagination
		if (!returnAll) {
			const limit = this.getNodeParameter('limit', index, 10) as number;
			const page = this.getNodeParameter('page', index, 1) as number;
			
			if (limit < 1 || limit > 1000) {
				throw new Error('Limit must be between 1 and 1000');
			}
			
			qs.limit = limit;
			qs.page = page;
		}

		// Get additional fields for filtering
		const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;
		
		// Add search parameter if provided
		if (additionalFields.search) {
			const searchTerm = (additionalFields.search as string).trim();
			if (searchTerm) {
				qs.search = searchTerm;
			}
		}

		// Add status filter if provided and not 'all'
		if (additionalFields.status && additionalFields.status !== 'all') {
			qs.status = additionalFields.status;
		}

		// Add priority filter if provided and not 'all'
		if (additionalFields.priority && additionalFields.priority !== 'all') {
			qs.priority = additionalFields.priority;
		}

		// Add assigned to filter if provided
		if (additionalFields.assignedTo) {
			const assigneeId = (additionalFields.assignedTo as string).trim();
			if (assigneeId && assigneeId !== 'all') {
				qs.assignedTo = assigneeId;
			}
		}

		// Add created by filter if provided
		if (additionalFields.ownedBy) {
			const ownerId = (additionalFields.ownedBy as string).trim();
			if (ownerId && ownerId !== 'all') {
				qs.ownedBY = ownerId;
			}
		}

		// Add client ID filter if provided
		if (additionalFields.clientID) {
			const clientId = (additionalFields.clientID as string).trim();
			if (clientId && clientId !== 'all') {
				qs.clientID = clientId;
			}
		}

		// Add category filter if provided
		if (additionalFields.category) {
			const categoryId = (additionalFields.category as string).trim();
			if (categoryId && categoryId !== 'all') {
				qs.category = categoryId;
			}
		}

		// Add due date filter if provided
		if (additionalFields.duedate) {
			qs.duedate = true;
		}

		// Add date range filters if provided
		if (additionalFields.startDate) {
			const startDate = new Date(additionalFields.startDate as string);
			qs.startDate = startDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
		}

		if (additionalFields.endDate) {
			const endDate = new Date(additionalFields.endDate as string);
			qs.endDate = endDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
		}

		// Add sorting parameters (now from direct fields)
		if (sortField) {
			qs.sort_field = sortField;
		}

		if (sortDirection) {
			qs.sort_direction = sortDirection;
		}

		// Make API request
		const responseData = await ApiRequest.call(this, 'GET', '/tasks', {}, qs);

		// If simplify is false, return raw API response
		if (!simplify) {
			return [{ json: responseData, pairedItem: { item: index } }];
		}

		// Handle different response structures for simplified output
		let tasksArray;
		if (responseData.data && Array.isArray(responseData.data)) {
			// Standard structure: { status: true, message: "...", data: [...] }
			tasksArray = responseData.data;
		} else if (Array.isArray(responseData)) {
			// Direct array structure: [...]
			tasksArray = responseData;
		} else {
			// Fallback: return the raw response
			return [{ json: responseData, pairedItem: { item: index } }];
		}

		// Simplify each task in the array
		const simplifiedTasks = tasksArray.map((task: any) => ({
			id: task.id,
			date: task.date,
			projectName: task.project_name || 'No Project',
			heading: task.heading,
			clientName: task.clientName || 'No Client',
			assigneeName: task.name || 'Unassigned',
			createdBy: task.created_by,
			createdImage: task.created_image,
			assignId: task.assign_id,
			createById: task.create_by_id,
			image: task.image,
			dueDate: task.due_date,
			columnName: task.column_name,
			slug: task.slug,
			labelColor: task.label_color,
			projectId: task.project_id,
			priority: task.priority,
			follower: task.follower,
			boardColumnId: task.board_column_id,
			taskCategoryId: task.task_category_id,
			categoryName: task.category_name || 'No Category',
			estimateToComplete: task.estimate_to_complete,
			dueOn: task.due_on,
			startDateAnotherFormat: task.start_date_another_format,
			dueDateAnotherFormat: task.due_date_another_format,
			createOn: task.create_on,
			// Remove unnecessary API metadata for simplified view
		}));

		// Return array of simplified tasks
		return simplifiedTasks.map((task: any) => ({
			json: task,
			pairedItem: { item: index }
		}));

	} catch (error) {
		// Improve error messages for user
		if (error.httpCode === 404) {
			return [{ json: { status: false, message: 'No tasks found', data: [] }, pairedItem: { item: index } }];
		}
		
		if (error instanceof Error) {
			throw new Error(`Failed to retrieve tasks: ${error.message}`);
		}
		
		throw new Error('An unknown error occurred while retrieving tasks');
	}
}
