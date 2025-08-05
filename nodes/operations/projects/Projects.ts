import { INodeProperties } from 'n8n-workflow';

export const projectsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['project'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new project with timeline and settings',
				action: 'Create project',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve project details and information by ID',
				action: 'Get project',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Retrieve multiple projects with filtering options',
				action: 'Get many projects',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Modify project details and settings',
				action: 'Update project',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Permanently remove a project from the system',
				action: 'Delete project',
			},
		],
		default: 'create',
	},
];

export const projectsFields: INodeProperties[] = [
	// Required Fields for Create Project
	{
		displayName: 'Project Name',
		name: 'projectName',
		type: 'string',
		default: '',
		required: true,
		description: 'The name of the project',
		displayOptions: {
			show: { 
				resource: ['project'],
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
		description: 'The start date of the project (MM/DD/YYYY format)',
		displayOptions: {
			show: { 
				resource: ['project'],
				operation: ['create'] 
			},
		},
	},
	{
		displayName: 'Deadline',
		name: 'deadline',
		type: 'string',
		default: '',
		required: true,
		description: 'The deadline of the project (MM/DD/YYYY format)',
		displayOptions: {
			show: { 
				resource: ['project'],
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
				resource: ['project'],
				operation: ['create'] 
			},
		},
		options: [
			{
				displayName: 'Category ID',
				name: 'categoryId',
				type: 'string',
				default: '',
				description: 'The ID of the project category',
			},
			{
				displayName: 'Client ID',
				name: 'clientId',
				type: 'string',
				default: '',
				description: 'The ID of the client',
			},
			{
				displayName: 'Currency ID',
				name: 'currencyId',
				type: 'string',
				default: '',
				description: 'The ID of the currency',
			},
			{
				displayName: 'Default Project Member',
				name: 'defaultProjectMember',
				type: 'boolean',
				default: false,
				description: 'Whether to add default project members',
			},
			{
				displayName: 'Hours Allocated',
				name: 'hoursAllocated',
				type: 'number',
				default: 0,
				description: 'Number of hours allocated to the project',
			},
			{
				displayName: 'Manual Timelog',
				name: 'manualTimelog',
				type: 'boolean',
				default: false,
				description: 'Whether to enable manual timelog',
			},
			{
				displayName: 'Notes',
				name: 'notes',
				type: 'string',
				default: '',
				description: 'Additional notes for the project',
			},
			{
				displayName: 'Project Budget',
				name: 'projectBudget',
				type: 'number',
				default: 0,
				description: 'The budget for the project',
			},
			{
				displayName: 'Project ID (Reference)',
				name: 'projectID',
				type: 'string',
				default: '',
				description: 'Reference project ID',
			},
			{
				displayName: 'Project Summary',
				name: 'projectSummary',
				type: 'string',
				default: '',
				description: 'Summary of the project',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Not Started', value: 'not started' },
					{ name: 'In Progress', value: 'in progress' },
					{ name: 'On Hold', value: 'on hold' },
					{ name: 'Cancelled', value: 'cancelled' },
					{ name: 'Finished', value: 'finished' },
				],
				default: 'not started',
				description: 'The status of the project',
			},
			{
				displayName: 'Template ID',
				name: 'templateId',
				type: 'string',
				default: '',
				description: 'The ID of the project template',
			},
			{
				displayName: 'Without Deadline',
				name: 'withoutDeadline',
				type: 'boolean',
				default: false,
				description: 'Whether the project has no deadline',
			},
		],
	},

	// Get/Update/Delete Project Fields
	{
		displayName: 'Project ID',
		name: 'projectId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the project',
		displayOptions: {
			show: { 
				resource: ['project'],
				operation: ['get', 'update', 'delete'] 
			},
		},
	},

	// Get All Projects Fields
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['project'],
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
		default: 50,
		typeOptions: {
			minValue: 1,
		},
		description: 'Max number of results to return',
		displayOptions: {
			show: { 
				resource: ['project'],
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
				resource: ['project'],
				operation: ['getAll'],
				returnAll: [false],
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
				resource: ['project'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				description: 'Search term to filter projects by name',
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
						name: 'Not Started',
						value: 'not started',
					},
					{
						name: 'In Progress',
						value: 'in progress',
					},
					{
						name: 'On Hold',
						value: 'on hold',
					},
					{
						name: 'Cancelled',
						value: 'cancelled',
					},
					{
						name: 'Finished',
						value: 'finished',
					},
				],
				default: 'all',
				description: 'Filter projects by status',
			},
		],
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
				resource: ['project'],
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
				resource: ['project'],
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
				resource: ['project'],
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
				name: 'Project Name',
				value: 'project_name',
			},
		],
	},

	// Update Project Fields
	{
		displayName: 'Update Project Name',
		name: 'projectName',
		type: 'string',
		default: '',
		description: 'The new name of the project',
		displayOptions: {
			show: { 
				resource: ['project'],
				operation: ['update'] 
			},
		},
	},
	{
		displayName: 'Update Start Date',
		name: 'startDate',
		type: 'string',
		default: '',
		description: 'The new start date (MM/DD/YYYY format)',
		displayOptions: {
			show: { 
				resource: ['project'],
				operation: ['update'] 
			},
		},
	},
	{
		displayName: 'Update Deadline',
		name: 'deadline',
		type: 'string',
		default: '',
		description: 'The new deadline (MM/DD/YYYY format)',
		displayOptions: {
			show: { 
				resource: ['project'],
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
				resource: ['project'],
				operation: ['update'] 
			},
		},
		options: [
			{
				displayName: 'Update Category ID',
				name: 'categoryId',
				type: 'string',
				default: '',
				description: 'The new category ID',
			},
			{
				displayName: 'Update Client ID',
				name: 'clientId',
				type: 'string',
				default: '',
				description: 'The new client ID',
			},
			{
				displayName: 'Update Currency ID',
				name: 'currencyId',
				type: 'string',
				default: '',
				description: 'The new currency ID',
			},
			{
				displayName: 'Update Default Project Member',
				name: 'defaultProjectMember',
				type: 'boolean',
				default: false,
				description: 'Whether to add default project members',
			},
			{
				displayName: 'Update Hours Allocated',
				name: 'hoursAllocated',
				type: 'number',
				default: 0,
				description: 'New number of hours allocated',
			},
			{
				displayName: 'Update Manual Timelog',
				name: 'manualTimelog',
				type: 'boolean',
				default: false,
				description: 'Whether to enable manual timelog',
			},
			{
				displayName: 'Update Notes',
				name: 'notes',
				type: 'string',
				default: '',
				description: 'New notes for the project',
			},
			{
				displayName: 'Update Project Budget',
				name: 'projectBudget',
				type: 'number',
				default: 0,
				description: 'The new budget for the project',
			},
			{
				displayName: 'Update Project ID (Reference)',
				name: 'projectID',
				type: 'string',
				default: '',
				description: 'New reference project ID',
			},
			{
				displayName: 'Update Project Summary',
				name: 'projectSummary',
				type: 'string',
				default: '',
				description: 'New summary of the project',
			},
			{
				displayName: 'Update Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Not Started', value: 'not started' },
					{ name: 'In Progress', value: 'in progress' },
					{ name: 'On Hold', value: 'on hold' },
					{ name: 'Cancelled', value: 'cancelled' },
					{ name: 'Finished', value: 'finished' },
				],
				default: 'not started',
				description: 'The new status of the project',
			},
			{
				displayName: 'Update Template ID',
				name: 'templateId',
				type: 'string',
				default: '',
				description: 'The new template ID',
			},
			{
				displayName: 'Update Without Deadline',
				name: 'withoutDeadline',
				type: 'boolean',
				default: false,
				description: 'Whether the project has no deadline',
			},
		],
	},
]; 