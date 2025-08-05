import { INodeProperties } from 'n8n-workflow';

export const taskCategoriesOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['taskCategory'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new task category for organization',
				action: 'Create task category',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve specific task category information by ID',
				action: 'Get task category',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Retrieve multiple task categories with filtering options',
				action: 'Get many task categories',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Modify task category details and settings',
				action: 'Update task category',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Permanently remove a task category from the system',
				action: 'Delete task category',
			},
		],
		default: 'getAll',
	},
];

export const taskCategoriesFields: INodeProperties[] = [
	// Create Task Category Fields
	{
		displayName: 'Category Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		description: 'The name of the task category',
		displayOptions: {
			show: { 
				resource: ['taskCategory'],
				operation: ['create'] 
			},
		},
	},

	// Get Task Category Fields
	{
		displayName: 'Category ID',
		name: 'categoryId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the task category',
		displayOptions: {
			show: { 
				resource: ['taskCategory'],
				operation: ['get', 'update', 'delete'] 
			},
		},
	},

	// Get All Task Categories Fields
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 50,
		description: 'Max number of results to return',
		displayOptions: {
			show: { 
				resource: ['taskCategory'],
				operation: ['getAll'] 
			},
		},
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		default: 1,
		description: 'Page number for pagination',
		displayOptions: {
			show: { 
				resource: ['taskCategory'],
				operation: ['getAll'] 
			},
		},
	},
	{
		displayName: 'Search',
		name: 'search',
		type: 'string',
		default: '',
		description: 'Search term to filter items',
		displayOptions: {
			show: { 
				resource: ['taskCategory'],
				operation: ['getAll'] 
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
				resource: ['taskCategory'],
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
				resource: ['taskCategory'],
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
		displayOptions: {
			show: {
				resource: ['taskCategory'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				name: 'ID',
				value: 'id',
			},
			{
				name: 'Category Name',
				value: 'category_name',
			},
		],
	},

	// Update Task Category Fields
	{
		displayName: 'Update Category Name',
		name: 'name',
		type: 'string',
		default: '',
		description: 'The new name of the task category',
		displayOptions: {
			show: { 
				resource: ['taskCategory'],
				operation: ['update'] 
			},
		},
	},
]; 