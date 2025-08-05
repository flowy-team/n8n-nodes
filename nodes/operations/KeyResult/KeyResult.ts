import type { INodeProperties } from 'n8n-workflow';

export const keyResultOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['keyResult'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new key result with metrics and targets',
				action: 'Create key result',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Permanently remove a key result from the system',
				action: 'Delete key result',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve specific key result information by ID',
				action: 'Get key result',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Retrieve multiple key results with filtering options',
				action: 'Get many key results',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Modify key result progress and values',
				action: 'Update key result',
			},
		],
		default: 'create',
	},
];

export const keyResultFields: INodeProperties[] = [
	// Key Result ID for get, update, delete operations
	{
		displayName: 'Key Result ID',
		name: 'keyResultId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['keyResult'],
				operation: ['get', 'update', 'delete'],
			},
		},
		default: '',
		description: 'The ID of the key result',
	},

	// Required fields for create operation
	{
		displayName: 'KRS Owner',
		name: 'krs_owner',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['keyResult'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The owner ID of the key result',
	},
	{
		displayName: 'KRS Title',
		name: 'krs_title',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['keyResult'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The title of the key result',
	},
	{
		displayName: 'KRS Initial Value',
		name: 'krs_init',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['keyResult'],
				operation: ['create'],
			},
		},
		default: '0',
		description: 'The initial value of the key result',
	},
	{
		displayName: 'KRS Current Value',
		name: 'krs_now',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['keyResult'],
				operation: ['create'],
			},
		},
		default: '0',
		description: 'The current value of the key result',
	},
	{
		displayName: 'KRS Target Value',
		name: 'krs_tar',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['keyResult'],
				operation: ['create'],
			},
		},
		default: '100',
		description: 'The target value of the key result',
	},

	// Additional fields for create operation
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['keyResult'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'KRS Confidence',
				name: 'krs_conf',
				type: 'string',
				default: '',
				description: 'The confidence level of the key result',
			},
			{
				displayName: 'KRS Description',
				name: 'krs_description',
				type: 'string',
				default: '',
				description: 'The description of the key result',
			},
			{
				displayName: 'KRS Leader',
				name: 'krs_leader',
				type: 'string',
				default: '',
				description: 'The leader ID for the key result',
			},
			{
				displayName: 'KRS Remarks',
				name: 'krs_remarks',
				type: 'string',
				default: '',
				description: 'The remarks for the key result',
			},
			{
				displayName: 'KRS Unit',
				name: 'krs_unit',
				type: 'string',
				default: '',
				description: 'The unit of measurement for the key result',
			},
			{
				displayName: 'KRS Weight',
				name: 'krs_weight',
				type: 'string',
				default: '',
				description: 'The weight of the key result',
			},
		],
	},

	// Required fields for update operation
	{
		displayName: 'KRS Owner',
		name: 'krs_owner',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['keyResult'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The owner ID of the key result',
	},
	{
		displayName: 'KRS Title',
		name: 'krs_title',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['keyResult'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The title of the key result',
	},
	{
		displayName: 'KRS Initial Value',
		name: 'krs_init',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['keyResult'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The initial value of the key result',
	},
	{
		displayName: 'KRS Current Value',
		name: 'krs_now',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['keyResult'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The current value of the key result',
	},
	{
		displayName: 'KRS Target Value',
		name: 'krs_tar',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['keyResult'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The target value of the key result',
	},

	// Additional fields for update operation
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['keyResult'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'KRS Confidence',
				name: 'krs_conf',
				type: 'string',
				default: '',
				description: 'The confidence level of the key result',
			},
			{
				displayName: 'KRS Description',
				name: 'krs_description',
				type: 'string',
				default: '',
				description: 'The description of the key result',
			},
			{
				displayName: 'KRS Leader',
				name: 'krs_leader',
				type: 'string',
				default: '',
				description: 'The leader ID for the key result',
			},
			{
				displayName: 'KRS Remarks',
				name: 'krs_remarks',
				type: 'string',
				default: '',
				description: 'The remarks for the key result',
			},
			{
				displayName: 'KRS Unit',
				name: 'krs_unit',
				type: 'string',
				default: '',
				description: 'The unit of measurement for the key result',
			},
			{
				displayName: 'KRS Weight',
				name: 'krs_weight',
				type: 'string',
				default: '',
				description: 'The weight of the key result',
			},
		],
	},

	// Pagination fields for getAll operation
	{
		displayName: 'Objective ID',
		name: 'objectiveId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['keyResult'],
				operation: ['getAll'],
			},
		},
		default: '',
		description: 'Filter key results by specific objective ID',
		placeholder: 'Enter objective ID to filter...',
	},
	{
		displayName: 'Simplify',
		name: 'simplify',
		type: 'boolean',
		default: true,
		description: 'Whether to return simplified response data or raw API response',
		displayOptions: {
			show: {
				resource: ['keyResult'],
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
				resource: ['keyResult'],
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
				resource: ['keyResult'],
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
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['keyResult'],
				operation: ['getAll'],
			},
		},
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['keyResult'],
				operation: ['getAll'],
			},
		},
		default: 1,
		description: 'Page number for pagination',
	},
]; 