import type { INodeProperties } from 'n8n-workflow';

export const attendanceOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['attendance'],
			},
		},
		options: [
			{
				name: 'Clock In',
				value: 'clockIn',
				description: 'Record employee arrival time and location',
				action: 'Clock in to attendance',
			},
			{
				name: 'Clock Out',
				value: 'clockOut',
				description: 'Record employee departure time from work',
				action: 'Clock out from attendance',
			},
			{
				name: 'Today',
				value: 'today',
				description: 'Retrieve current day attendance records',
				action: 'Get today\'s attendance',
			},
		],
		default: 'clockIn',
	},
];

export const attendanceFields: INodeProperties[] = [
	// Clock In fields
	{
		displayName: 'Working From',
		name: 'working_from',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['attendance'],
				operation: ['clockIn'],
			},
		},
		default: '',
		description: 'Location where you are working from',
	},

	// Clock Out fields
	{
		displayName: 'Attendance ID',
		name: 'attendanceId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['attendance'],
				operation: ['clockOut'],
			},
		},
		default: '',
		description: 'The ID of the attendance record to clock out',
	},
]; 