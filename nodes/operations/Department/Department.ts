import { INodeProperties } from 'n8n-workflow';

export const departmentOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['department'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new department in the organization',
        action: 'Create department',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Permanently remove a department from the system',
        action: 'Delete department',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Retrieve department information by ID',
        action: 'Get department',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Retrieve multiple departments with filtering options',
        action: 'Get many departments',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Modify department details and structure',
        action: 'Update department',
      },
    ],
    default: 'create',
  },
];

export const departmentFields: INodeProperties[] = [
  // Create & Update Fields
  {
    displayName: 'Team Name',
    name: 'teamName',
    type: 'string',
    default: '',
    required: true,
    description: 'The name of the department',
    displayOptions: {
      show: {
        resource: ['department'],
        operation: ['create', 'update'],
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
				resource: ['department'],
				operation: ['create', 'update']
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the department',
			},
			{
				displayName: 'Parent Department ID',
				name: 'parentId',
				type: 'number',
				default: 0,
				description: 'ID of the parent department (if any)',
			}
		],
	},

  // Get & Delete Fields
  {
    displayName: 'Department ID',
    name: 'departmentId',
    type: 'number',
    default: 0,
    required: true,
    description: 'ID of the department',
    displayOptions: {
      show: {
        resource: ['department'],
        operation: ['get', 'update', 'delete'],
      },
    },
  },

  // Additional Fields for Get All
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['department'],
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
        resource: ['department'],
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
        resource: ['department'],
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

  // Direct fields for Get Many operation
  {
    displayName: 'Simplify',
    name: 'simplify',
    type: 'boolean',
    default: true,
    description: 'Whether to return simplified response data or raw API response',
    displayOptions: {
      show: {
        resource: ['department'],
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
        resource: ['department'],
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
        resource: ['department'],
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
];
