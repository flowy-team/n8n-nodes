import { INodeProperties } from 'n8n-workflow';

export const performanceCycleOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['performanceCycle'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        action: 'Create performance cycle',
        description: 'Create a new performance review cycle with timeline',
        routing: {
          request: {
            method: 'POST',
            url: '/performance-cycle',
            body: {
              name: '={{$parameter.name}}',
              cycle_type: '={{$parameter.cycleType}}',
              started_at: '={{$parameter.startedAt}}',
              finished_at: '={{$parameter.finishedAt}}',
            },
            json: true,
          },
        },
      },
      {
        name: 'Delete',
        value: 'delete',
        action: 'Delete performance cycle',
        description: 'Permanently remove a performance cycle from the system',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/performance-cycle/{{$parameter.performanceCycleId}}',
          },
        },
      },
      {
        name: 'Get',
        value: 'get',
        action: 'Get performance cycle',
        description: 'Retrieve performance cycle information by ID',
        routing: {
          request: {
            method: 'GET',
            url: '=/performance-cycle/{{$parameter.performanceCycleId}}',
          },
        },
      },
      {
        name: 'Get Many',
        value: 'getAll',
        action: 'Get many performance cycles',
        description: 'Retrieve multiple performance cycles with filtering options',
        routing: {
          request: {
            method: 'GET',
            url: '/performance-cycle',
          },
        },
      },
      {
        name: 'Update',
        value: 'update',
        action: 'Update performance cycle',
        description: 'Modify performance cycle details and timeline',
        routing: {
          request: {
            method: 'PUT',
            url: '=/performance-cycle/{{$parameter.performanceCycleId}}',
            body: {},
            json: true,
          },
        },
      }
    ],
    default: 'getAll',
  },
];

export const performanceCycleFields: INodeProperties[] = [
  // Fields for create and update
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['performanceCycle'],
        operation: ['create', 'update'],
      },
    },
    default: '',
    description: 'Name of the performance cycle',
  },
  {
    displayName: 'Cycle Type',
    name: 'cycleType',
    type: 'options',
    options: [
      { name: 'Monthly', value: 'monthly' },
      { name: 'Quarterly', value: 'quarterly' },
      { name: 'Semi-Annually', value: 'semi_annually' },
      { name: 'Annually', value: 'annually' },
    ],
    required: true,
    displayOptions: {
      show: {
        resource: ['performanceCycle'],
        operation: ['create', 'update'],
      },
    },
    default: 'quarterly',
    description: 'Type of the performance cycle',
  },
  {
    displayName: 'Start Date',
    name: 'startedAt',
    type: 'dateTime',
    required: true,
    displayOptions: {
      show: {
        resource: ['performanceCycle'],
        operation: ['create', 'update'],
      },
    },
    default: '',
    description: 'Start date of the performance cycle (MM/DD/YYYY)',
  },
  {
    displayName: 'End Date',
    name: 'finishedAt',
    type: 'dateTime',
    required: true,
    displayOptions: {
      show: {
        resource: ['performanceCycle'],
        operation: ['create', 'update'],
      },
    },
    default: '',
    description: 'End date of the performance cycle (MM/DD/YYYY)',
  },
  // Field for get, update, delete
  {
    displayName: 'Performance Cycle ID',
    name: 'performanceCycleId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['performanceCycle'],
        operation: ['get', 'update', 'delete'],
      },
    },
    default: '',
    description: 'ID of the performance cycle',
  },

  // Fields for Get Many operation
  {
    displayName: 'Simplify',
    name: 'simplify',
    type: 'boolean',
    default: true,
    description: 'Whether to return simplified response data or raw API response',
    displayOptions: {
      show: {
        resource: ['performanceCycle'],
        operation: ['getAll'],
      },
    },
  },
  {
    displayName: 'Sort Direction',
    name: 'sortDirection',
    type: 'options',
    displayOptions: {
      show: {
        resource: ['performanceCycle'],
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
        resource: ['performanceCycle'],
        operation: ['getAll'],
      },
    },
    default: 'created_at',
    description: 'Field to sort by',
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

export default {
  performanceCycleOperations,
  performanceCycleFields,
};
