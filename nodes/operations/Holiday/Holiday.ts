import { INodeProperties } from 'n8n-workflow';

export const holidayOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['holiday'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Add a new holiday to the company calendar',
        action: 'Create holiday',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Permanently remove a holiday from the calendar',
        action: 'Delete holiday',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Retrieve specific holiday information by ID',
        action: 'Get holiday',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Retrieve multiple holidays with filtering options',
        action: 'Get many holidays',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Modify holiday details and date information',
        action: 'Update holiday',
      },
    ],
    default: 'get',
  },
];

export const holidayFields: INodeProperties[] = [
  // Required Fields for Create/Update
  {
    displayName: 'Occasion',
    name: 'occasion',
    type: 'string',
    default: '',
    required: true,
    description: 'Name/description of the holiday',
    displayOptions: {
      show: {
        resource: ['holiday'],
        operation: ['create', 'update'],
      },
    },
  },
  {
    displayName: 'Date',
    name: 'date',
    type: 'string',
    default: '',
    placeholder: 'DD/MM/YYYY',
    required: true,
    description: 'Date of the holiday in DD/MM/YYYY format (e.g., 21/03/2025)',
    displayOptions: {
      show: {
        resource: ['holiday'],
        operation: ['create', 'update'],
      },
    },
  },

  // Get & Delete Fields
  {
    displayName: 'Holiday ID',
    name: 'holidayId',
    type: 'string',
    default: '',
    required: true,
    description: 'ID of the holiday',
    displayOptions: {
      show: {
        resource: ['holiday'],
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
        resource: ['holiday'],
        operation: ['getAll'],
      },
    },
    default: false,
    description: 'Whether to return all results or only up to a given limit',
  },
  {
    displayName: 'Sort Field',
    name: 'sortField',
    type: 'options',
    displayOptions: {
      show: {
        resource: ['holiday'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        name: 'ID',
        value: 'id',
      },
      {
        name: 'Occasion',
        value: 'occasion',
      },
    ],
    default: 'id',
    description: 'Field to sort by',
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    displayOptions: {
      show: {
        resource: ['holiday'],
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
        resource: ['holiday'],
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
        resource: ['holiday'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Year',
        name: 'year',
        type: 'number',
        default: new Date().getFullYear(),
        description: 'Filter holidays by year',
        typeOptions: {
          minValue: 2000,
          maxValue: 2100,
        },
      },
    ],
  },
];
