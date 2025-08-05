import type { INodeProperties } from 'n8n-workflow';

export const ticketOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['ticket'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new support ticket with details',
				action: 'Create ticket',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Permanently remove a ticket from the system',
				action: 'Delete ticket',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve specific ticket information by ID',
				action: 'Get ticket',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Retrieve multiple tickets with filtering options',
				action: 'Get many tickets',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Modify ticket status and details',
				action: 'Update ticket',
			},
		],
		default: 'create',
	},
];

export const ticketFields: INodeProperties[] = [
	// Simplify toggle for all operations
	{
		displayName: 'Simplify',
		name: 'simplify',
		type: 'boolean',
		default: true,
		description: 'Whether to return simplified response data or raw API response',
		displayOptions: {
			show: {
				resource: ['ticket'],
			},
		},
	},

	// Common field for get, update, delete operations
	{
		displayName: 'Ticket ID',
		name: 'ticketId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['ticket'],
				operation: ['get', 'update', 'delete'],
			},
		},
		default: '',
		description: 'The ID of the ticket',
	},

	// Required fields for create
	{
		displayName: 'Subject',
		name: 'subject',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['ticket'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The subject of the ticket',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['ticket'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The description of the ticket',
	},
	{
		displayName: 'Priority',
		name: 'priority',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['ticket'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{
				name: 'Low',
				value: 'Low',
			},
			{
				name: 'Normal',
				value: 'Normal',
			},
			{
				name: 'High',
				value: 'High',
			},
			{
				name: 'Urgent',
				value: 'Urgent',
			},
		],
		default: 'Normal',
		description: 'The priority of the ticket',
	},
	{
		displayName: 'User ID',
		name: 'user_id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['ticket'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The ID of the user creating the ticket',
	},

	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		default: '',
		description: 'Ticket comment/message',
		displayOptions: {
			show: {
				resource: ['ticket'],
				operation: ['update'],
			},
		},
	},

	// Optional fields for create
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['ticket'],
				operation: ['create'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Agent ID',
				name: 'agent_id',
				type: 'string',
				default: '',
				description: 'The ID of the agent assigned to the ticket',
			},
			{
				displayName: 'Channel ID',
				name: 'channel_id',
				type: 'string',
				default: '',
				description: 'The ID of the channel where the ticket was created',
			},
			{
				displayName: 'Due Date',
				name: 'due_date',
				type: 'string',
				default: '',
				description: 'Due date for the ticket (MM/DD/YYYY format)',
			},
			{
				displayName: 'Image URL',
				name: 'image_url',
				type: 'string',
				default: '',
				description: 'URL of an image attached to the ticket',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{
						name: 'Pending',
						value: 'pending',
					},
					{
						name: 'Open',
						value: 'open',
					},
					{
						name: 'In Progress',
						value: 'in_progress',
					},
					{
						name: 'Resolved',
						value: 'resolved',
					},
					{
						name: 'Closed',
						value: 'closed',
					},
				],
				default: 'pending',
				description: 'The status of the ticket',
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'fixedCollection',
				placeholder: 'Add Tag',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				options: [
					{
						name: 'tag',
						displayName: 'Tag',
						values: [
							{
								displayName: 'Tag',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Tag value',
							},
						],
					},
				],
				description: 'Tags associated with the ticket',
			},
			{
				displayName: 'Type ID',
				name: 'type_id',
				type: 'string',
				default: '',
				description: 'The ID of the ticket type',
			},
		],
	},

	// Optional fields for update
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['ticket'],
				operation: ['update'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Agent ID',
				name: 'agent_id',
				type: 'string',
				default: '',
				description: 'The ID of the agent assigned to the ticket',
			},
			{
				displayName: 'Channel ID',
				name: 'channel_id',
				type: 'string',
				default: '',
				description: 'The ID of the channel where the ticket was created',
			},
			{
				displayName: 'Due Date',
				name: 'due_date',
				type: 'string',
				default: '',
				description: 'Due date for the ticket (MM/DD/YYYY format)',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{
						name: 'Pending',
						value: 'pending',
					},
					{
						name: 'Open',
						value: 'open',
					},
					{
						name: 'In Progress',
						value: 'in_progress',
					},
					{
						name: 'Resolved',
						value: 'resolved',
					},
					{
						name: 'Closed',
						value: 'closed',
					},
				],
				default: 'pending',
				description: 'The status of the ticket',
			},
			{
				displayName: 'Subject',
				name: 'subject',
				type: 'string',
				default: '',
				description: 'The subject of the ticket',
			},
			{
				displayName: 'Type ID',
				name: 'type_id',
				type: 'string',
				default: '',
				description: 'The ID of the ticket type',
			},
		],
	},

	// Sorting fields for Get Many operation
	{
		displayName: 'Sort Direction',
		name: 'sortDirection',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['ticket'],
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
				resource: ['ticket'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				name: 'ID',
				value: 'id',
			},
			{
				name: 'Subject',
				value: 'subject',
			},
		],
		default: 'id',
		description: 'Field to sort by',
	},


	// Get All Tickets Fields
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['ticket'],
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
		displayOptions: {
			show: {
				resource: ['ticket'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
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
				resource: ['ticket'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		description: 'Page number for pagination',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['ticket'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Agent ID',
				name: 'agentId',
				type: 'string',
				default: '',
				description: 'Filter by agent ID (use "0" for unassigned)',
			},
			{
				displayName: 'Channel ID',
				name: 'channelId',
				type: 'string',
				default: '',
				description: 'Filter by channel ID (use "0" for all channels)',
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				description: 'Filter tickets created up to this date',
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
						name: 'Low',
						value: 'low',
					},
					{
						name: 'Medium',
						value: 'medium',
					},
					{
						name: 'High',
						value: 'high',
					},
					{
						name: 'Urgent',
						value: 'urgent',
					},
				],
				default: 'all',
				description: 'Filter by ticket priority',
			},
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				description: 'Search tickets by subject, status, or type',
				placeholder: 'Enter search term...',
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				description: 'Filter tickets created from this date',
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
						name: 'Open',
						value: 'open',
					},
					{
						name: 'Pending',
						value: 'pending',
					},
					{
						name: 'Resolved',
						value: 'resolved',
					},
					{
						name: 'Closed',
						value: 'closed',
					},
				],
				default: 'all',
				description: 'Filter by ticket status',
			},
			{
				displayName: 'Type ID',
				name: 'typeId',
				type: 'string',
				default: '',
				description: 'Filter by type ID (use "0" for all types)',
			},
		],
	},
]; 