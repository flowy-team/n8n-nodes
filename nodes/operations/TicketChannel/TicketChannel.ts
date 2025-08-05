import { INodeProperties } from 'n8n-workflow';

export const ticketChannelOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['ticketChannel'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        action: 'Create ticket channel',
        description: 'Create a new ticket channel for support routing',
        routing: {
          request: {
            method: 'POST',
            url: '/ticket-channel',
            body: {
              channel_name: '={{$parameter.channelName}}',
            },
            json: true,
          },
        },
      },
      {
        name: 'Delete',
        value: 'delete',
        action: 'Delete ticket channel',
        description: 'Permanently remove a ticket channel from the system',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/ticket-channel/{{$parameter.ticketChannelId}}',
          },
        },
      },
      {
        name: 'Get',
        value: 'get',
        action: 'Get ticket channel',
        description: 'Retrieve specific ticket channel information by ID',
        routing: {
          request: {
            method: 'GET',
            url: '=/ticket-channel/{{$parameter.ticketChannelId}}',
          },
        },
      },
      {
        name: 'Get Many',
        value: 'getAll',
        action: 'Get many ticket channels',
        description: 'Retrieve multiple ticket channels with filtering options',
        routing: {
          request: {
            method: 'GET',
            url: '/ticket-channel',
          },
        },
      },
      {
        name: 'Update',
        value: 'update',
        action: 'Update ticket channel',
        description: 'Modify ticket channel name and settings',
        routing: {
          request: {
            method: 'PUT',
            url: '=/ticket-channel/{{$parameter.ticketChannelId}}',
            body: {
              channel_name: '={{$parameter.channelName}}',
            },
            json: true,
          },
        },
      },
    ],
    default: 'getAll',
  },
];

export const ticketChannelFields: INodeProperties[] = [
  // Simplify toggle for all operations
  {
    displayName: 'Simplify',
    name: 'simplify',
    type: 'boolean',
    default: true,
    description: 'Whether to return simplified response data or raw API response',
    displayOptions: {
      show: {
        resource: ['ticketChannel'],
      },
    },
  },

  // Field untuk operasi get, update, delete
  {
    displayName: 'Ticket Channel ID',
    name: 'ticketChannelId',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['ticketChannel'],
        operation: ['get', 'update', 'delete'],
      },
    },
    description: 'ID of the ticket channel',
  },

  // Field untuk operasi create dan update
  {
    displayName: 'Channel Name',
    name: 'channelName',
    type: 'string',
    required: true,
    default: '',
    displayOptions: {
      show: {
        resource: ['ticketChannel'],
        operation: ['create', 'update'],
      },
    },
    description: 'The name of the ticket channel',
  },

  // Sorting fields for Get Many operation
  {
    displayName: 'Sort Direction',
    name: 'sortDirection',
    type: 'options',
    displayOptions: {
      show: {
        resource: ['ticketChannel'],
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
        resource: ['ticketChannel'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        name: 'ID',
        value: 'id',
      },
      {
        name: 'Channel Name',
        value: 'channel_name',
      },
    ],
    default: 'id',
    description: 'Field to sort by',
  },
];
