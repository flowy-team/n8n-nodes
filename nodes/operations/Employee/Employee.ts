import { INodeProperties } from 'n8n-workflow';

export const employeeOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['employee'],
      },
    },
    options: [
      {
        name: 'Create',
        value: 'create',
        description: 'Add a new employee to the system',
        action: 'Create employee',
      },
      {
        name: 'Delete',
        value: 'delete',
        description: 'Permanently remove an employee from the system',
        action: 'Delete employee',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Retrieve employee information by ID',
        action: 'Get employee',
      },
      {
        name: 'Get Many',
        value: 'getAll',
        description: 'Retrieve multiple employees with filtering options',
        action: 'Get many employees',
      },
      {
        name: 'Update',
        value: 'update',
        description: 'Modify employee details and information',
        action: 'Update employee',
      },
    ],
    default: 'get',
  },
];

export const employeeFields: INodeProperties[] = [
  // Required Fields for Create/Update
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    default: '',
    required: true,
    description: 'Full name of the employee',
    displayOptions: {
      show: {
        resource: ['employee'],
        operation: ['create', 'update'],
      },
    },
  },
  {
    displayName: 'Email',
    name: 'email',
    type: 'string',
				placeholder: 'name@email.com',
    default: '',
    required: true,
    description: 'Email address of the employee',
    displayOptions: {
      show: {
        resource: ['employee'],
        operation: ['create', 'update'],
      },
    },
  },
  {
    displayName: 'Password',
    name: 'password',
    type: 'string',
    typeOptions: {
      password: true,
    },
    default: '',
    required: true,
    description: 'Password for the employee account',
    displayOptions: {
      show: {
        resource: ['employee'],
        operation: ['create'],
      },
    },
  },
  {
    displayName: 'Joining Date',
    name: 'joiningDate',
    type: 'dateTime',
    default: '',
    required: true,
    description: 'Date when the employee joined the company (YYYY-MM-DD format)',
    displayOptions: {
      show: {
        resource: ['employee'],
        operation: ['create', 'update'],
      },
    },
  },

  // Direct Fields (previously in Additional Fields)
  {
    displayName: 'Mobile',
    name: 'mobile',
    type: 'string',
    default: '',
    description: 'Employee mobile phone number',
    placeholder: '08123456789',
    displayOptions: {
      show: {
        resource: ['employee'],
        operation: ['create', 'update'],
      },
    },
  },
  {
    displayName: 'Gender',
    name: 'gender',
    type: 'options',
    options: [
      {
        name: 'Male',
        value: 'male',
      },
      {
        name: 'Female',
        value: 'female',
        },
    ],
    default: 'male',
    description: 'Employee gender',
    displayOptions: {
      show: {
        resource: ['employee'],
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
        name: 'Active',
        value: 'active',
      },
      {
        name: 'Inactive',
        value: 'inactive',
      },
    ],
    default: 'active',
    description: 'Employee status',
    displayOptions: {
      show: {
        resource: ['employee'],
        operation: ['create', 'update'],
      },
    },
      },
      {
    displayName: 'Login',
    name: 'login',
        type: 'options',
        options: [
      {
        name: 'Enable',
        value: 'enable',
      },
      {
        name: 'Disable',
        value: 'disable',
      },
        ],
    default: 'enable',
    description: 'Whether the employee can login to the system',
    displayOptions: {
      show: {
        resource: ['employee'],
        operation: ['create', 'update'],
      },
    },
      },
      {
        displayName: 'Locale',
        name: 'locale',
        type: 'string',
        default: 'en',
    description: 'Employee locale/language preference',
    placeholder: 'en',
    displayOptions: {
      show: {
        resource: ['employee'],
        operation: ['create', 'update'],
      },
    },
  },
  {
    displayName: 'Custom Employee ID',
    name: 'customEmployeeId',
    type: 'string',
    default: '',
    description: 'Custom employee identifier for the API',
    placeholder: 'EMP123',
    displayOptions: {
      show: {
        resource: ['employee'],
        operation: ['create', 'update'],
      },
    },
      },
      {
    displayName: 'Address',
    name: 'address',
        type: 'string',
    typeOptions: {
      rows: 3,
    },
        default: '',
    description: 'Employee address',
    placeholder: 'Jl. Contoh No.123',
    displayOptions: {
      show: {
        resource: ['employee'],
        operation: ['create', 'update'],
      },
    },
  },
  {
    displayName: 'Department ID',
    name: 'department',
    type: 'number',
    default: 0,
    description: 'Department ID (numeric)',
    placeholder: '206',
    displayOptions: {
      show: {
        resource: ['employee'],
        operation: ['create', 'update'],
      },
    },
  },
  {
    displayName: 'Designation ID',
    name: 'designation',
    type: 'number',
    default: 0,
    description: 'Designation ID (numeric)',
    placeholder: '3907',
    displayOptions: {
      show: {
        resource: ['employee'],
        operation: ['create', 'update'],
      },
    },
      },
      {
        displayName: 'Preferred Name',
        name: 'preferredName',
        type: 'string',
        default: '',
    description: 'Employee preferred name',
    placeholder: 'John',
    displayOptions: {
      show: {
        resource: ['employee'],
        operation: ['create', 'update'],
      },
    },
      },
      {
    displayName: 'Username',
    name: 'username',
        type: 'string',
        default: '',
    description: 'Employee username for login',
    placeholder: 'john_doe',
    displayOptions: {
      show: {
        resource: ['employee'],
        operation: ['create', 'update'],
      },
    },
      },
      {
        displayName: 'Timezone',
        name: 'timezone',
        type: 'string',
    default: 'UTC',
    description: 'Employee timezone',
    placeholder: 'Asia/Jakarta',
    displayOptions: {
      show: {
        resource: ['employee'],
        operation: ['create', 'update'],
      },
    },
      },
      {
    displayName: 'Password',
    name: 'updatePassword',
        type: 'string',
    typeOptions: {
      password: true,
    },
        default: '',
    description: 'New password for the employee (optional)',
    displayOptions: {
      show: {
        resource: ['employee'],
        operation: ['update'],
      },
    },
  },

  // Get & Delete Fields
  {
    displayName: 'Employee ID',
    name: 'employeeId',
    type: 'string',
    default: '',
    required: true,
    description: 'ID of the employee to retrieve/update/delete',
    displayOptions: {
      show: {
        resource: ['employee'],
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
        resource: ['employee'],
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
        resource: ['employee'],
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
        resource: ['employee'],
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

  // Direct fields for Get All operation
  {
    displayName: 'Simplify',
    name: 'simplify',
    type: 'boolean',
    default: true,
    description: 'Whether to return simplified response data or raw API response',
    displayOptions: {
      show: {
        resource: ['employee'],
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
        resource: ['employee'],
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
        resource: ['employee'],
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
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Filter',
    default: {},
    displayOptions: {
      show: {
        resource: ['employee'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'Search',
        name: 'search',
        type: 'string',
        default: '',
        description: 'Search employees by name, email, or other fields',
        placeholder: 'Search term...',
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
        description: 'Filter by employee status',
      },
      {
        displayName: 'Department ID',
        name: 'department',
        type: 'string',
        default: '',
        description: 'Filter by department ID',
      },
      {
        displayName: 'Designation ID',
        name: 'designation',
        type: 'string',
        default: '',
        description: 'Filter by designation ID',
      },
    ],
  },
];
