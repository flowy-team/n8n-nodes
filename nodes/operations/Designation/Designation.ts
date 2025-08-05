import { INodeProperties } from 'n8n-workflow';

export const designationOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['designation'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Create a new job designation or role',
        action: 'Create designation',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Permanently remove a designation from the system',
        action: 'Delete designation',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Retrieve designation information by ID',
        action: 'Get designation',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Retrieve multiple designations with filtering options',
        action: 'Get many designations',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Modify designation details and description',
        action: 'Update designation',
      },
    ],
    default: 'create',
  },
];

export const designationFields: INodeProperties[] = [
  // Create & Update Fields
  {
    displayName: 'Designation Name',
    name: 'designationName',
    type: 'string',
    default: '',
    required: true,
    description: 'Name of the designation',
    displayOptions: {
      show: {
        resource: ['designation'],
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
        resource: ['designation'],
        operation: ['create', 'update'],
      },
    },
    options: [
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        default: '',
        description: 'Description of the designation',
      },
    ],
  },

  // Get & Delete Fields
  {
    displayName: 'Designation ID',
    name: 'designationId',
    type: 'number',
    default: 0,
    required: true,
    description: 'ID of the designation',
    displayOptions: {
      show: {
        resource: ['designation'],
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
        resource: ['designation'],
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
        resource: ['designation'],
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
        resource: ['designation'],
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

  // Simplify option for all operations
  {
    displayName: 'Simplify',
    name: 'simplify',
    type: 'boolean',
    default: true,
    description: 'Whether to return simplified response data or raw API response',
    displayOptions: {
      show: {
        resource: ['designation'],
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
        resource: ['designation'],
        operation: ['getAll'],
      },
    },
  },
  {
    displayName: 'Sort Field',
    name: 'sortField',
    type: 'options',
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
    default: 'id',
    description: 'Field to sort by',
    displayOptions: {
      show: {
        resource: ['designation'],
        operation: ['getAll'],
      },
    },
  },
];
