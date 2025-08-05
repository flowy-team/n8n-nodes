import { INodeProperties } from 'n8n-workflow';

// Operasi yang tersedia untuk client
export const clientOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['client'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        action: 'Create client',
        description: 'Add a new client to the system with contact details',
        routing: {
          request: {
            method: 'POST',
            url: '/client',
          },
        },
      },
      {
        name: 'Delete',
        value: 'delete',
        action: 'Delete client',
        description: 'Permanently remove a client from the system',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/client/{{$parameter.clientId}}',
          },
        },
      },
      {
        name: 'Get',
        value: 'get',
        action: 'Get client',
        description: 'Retrieve specific client information by ID',
        routing: {
          request: {
            method: 'GET',
            url: '=/client/{{$parameter.clientId}}',
          },
        },
      },
      {
        name: 'Get Many',
        value: 'getAll',
        action: 'Get many clients',
        description: 'Retrieve multiple clients with filtering options',
        routing: {
          request: {
            method: 'GET',
            url: '/clients',
          },
        },
      },
      {
        name: 'Update',
        value: 'update',
        action: 'Update client',
        description: 'Modify client details and contact information',
        routing: {
          request: {
            method: 'PUT',
            url: '=/client/{{$parameter.clientId}}',
          },
        },
      },
    ],
    default: 'getAll',
  },
];

// Field-field untuk operasi client
export const clientFields: INodeProperties[] = [
  // Simplify toggle for Get Many operation only
  {
    displayName: 'Simplify',
    name: 'simplify',
    type: 'boolean',
    default: true,
    description: 'Whether to return simplified response data or raw API response',
    displayOptions: {
      show: {
        resource: ['client'],
        operation: ['getAll'],
      },
    },
  },

  /*
    Field-field untuk operasi Get, Update, dan Delete
  */
  {
    displayName: 'Client ID',
    name: 'clientId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['client'],
        operation: ['get', 'update', 'delete'],
      },
    },
    description: 'ID of the client',
  },

  /*
    Field-field untuk operasi Create dan Update
  */
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['client'],
        operation: ['create', 'update'],
      },
    },
    description: 'Client name',
    validateType: 'string',
    typeOptions: {
      validateOnBlur: true,
    },
  },
  {
    displayName: 'Email',
    name: 'email',
    type: 'string',
    required: true,
    default: '',
    placeholder: 'example@domain.com',
    displayOptions: {
      show: {
        resource: ['client'],
        operation: ['create', 'update'],
      },
    },
    description: 'Client email address',
    validateType: 'string',
    typeOptions: {
      validateOnBlur: true,
    },
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['client'],
        operation: ['create', 'update'],
      },
    },
    options: [
      {
        displayName: 'Address',
        name: 'address',
        type: 'string',
        typeOptions: {
          rows: 2,
        },
        default: '',
        description: 'Complete client address',
      },
      {
        displayName: 'Company Name',
        name: 'companyName',
        type: 'string',
        default: '',
        description: 'Client company name',
      },
      {
        displayName: 'Facebook',
        name: 'facebook',
        type: 'string',
        default: '',
        description: 'Client Facebook profile URL',
      },
      {
        displayName: 'GST Number',
        name: 'gstNumber',
        type: 'string',
        default: '',
        description: 'GST tax number',
      },
      {
        displayName: 'LinkedIn',
        name: 'linkedin',
        type: 'string',
        default: '',
        description: 'Client LinkedIn profile URL',
      },
      {
        displayName: 'Mobile',
        name: 'mobile',
        type: 'string',
        default: '',
        description: 'Client mobile number',
      },
      {
        displayName: 'Note',
        name: 'note',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'Additional notes about the client',
      },
      {
        displayName: 'Send Welcome Email',
        name: 'sendEmail',
        type: 'boolean',
        default: true,
        description: 'Whether to send welcome email to the client',
      },
      {
        displayName: 'Skype',
        name: 'skype',
        type: 'string',
        default: '',
        description: 'Client Skype ID',
      },
      {
        displayName: 'Twitter',
        name: 'twitter',
        type: 'string',
        default: '',
        description: 'Client Twitter account',
      },
      {
        displayName: 'Website',
        name: 'website',
        type: 'string',
        default: '',
        placeholder: 'https://example.com',
        description: 'Client website (must start with http:// or https://)',
      },
    ],
  },

  /*
    Field-field untuk operasi GetAll
  */
  {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    displayOptions: {
      show: {
        resource: ['client'],
        operation: ['getAll'],
      },
    },
    default: true,
    description: 'Whether to return all results or only up to a given limit',
  },
  {
    displayName: 'Limit',
    name: 'limit',
    type: 'number',
    displayOptions: {
      show: {
        resource: ['client'],
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
        resource: ['client'],
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
        resource: ['client'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Client ID',
        name: 'client',
        type: 'string',
        default: '',
        description: 'Filter by specific client ID',
      },
      {
        displayName: 'End Date',
        name: 'endDate',
        type: 'dateTime',
        default: '',
        description: 'Filter clients created up to this date',
      },
      {
        displayName: 'Search',
        name: 'search',
        type: 'string',
        default: '',
        description: 'Search clients by name, company name, or email',
        placeholder: 'Enter search term...',
      },
      {
        displayName: 'Start Date',
        name: 'startDate',
        type: 'dateTime',
        default: '',
        description: 'Filter clients created from this date',
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
            name: 'Active',
            value: 'active',
          },
          {
            name: 'Inactive',
            value: 'inactive',
          },
        ],
        default: 'all',
        description: 'Filter by client status',
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
        resource: ['client'],
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
        resource: ['client'],
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
    default: 'id',
    description: 'Field to sort by',
  },
];
