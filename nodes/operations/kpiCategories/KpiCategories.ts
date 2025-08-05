import { INodeProperties } from 'n8n-workflow';

export const kpiCategoryOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['kpiCategory'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new KPI category for performance tracking',
				action: 'Create KPI category',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Permanently remove a KPI category from the system',
				action: 'Delete KPI category',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Retrieve specific KPI category information by ID',
				action: 'Get KPI category',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Retrieve multiple KPI categories with filtering options',
				action: 'Get many KPI categories',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Modify KPI category details and settings',
				action: 'Update KPI category',
			},
		],
		default: 'getAll',
	},
];

export const kpiCategoryFields: INodeProperties[] = [
	// Get Many KPI Category Fields
	{
		displayName: 'Simplify',
		name: 'simplify',
		type: 'boolean',
		default: true,
		description: 'Whether to return simplified response data or raw API response',
		displayOptions: {
			show: {
				resource: ['kpiCategory'],
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
				resource: ['kpiCategory'],
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
				resource: ['kpiCategory'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				name: 'ID',
				value: 'id',
			},
			{
				name: 'Name',
				value: 'name',
			},
		],
	},

	// KPI Category ID field (for get, update, delete operations)
	{
		displayName: 'KPI Category ID',
		name: 'kpiCategoryId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['kpiCategory'],
				operation: ['get', 'update', 'delete'],
			},
		},
		default: '',
		description: 'ID of the KPI category',
	},

	// Indicator Type Name field (for create and update operations)
	{
		displayName: 'Indicator Type Name',
		name: 'indicator_type_name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['kpiCategory'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		description: 'Name of the indicator type',
	},
]; 