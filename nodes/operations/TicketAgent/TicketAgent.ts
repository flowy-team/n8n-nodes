import { INodeProperties } from 'n8n-workflow';

export const ticketAgentOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['ticketAgent'],
      },
    },
    options: [
      {
        name: 'Get',
        value: 'get',
        action: 'Get ticket agents',
        description: 'Retrieve all available ticket support agents',
      },
    ],
    default: 'get',
  },
];

export const ticketAgentFields: INodeProperties[] = [
  // Simplify toggle
  {
    displayName: 'Simplify',
    name: 'simplify',
    type: 'boolean',
    default: true,
    description: 'Whether to return simplified response data or raw API response',
    displayOptions: {
      show: {
        resource: ['ticketAgent'],
      },
    },
  },

  // Sorting fields for Get operation (which gets all agents)
  {
    displayName: 'Sort Direction',
    name: 'sortDirection',
    type: 'options',
    displayOptions: {
      show: {
        resource: ['ticketAgent'],
        operation: ['get'],
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
        resource: ['ticketAgent'],
        operation: ['get'],
      },
    },
    options: [
			{
				name: 'ID',
				value: 'id',
			},
			{
				name: 'Agent Name',
				value: 'agent_name',
			},
		],
		default: 'id',
		description: 'Field to sort by',
  },
]; 