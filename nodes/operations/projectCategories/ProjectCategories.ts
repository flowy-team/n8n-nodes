import { INodeProperties } from 'n8n-workflow';

export const projectCategoriesOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['projectCategory'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new project category for organization',
				action: 'Create project category',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Permanently remove a project category from the system',
				action: 'Delete project category',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve specific project category information by ID',
				action: 'Get project category',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Retrieve multiple project categories with filtering options',
				action: 'Get many project categories',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Modify project category details and settings',
				action: 'Update project category',
			},
		],
		default: 'getAll',
	},
];

export const projectCategoriesFields: INodeProperties[] = [
	// Create Project Category Fields
	{
		displayName: 'Category Name',
		name: 'categoryName',
		type: 'string',
		default: '',
		required: true,
		description: 'The name of the project category',
		displayOptions: {
			show: { 
				resource: ['projectCategory'],
				operation: ['create'] 
			},
		},
	},

	// Get Project Category Fields
	{
		displayName: 'Category ID',
		name: 'categoryId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the project category',
		displayOptions: {
			show: { 
				resource: ['projectCategory'],
				operation: ['get', 'update', 'delete'] 
			},
		},
	},

	// Get All Project Categories Fields
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
				resource: ['projectCategory'],
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
				resource: ['projectCategory'],
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
				resource: ['projectCategory'],
				operation: ['getAll'] 
			},
		},
	},

	// New fields for Get Many operation
	{
		displayName: 'Simplify',
		name: 'simplify',
		type: 'boolean',
		default: true,
		description: 'Whether to return simplified response data or raw API response',
		displayOptions: {
			show: {
				resource: ['projectCategory'],
				operation: ['getAll'],
			},
		},
	},
	{
		displayName: 'Sort Direction',
		name: 'sortDirection',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['projectCategory'],
				operation: ['getAll'],
			},
		},
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
	},
	{
		displayName: 'Sort Field',
		name: 'sortField',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['projectCategory'],
				operation: ['getAll'],
			},
		},
		default: 'id',
		description: 'Field to sort by',
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

	// Update Project Category Fields
	{
		displayName: 'Update Category Name',
		name: 'categoryName',
		type: 'string',
		default: '',
		description: 'The new name of the project category',
		displayOptions: {
			show: { 
				resource: ['projectCategory'],
				operation: ['update'] 
			},
		},
	},
]; 