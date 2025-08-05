import { INodeProperties } from 'n8n-workflow';

export const kpiOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['kpi'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new KPI with performance metrics',
				action: 'Create KPI',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Retrieve multiple KPIs with filtering options',
				action: 'Get many KPIs',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve specific KPI information by ID',
				action: 'Get KPI',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Modify KPI settings and metrics',
				action: 'Update KPI',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Permanently remove a KPI from the system',
				action: 'Delete KPI',
			},
		],
		default: 'create',
	},
];

export const kpiFields: INodeProperties[] = [
	// Get Many KPI Fields
	{
		displayName: 'Simplify',
		name: 'simplify',
		type: 'boolean',
		default: true,
		description: 'Whether to return simplified response data or raw API response',
		displayOptions: {
			show: {
				resource: ['kpi'],
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
				resource: ['kpi'],
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
				resource: ['kpi'],
				operation: ['getAll'],
			},
		},
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

	// KPI ID field for get, update, delete operations
	{
		displayName: 'KPI ID',
		name: 'indicatorId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['kpi'],
				operation: ['get', 'update', 'delete'],
			},
		},
		default: '',
		description: 'The ID of the KPI',
	},

	// Required fields
	{
		displayName: 'Category',
		name: 'category',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['kpi'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		description: 'The category of the KPI',
	},
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['kpi'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		description: 'The title of the KPI',
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['kpi'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		description: 'The type of the KPI',
	},
	{
		displayName: 'Occurrence',
		name: 'occurance',
		type: 'options',
		options: [
			{ name: 'Daily', value: 'daily' },
			{ name: 'Weekly', value: 'weekly' },
			{ name: 'Monthly', value: 'monthly' },
			{ name: 'Quarterly', value: 'quarterly' },
		],
		required: true,
		displayOptions: {
			show: {
				resource: ['kpi'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		description: 'The occurrence of the KPI',
	},
	{
		displayName: 'View Options',
		name: 'view_options',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['kpi'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		description: 'The view options for the KPI',
	},
	{
		displayName: 'Aggregate',
		name: 'aggregate',
		type: 'options',
		options: [
			{ name: 'Sum', value: 'sum' },
			{ name: 'Average', value: 'average' },
			{ name: 'Count', value: 'count' },
			{ name: 'Max', value: 'max' },
			{ name: 'Min', value: 'min' },
		],
		required: true,
		displayOptions: {
			show: {
				resource: ['kpi'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		description: 'The aggregate type of the KPI',
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
				resource: ['kpi'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{
				displayName: 'Target Value',
				name: 'target_value',
				type: 'string',
				default: '',
				description: 'The target value of the KPI',
			},
			{
				displayName: 'Unit Value',
				name: 'unit_value',
				type: 'string',
				default: '',
				description: 'The unit value of the KPI',
			},
			{
				displayName: 'Sort',
				name: 'sort',
				type: 'string',
				default: '',
				description: 'The sort order of the KPI',
			},
			{
				displayName: 'Team',
				name: 'team',
				type: 'string',
				default: '',
				description: 'The team associated with the KPI',
			},
			{
				displayName: 'Personal',
				name: 'personal',
				type: 'string',
				default: '',
				description: 'Personal setting for the KPI',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'The description of the KPI',
			},
			{
				displayName: 'KPI Parent ID',
				name: 'indicator_parent_id',
				type: 'string',
				default: '',
				description: 'The parent KPI ID',
			},
			{
				displayName: 'Calculated Value',
				name: 'calculated_value',
				type: 'string',
				default: '',
				description: 'The calculated value of the KPI',
			},
			{
				displayName: 'Color Range',
				name: 'color_range',
				type: 'string',
				default: '',
				description: 'The color range for the KPI',
			},
			{
				displayName: 'Employee Access',
				name: 'employee_access',
				type: 'string',
				default: '',
				description: 'Comma-separated list of employee IDs who have access to this KPI',
			},
		],
	},
]; 