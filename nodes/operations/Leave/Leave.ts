import { INodeProperties } from 'n8n-workflow';

export const leaveOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['leave'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Submit a new leave request with dates and details',
        action: 'Create leave request',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Permanently remove a leave request from the system',
        action: 'Delete leave request',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Retrieve specific leave request information by ID',
        action: 'Get leave request',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Retrieve multiple leave requests with filtering options',
        action: 'Get many leave requests',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Modify leave request details and status',
        action: 'Update leave request',
      },
    ],
    default: 'get',
  },
];

export const leaveFields: INodeProperties[] = [
  // Required Fields for Create/Update
  {
    displayName: 'User ID',
    name: 'userId',
    type: 'string',
    default: '',
    required: true,
    description: 'ID of the user requesting leave',
    displayOptions: {
      show: {
        resource: ['leave'],
        operation: ['create', 'update'],
      },
    },
  },
  {
    displayName: 'Leave Type ID',
    name: 'leaveTypeId',
    type: 'string',
    default: '',
    required: true,
    description: 'ID of the leave type',
    displayOptions: {
      show: {
        resource: ['leave'],
        operation: ['create', 'update'],
      },
    },
  },
  {
    displayName: 'Duration',
    name: 'duration',
    type: 'options',
    options: [
      {
        name: 'Single Day',
        value: 'single',
      },
      {
        name: 'Multiple Days',
        value: 'multiple',
      },
    ],
    default: 'single',
    required: true,
    description: 'Duration of the leave',
    displayOptions: {
      show: {
        resource: ['leave'],
        operation: ['create', 'update'],
      },
    },
  },
  {
    displayName: 'Leave Date',
    name: 'leaveDate',
    type: 'string',
    default: '',
    required: true,
    description: 'Date of leave (MM/DD/YYYY) - used when duration is single day',
    displayOptions: {
      show: {
        resource: ['leave'],
        operation: ['create', 'update'],
        duration: ['single'],
      },
    },
  },
  {
    displayName: 'Multiple Dates',
    name: 'multiDate',
    type: 'string',
    default: '',
    required: true,
    description: 'Comma-separated list of dates (MM/DD/YYYY,MM/DD/YYYY) - used when duration is multiple days',
    displayOptions: {
      show: {
        resource: ['leave'],
        operation: ['create', 'update'],
        duration: ['multiple'],
      },
    },
  },
  {
    displayName: 'Reason',
    name: 'reason',
    type: 'string',
    typeOptions: {
      rows: 3,
    },
    default: '',
    required: true,
    description: 'Reason for the leave request',
    displayOptions: {
      show: {
        resource: ['leave'],
        operation: ['create', 'update'],
      },
    },
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
        name: 'Approved',
        value: 'approved',
      },
      {
        name: 'Rejected',
        value: 'rejected',
      },
      {
        name: 'Cancelled',
        value: 'cancelled',
      },
    ],
    default: 'pending',
    required: true,
    description: 'Status of the leave request',
    displayOptions: {
      show: {
        resource: ['leave'],
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
        resource: ['leave'],
        operation: ['create', 'update'],
      },
    },
    options: [
      {
        displayName: 'Attachment',
        name: 'attachment',
        type: 'string',
        default: '',
        description: 'Attachment for the leave request (file path or URL)',
        displayOptions: {
          show: {
            '/resource': ['leave'],
            '/operation': ['create', 'update'],
          },
        },
      },
    ],
  },

  // Get & Delete Fields
  {
    displayName: 'Leave Request ID',
    name: 'leaveId',
    type: 'string',
    default: '',
    required: true,
    description: 'ID of the leave request',
    displayOptions: {
      show: {
        resource: ['leave'],
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
        resource: ['leave'],
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
        resource: ['leave'],
        operation: ['getAll'],
        returnAll: [false],
      },
    },
    typeOptions: {
      minValue: 1,
      maxValue: 1000,
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
        resource: ['leave'],
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
    displayName: 'Simplify',
    name: 'simplify',
    type: 'boolean',
    default: true,
    description: 'Whether to return simplified response data or raw API response',
    displayOptions: {
      show: {
        resource: ['leave'],
        operation: ['getAll'],
      },
    },
  },
  {
    displayName: 'Sort Field',
    name: 'sortField',
    type: 'options',
    displayOptions: {
      show: {
        resource: ['leave'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        name: 'ID',
        value: 'id',
      },
      {
        name: 'Reason',
        value: 'reason',
      },
    ],
    default: 'id',
    description: 'Field to sort by',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['leave'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Search',
        name: 'search',
        type: 'string',
        default: '',
        description: 'Search leaves by employee name or leave reason',
        placeholder: 'Enter search term...',
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
            name: 'Pending',
            value: 'pending',
          },
          {
            name: 'Approved',
            value: 'approved',
          },
          {
            name: 'Rejected',
            value: 'rejected',
          },
        ],
        default: 'all',
        description: 'Filter by leave status',
      },
      {
        displayName: 'Employee ID',
        name: 'employee',
        type: 'string',
        default: '',
        description: 'Filter by specific employee ID',
      },
      {
        displayName: 'Leave Type ID',
        name: 'leaveType',
        type: 'string',
        default: '',
        description: 'Filter by leave type ID',
      },
      {
        displayName: 'Start Date',
        name: 'startDate',
        type: 'dateTime',
        default: '',
        description: 'Filter leaves from this start date',
      },
      {
        displayName: 'End Date',
        name: 'endDate',
        type: 'dateTime',
        default: '',
        description: 'Filter leaves up to this end date',
      },
    ],
  },
];
