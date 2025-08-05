import { INodeProperties } from 'n8n-workflow';

export const kpiDataOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['kpiData'],
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Retrieve multiple KPI data records with filtering options',
				action: 'Get many KPI data records',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve specific KPI data record by ID',
				action: 'Get KPI data record',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Modify KPI data values and metrics',
				action: 'Update KPI data record',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Permanently remove a KPI data record from the system',
				action: 'Delete KPI data record',
			},
		],
		default: 'getAll',
	},
];

export const kpiDataFields: INodeProperties[] = [
	// Get Many KPI Data Fields
	{
		displayName: 'Indicator ID',
		name: 'indicatorId',
		type: 'string',
		default: '',
		description: 'Filter by specific indicator ID',
		displayOptions: {
			show: {
				resource: ['kpiData'],
				operation: ['getAll'],
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
				resource: ['kpiData'],
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
				resource: ['kpiData'],
				operation: ['getAll'],
			},
		},
	},

	// Record ID field for get and delete operations
	{
		displayName: 'Record ID',
		name: 'recordId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['kpiData'],
				operation: ['get', 'delete'],
			},
		},
		default: '',
		description: 'The ID of the KPI Data record',
	},

	// Update operation fields
	{
		displayName: 'Indicator ID',
		name: 'indicator_id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['kpiData'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The ID of the indicator',
	},
	{
		displayName: 'Period Key',
		name: 'period_key',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['kpiData'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The period key for the KPI data',
	},
	{
		displayName: 'Current Value',
		name: 'current_value',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['kpiData'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The current value of the KPI',
	},
	{
		displayName: 'Target Value',
		name: 'target_value',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['kpiData'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The target value of the KPI',
	},
	{
		displayName: 'Remark',
		name: 'remark',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['kpiData'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'Remarks for the KPI data record',
	},
]; 