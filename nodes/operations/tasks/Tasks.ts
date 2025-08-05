import { INodeProperties } from 'n8n-workflow';

export const tasksOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['task'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new task with specified details',
				action: 'Create task',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve a specific task by ID',
				action: 'Get task',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Retrieve multiple tasks with filtering options',
				action: 'Get many tasks',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Modify task details and properties',
				action: 'Update task',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Permanently remove a task from the system',
				action: 'Delete task',
			},
		],
		default: 'create',
	},
];

export const tasksFields: INodeProperties[] = [
	// Required Fields for Create Task
	{
		displayName: 'Heading',
		name: 'heading',
		type: 'string',
		default: '',
		required: true,
		description: 'The heading/title of the task',
		displayOptions: {
			show: { 
				resource: ['task'],
				operation: ['create'] 
			},
		},
	},
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the user creating the task',
		displayOptions: {
			show: { 
				resource: ['task'],
				operation: ['create'] 
			},
		},
	},
	{
		displayName: 'Start Date',
		name: 'startDate',
		type: 'string',
		default: '',
		required: true,
		description: 'The start date for the task (MM/DD/YYYY format)',
		displayOptions: {
			show: { 
				resource: ['task'],
				operation: ['create'] 
			},
		},
	},
	{
		displayName: 'Due Date',
		name: 'dueDate',
		type: 'string',
		default: '',
		required: true,
		description: 'The due date for the task (MM/DD/YYYY format)',
		displayOptions: {
			show: { 
				resource: ['task'],
				operation: ['create'] 
			},
		},
	},
	{
		displayName: 'Priority',
		name: 'priority',
		type: 'options',
		options: [
			{ name: 'Low', value: 'low' },
			{ name: 'Medium', value: 'medium' },
			{ name: 'High', value: 'high' },
			{ name: 'Critical', value: 'critical' },
		],
		default: 'medium',
		required: true,
		description: 'The priority level for the task',
		displayOptions: {
			show: { 
				resource: ['task'],
				operation: ['create'] 
			},
		},
	},

	// Additional Fields Section
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: { 
				resource: ['task'],
				operation: ['create'] 
			},
		},
		options: [
			{
				displayName: 'Category ID',
				name: 'categoryId',
				type: 'string',
				default: '',
				description: 'The ID of the task category',
			},
			{
				displayName: 'Project ID',
				name: 'projectId',
				type: 'string',
				default: '',
				description: 'The ID of the project',
			},
			{
				displayName: 'Task Boards',
				name: 'taskBoards',
				type: 'string',
				default: '0',
				description: 'Task boards setting',
			},
			{
				displayName: 'Key Results ID',
				name: 'keyResultsId',
				type: 'string',
				default: '',
				description: 'The ID of the key results',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'The description of the task',
			},
			{
				displayName: 'Dependent Task ID',
				name: 'dependentTaskId',
				type: 'string',
				default: '',
				description: 'The ID of the dependent task',
			},
			{
				displayName: 'Employee Access',
				name: 'employeeAccess',
				type: 'string',
				default: '',
				description: 'Comma-separated list of employee IDs with access',
			},
			{
				displayName: 'Repeat Count',
				name: 'repeatCount',
				type: 'string',
				default: '1',
				description: 'The repeat count for the task',
			},
			{
				displayName: 'Repeat Type',
				name: 'repeatType',
				type: 'options',
				options: [
					{ name: 'Day', value: 'day' },
					{ name: 'Week', value: 'week' },
					{ name: 'Month', value: 'month' },
					{ name: 'Year', value: 'year' },
				],
				default: 'day',
				description: 'The repeat type for the task',
			},
			{
				displayName: 'Repeat Cycles',
				name: 'repeatCycles',
				type: 'string',
				default: '',
				description: 'The repeat cycles for the task',
			},
			{
				displayName: 'Image URL',
				name: 'imageUrl',
				type: 'string',
				default: '',
				description: 'The URL of the image for the task',
			},
		],
	},

	// Get Task Fields
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the task',
		displayOptions: {
			show: { 
				resource: ['task'],
				operation: ['get', 'update', 'delete'] 
			},
		},
	},

	// Get All Tasks Fields
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['getAll'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 10,
		typeOptions: {
			minValue: 1,
			maxValue: 1000,
		},
		description: 'Number of items to return',
		displayOptions: {
			show: { 
				resource: ['task'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		default: 1,
		typeOptions: {
			minValue: 1,
		},
		description: 'Page number for pagination',
		displayOptions: {
			show: { 
				resource: ['task'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
	},

	// Direct fields for Get Many operation
	{
		displayName: 'Simplify',
		name: 'simplify',
		type: 'boolean',
		default: true,
		description: 'Whether to return simplified response data or raw API response',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['getAll'],
			},
		},
	},
	{
		displayName: 'Sort Direction',
		name: 'sortDirection',
		type: 'options',
		options: [
			{
				name: 'Ascending',
				value: 'ASC',
			},
			{
				name: 'Descending',
				value: 'DESC',
			},
		],
		default: 'DESC',
		description: 'Direction to sort the results',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['getAll'],
			},
		},
	},
	{
		displayName: 'Sort Field',
		name: 'sortField',
		type: 'options',
		default: 'id',
		description: 'Field to sort by',
		options: [
			{
				name: 'ID',
				value: 'id',
			},
			{
				name: 'Title',
				value: 'heading',
			},
		],
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['getAll'],
			},
		},
	},

	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				description: 'Search term to filter tasks',
				placeholder: 'Enter search term...',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{
						name: 'All',
						value: 'all',
					},
					{
						name: 'Incomplete',
						value: 'incomplete',
					},
					{
						name: 'Completed',
						value: 'completed',
					},
					{
						name: 'In Progress',
						value: 'in progress',
					},
					{
						name: 'Under Review',
						value: 'under review',
					},
				],
				default: 'all',
				description: 'Filter by task status',
			},
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'options',
				options: [
					{
						name: 'All',
						value: 'all',
					},
					{
						name: 'High',
						value: 'high',
					},
					{
						name: 'Medium',
						value: 'medium',
					},
					{
						name: 'Low',
						value: 'low',
					},
				],
				default: 'all',
				description: 'Filter by task priority',
			},
			{
				displayName: 'Assigned To',
				name: 'assignedTo',
				type: 'string',
				default: '',
				description: 'Filter by user ID the task is assigned to',
			},
			{
				displayName: 'Created By (Owned By)',
				name: 'ownedBy',
				type: 'string',
				default: '',
				description: 'Filter by user ID who created the task',
			},
			{
				displayName: 'Client ID',
				name: 'clientID',
				type: 'string',
				default: '',
				description: 'Filter by client ID associated with the task',
			},
			{
				displayName: 'Category',
				name: 'category',
				type: 'string',
				default: '',
				description: 'Filter by task category ID',
			},
			{
				displayName: 'Show Due Date Tasks',
				name: 'duedate',
				type: 'boolean',
				default: false,
				description: 'Show only tasks with due dates <= today',
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				description: 'Filter tasks from this start date',
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				description: 'Filter tasks up to this end date',
			},
		],
	},

	// Update Task Fields (required fields for update)
	{
		displayName: 'Update Heading',
		name: 'heading',
		type: 'string',
		default: '',
		description: 'The new heading/title of the task',
		displayOptions: {
			show: { 
				resource: ['task'],
				operation: ['update'] 
			},
		},
	},
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the user updating the task',
		displayOptions: {
			show: { 
				resource: ['task'],
				operation: ['update'] 
			},
		},
	},
	{
		displayName: 'Update Start Date',
		name: 'startDate',
		type: 'string',
		default: '',
		description: 'The new start date for the task (MM/DD/YYYY format)',
		displayOptions: {
			show: { 
				resource: ['task'],
				operation: ['update'] 
			},
		},
	},
	{
		displayName: 'Update Due Date',
		name: 'dueDate',
		type: 'string',
		default: '',
		description: 'The new due date for the task (MM/DD/YYYY format)',
		displayOptions: {
			show: { 
				resource: ['task'],
				operation: ['update'] 
			},
		},
	},
	{
		displayName: 'Update Priority',
		name: 'priority',
		type: 'options',
		options: [
			{ name: 'Low', value: 'low' },
			{ name: 'Medium', value: 'medium' },
			{ name: 'High', value: 'high' },
			{ name: 'Critical', value: 'critical' },
		],
		default: 'medium',
		description: 'The new priority level for the task',
		displayOptions: {
			show: { 
				resource: ['task'],
				operation: ['update'] 
			},
		},
	},

	// Additional Update Fields
	{
		displayName: 'Additional Update Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: { 
				resource: ['task'],
				operation: ['update'] 
			},
		},
		options: [
			{
				displayName: 'Update Category ID',
				name: 'categoryId',
				type: 'string',
				default: '',
				description: 'The new category ID for the task',
			},
			{
				displayName: 'Update Project ID',
				name: 'projectId',
				type: 'string',
				default: '',
				description: 'The new project ID for the task',
			},
			{
				displayName: 'Update Task Boards',
				name: 'taskBoards',
				type: 'string',
				default: '',
				description: 'The new task boards setting',
			},
			{
				displayName: 'Update Key Results ID',
				name: 'keyResultsId',
				type: 'string',
				default: '',
				description: 'The new key results ID for the task',
			},
			{
				displayName: 'Update Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'The new description of the task',
			},
			{
				displayName: 'Update Dependent Task ID',
				name: 'dependentTaskId',
				type: 'string',
				default: '',
				description: 'The new dependent task ID',
			},
			{
				displayName: 'Update Employee Access',
				name: 'employeeAccess',
				type: 'string',
				default: '',
				description: 'Comma-separated list of employee IDs with access',
			},
			{
				displayName: 'Update Repeat Count',
				name: 'repeatCount',
				type: 'string',
				default: '',
				description: 'The new repeat count for the task',
			},
			{
				displayName: 'Update Repeat Type',
				name: 'repeatType',
				type: 'options',
				options: [
					{ name: 'Day', value: 'day' },
					{ name: 'Week', value: 'week' },
					{ name: 'Month', value: 'month' },
					{ name: 'Year', value: 'year' },
				],
				default: 'day',
				description: 'The new repeat type for the task',
			},
			{
				displayName: 'Update Repeat Cycles',
				name: 'repeatCycles',
				type: 'string',
				default: '',
				description: 'The new repeat cycles for the task',
			},
			{
				displayName: 'Update Image URL',
				name: 'imageUrl',
				type: 'string',
				default: '',
				description: 'The new URL of the image for the task',
			},
		],
	},
]; 