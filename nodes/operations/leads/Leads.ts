import { INodeProperties } from 'n8n-workflow';

export const leadOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['lead'],
            },
        },
        options: [
            {
                name: 'Create',
                value: 'create',
                action: 'Create a lead',
                description: 'Create a new lead',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/leads',
                    },
                    output: {
                        postReceive: [
                            {
                                type: 'set',
                                properties: {
                                    value: '={{ { "success": true, "data": $response.body } }',
                                },
                            },
                        ],
                    },
                },
            },
            {
                name: 'Delete',
                value: 'delete',
                action: 'Delete a lead',
                description: 'Delete a lead by ID',
                routing: {
                    request: {
                        method: 'DELETE',
                        url: '=/leads/{{$parameter.leadId}}',
                    },
                    output: {
                        postReceive: [
                            {
                                type: 'set',
                                properties: {
                                    value: '={{ { "success": true } }',
                                },
                            },
                        ],
                    },
                },
            },
            {
                name: 'Get',
                value: 'get',
                action: 'Get a lead',
                description: 'Get a single lead by ID',
                routing: {
                    request: {
                        method: 'GET',
                        url: '=/leads/{{$parameter.leadId}}',
                    },
                },
            },
            {
                name: 'Get Many',
                value: 'getAll',
                action: 'Get many leads',
                description: 'Get many leads',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/leads',
                    },
                },
            },
            {
                name: 'Update',
                value: 'update',
                action: 'Update a lead',
                description: 'Update an existing lead',
                routing: {
                    request: {
                        method: 'PUT',
                        url: '=/leads/{{$parameter.leadId}}',
                    },
                },
            },
        ],
        default: 'create',
    },
];

export const leadFields: INodeProperties[] = [
    // Lead ID for get, update, delete operations
    {
        displayName: 'Lead ID',
        name: 'leadId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['lead'],
                operation: ['get', 'update', 'delete'],
            },
        },
    },
    
    // Create and Update fields
    {
        displayName: 'Client Name',
        name: 'clientName',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['lead'],
                operation: ['create', 'update'],
            },
        },
    },
    {
        displayName: 'Next Follow Up',
        name: 'nextFollowUp',
        type: 'dateTime',
        required: true,
        default: '',
        description: 'Tanggal dan waktu follow up selanjutnya',
        displayOptions: {
            show: {
                resource: ['lead'],
                operation: ['create', 'update'],
            },
        },
    },
    
    // Additional fields for create and update
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['lead'],
                operation: ['create', 'update'],
            },
        },
        options: [
            {
                displayName: 'Address',
                name: 'address',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Agent ID',
                name: 'agentId',
                type: 'number',
                default: 0,
            },
            {
                displayName: 'Company Name',
                name: 'companyName',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Email',
                name: 'email',
                type: 'string',
                placeholder: 'email@example.com',
                default: '',
            },
            {
                displayName: 'Meeting Date',
                name: 'meetingDate',
                type: 'dateTime',
                default: '',
            },
            {
                displayName: 'Mobile',
                name: 'mobile',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Note',
                name: 'note',
                type: 'string',
                typeOptions: {
                    rows: 4,
                },
                default: '',
            },
            {
                displayName: 'Source ID',
                name: 'sourceId',
                type: 'number',
                default: 0,
            },
            {
                displayName: 'Status ID',
                name: 'statusId',
                type: 'number',
                default: 0,
            },
            {
                displayName: 'Website',
                name: 'website',
                type: 'string',
                default: '',
                placeholder: 'https://example.com',
            },
        ],
    },
];
