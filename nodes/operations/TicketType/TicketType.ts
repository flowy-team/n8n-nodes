import { INodeProperties } from 'n8n-workflow';

export const ticketTypeOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['ticketType'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        action: 'Create ticket type',
        description: 'Create a new ticket type for categorization',
        routing: {
          request: {
            method: 'POST',
            url: '/ticket-type',
          },
        },
      },
      {
        name: 'Delete',
        value: 'delete',
        action: 'Delete ticket type',
        description: 'Permanently remove a ticket type from the system',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/ticket-type/{{$parameter.ticketTypeId}}',
          },
        },
      },
      {
        name: 'Get',
        value: 'get',
        action: 'Get ticket type',
        description: 'Retrieve specific ticket type information by ID',
        routing: {
          request: {
            method: 'GET',
            url: '=/ticket-type/{{$parameter.ticketTypeId}}',
          },
        },
      },
      {
        name: 'Get Many',
        value: 'getAll',
        action: 'Get many ticket types',
        description: 'Retrieve multiple ticket types with filtering options',
        routing: {
          request: {
            method: 'GET',
            url: '/ticket-types',
          },
        },
      },
      {
        name: 'Update',
        value: 'update',
        action: 'Update ticket type',
        description: 'Modify ticket type details and settings',
        routing: {
          request: {
            method: 'PUT',
            url: '=/ticket-type/{{$parameter.ticketTypeId}}',
          },
        },
      }
    ],
    default: 'getAll',
  },
];

export const ticketTypeFields: INodeProperties[] = [
  // Simplify toggle for all operations
  {
    displayName: 'Simplify',
    name: 'simplify',
    type: 'boolean',
    default: true,
    description: 'Whether to return simplified response data or raw API response',
    displayOptions: {
      show: {
        resource: ['ticketType'],
      },
    },
  },

  // Field untuk operasi get, update, delete
  {
    displayName: 'Ticket Type ID',
    name: 'ticketTypeId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['ticketType'],
        operation: ['get', 'update', 'delete'],
      },
    },
    description: 'ID of the ticket type',
  },

  // Field untuk operasi create dan update
  {
    displayName: 'Type',
    name: 'type',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['ticketType'],
        operation: ['create', 'update'],
      },
    },
    description: 'The name/type of the ticket',
    validateType: 'string',
    typeOptions: {
      minValue: 1,
    },
  },

  // Sorting fields for Get Many operation
  {
    displayName: 'Sort Direction',
    name: 'sortDirection',
    type: 'options',
    displayOptions: {
      show: {
        resource: ['ticketType'],
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
    default: 'ASC',
    description: 'Direction to sort the results',
  },
  {
    displayName: 'Sort Field',
    name: 'sortField',
    type: 'options',
    displayOptions: {
      show: {
        resource: ['ticketType'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        name: 'ID',
        value: 'id',
      },
      {
        name: 'Type',
        value: 'type',
      },
    ],
    default: 'id',
    description: 'Field to sort by',
  },
];
