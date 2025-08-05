import { INodeProperties } from 'n8n-workflow';

export const objectiveOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['objective'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create objective',
				description: 'Create a new OKR objective with targets',
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete objective',
				description: 'Permanently remove an objective from the system',
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get objective',
				description: 'Retrieve specific objective information by ID',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many objectives',
				description: 'Retrieve multiple objectives with filtering options',
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update objective',
				description: 'Modify objective details and progress',
			},
		],
		default: 'create',
	},
];

export const objectiveFields: INodeProperties[] = [
	// ID field for create operation only
	{
		displayName: 'ID',
		name: 'id',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['objective'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The ID for the objective',
	},

	// Required fields for create and update
	{
		displayName: 'Objective Title',
		name: 'obj_title',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['objective'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		description: 'The title of the objective',
	},
	{
		displayName: 'Weight',
		name: 'weight',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['objective'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		description: 'The weight of the objective (e.g., "60")',
	},
	{
		displayName: 'Start Date',
		name: 'st_date',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['objective'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		description: 'Start date in MM/DD/YYYY format (e.g., "01/01/2025")',
	},
	{
		displayName: 'End Date',
		name: 'fin_date',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['objective'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		description: 'End date in MM/DD/YYYY format (e.g., "03/31/2025")',
	},

	// Additional Fields section
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['objective'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{
				displayName: 'Confidence',
				name: 'confidence',
				type: 'options',
				options: [
					{
						name: 'Low (1)',
						value: '1',
					},
					{
						name: 'Medium (2)',
						value: '2',
					},
					{
						name: 'High (3)',
						value: '3',
					},
				],
				default: '2',
				description: 'Confidence level for the objective',
			},
			{
				displayName: 'Current Cycle',
				name: 'currentCycle',
				type: 'string',
				default: '',
				description: 'The current cycle ID',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					rows: 3,
				},
				default: '',
				description: 'Description of the objective',
			},
			{
				displayName: 'Employee Access',
				name: 'employee_access',
				type: 'string',
				typeOptions: {
					multipleValues: true,
				},
				default: [],
				description: 'Employee IDs who have access to this objective',
			},
			{
				displayName: 'Key Result Parent ID',
				name: 'key_result_parent_id',
				type: 'string',
				default: '',
				description: 'The parent key result ID',
			},
			{
				displayName: 'Leader Model ID',
				name: 'leader_model_id',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Objective Remarks',
				name: 'obj_remarks',
				type: 'string',
				typeOptions: {
					rows: 2,
				},
				default: '',
				description: 'Additional remarks for the objective',
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'string',
				default: 'company',
				description: 'The type of objective',
			},
			{
				displayName: 'View Options',
				name: 'view_options',
				type: 'options',
				options: [
					{
						name: 'Everyone',
						value: 'everyone',
					},
					{
						name: 'Team Only',
						value: 'team',
					},
					{
						name: 'Private',
						value: 'private',
					},
				],
				default: 'everyone',
				description: 'Who can view this objective',
			},
		],
	},

	// ID field for get, update, and delete operations
	{
		displayName: 'Objective ID',
		name: 'objectiveId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['objective'],
				operation: ['get', 'update', 'delete'],
			},
		},
		default: '',
		description: 'The ID of the objective',
	},

	// Filtering and options for Get Many operation
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['objective'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				name: 'Company',
				value: 'company',
				default: true,
			},
			{
				name: 'Team',
				value: 'team',
			},
			{
				name: 'Personal',
				value: 'personal',
			},
		],
		default: 'company',
		description: 'Filter objectives by type',
	},
	{
		displayName: 'ID',
		name: 'modelId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['objective'],
				operation: ['getAll'],
				type: ['team', 'personal'],
			},
		},
		default: '',
		description: 'The specific team or person ID (only for team/personal objectives)',
		placeholder: 'Enter team or person ID...',
	},
	{
		displayName: 'Performance Cycle ID',
		name: 'cycleId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['objective'],
				operation: ['getAll'],
			},
		},
		default: '',
		description: 'Filter objectives by performance cycle ID (e.g., 11561 for Q2 2025, 12865 for Q3 2025). Leave empty to get all objectives.',
		placeholder: '11561',
	},
	{
		displayName: 'Simplify',
		name: 'simplify',
		type: 'boolean',
		default: true,
		description: 'Whether to return simplified response data or raw API response',
		displayOptions: {
			show: {
				resource: ['objective'],
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
				resource: ['objective'],
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
				resource: ['objective'],
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
				name: 'Title',
				value: 'title',
			},
		],
	},
]; 