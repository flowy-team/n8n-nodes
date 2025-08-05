import {
  INodeExecutionData,
  NodeConnectionType,
  type IExecuteFunctions,
  type INodeType,
  type INodeTypeDescription,
  NodeOperationError,
  type INodeProperties
} from 'n8n-workflow';

// Import operations and fields
import { attendanceOperations, attendanceFields } from '../operations/Attendance/Attendance';
import { clientOperations, clientFields } from '../operations/Client/Client';
import { departmentOperations, departmentFields } from '../operations/Department/Department';
import { designationOperations, designationFields } from '../operations/Designation/Designation';
import { employeeOperations, employeeFields } from '../operations/Employee/Employee';
import { holidayOperations, holidayFields } from '../operations/Holiday/Holiday';
import { keyResultOperations, keyResultFields } from '../operations/KeyResult/KeyResult';
import { kpiCategoryOperations, kpiCategoryFields } from '../operations/kpiCategories/KpiCategories';
import { kpiDataOperations, kpiDataFields } from '../operations/kpiData/KPIData';
import { kpiOperations, kpiFields } from '../operations/kpi/KPI';
import { leaveOperations, leaveFields } from '../operations/Leave/Leave';
import { objectiveOperations, objectiveFields } from '../operations/Objective/Objective';
import { performanceCycleOperations, performanceCycleFields } from '../operations/PerformanceCycle/PerformanceCycle';
import { projectCategoriesOperations, projectCategoriesFields } from '../operations/projectCategories/ProjectCategories';
import { projectsOperations, projectsFields } from '../operations/projects/Projects';
import { taskCategoriesOperations, taskCategoriesFields } from '../operations/taskCategories/TaskCategories';
import { tasksOperations, tasksFields } from '../operations/tasks/Tasks';
import { ticketChannelOperations, ticketChannelFields } from '../operations/TicketChannel/TicketChannel';
import { ticketOperations, ticketFields } from '../operations/Ticket/Ticket';
import { ticketTypeOperations, ticketTypeFields } from '../operations/TicketType/TicketType';
import { ticketAgentOperations, ticketAgentFields } from '../operations/TicketAgent/TicketAgent';

// Import ticket channel endpoints
import { createTicketChannel } from '../endpoint/ticket-channel/create';
import { getTicketChannel } from '../endpoint/ticket-channel/get';
import { getAllTicketChannels } from '../endpoint/ticket-channel/getAll';
import { updateTicketChannel } from '../endpoint/ticket-channel/update';
import { deleteTicketChannel } from '../endpoint/ticket-channel/delete';

// Import performance cycle endpoints
import { createPerformanceCycle } from '../endpoint/performance-cycle/create';
import { getPerformanceCycle } from '../endpoint/performance-cycle/get';
import { getAllPerformanceCycles } from '../endpoint/performance-cycle/getAll';
import { updatePerformanceCycle } from '../endpoint/performance-cycle/update';
import { deletePerformanceCycle } from '../endpoint/performance-cycle/delete';

// Import endpoint functions
import { createTask } from '../endpoint/task/create';
import { getTask, getAllTasks } from '../endpoint/task/get';
import { updateTask } from '../endpoint/task/update';
import { deleteTask } from '../endpoint/task/delete';
import { createTaskCategory } from '../endpoint/task-category/create';
import { getTaskCategory, getAllTaskCategories } from '../endpoint/task-category/get';
import { updateTaskCategory } from '../endpoint/task-category/update';
import { deleteTaskCategory } from '../endpoint/task-category/delete';
import { createProjectCategory } from '../endpoint/project-category/create';
import { getProjectCategory, showProjectCategories } from '../endpoint/project-category/get';
import { updateProjectCategory } from '../endpoint/project-category/update';
import { deleteProjectCategory } from '../endpoint/project-category/delete';
import { createProject } from '../endpoint/projects/create';
import { getProject, showProjects } from '../endpoint/projects/get';
import { updateProject } from '../endpoint/projects/update';
import { deleteProject } from '../endpoint/projects/delete';
import { createDepartment } from '../endpoint/department/create';
import { updateDepartment } from '../endpoint/department/update';
import { getDepartment, getAllDepartments } from '../endpoint/department/get';
import { deleteDepartment } from '../endpoint/department/delete';
import { createDesignation } from '../endpoint/designation/create';
import { getDesignation, getAllDesignations } from '../endpoint/designation/get';
import { updateDesignation } from '../endpoint/designation/update';
import { deleteDesignation } from '../endpoint/designation/delete';
import { createEmployee } from '../endpoint/employee/create';
import { getEmployee } from '../endpoint/employee/get';
import { getAllEmployees } from '../endpoint/employee/getAll';
import { updateEmployee } from '../endpoint/employee/update';
import { deleteEmployee } from '../endpoint/employee/delete';
import { createKPI } from '../endpoint/kpi/create';
import { getKPIs } from '../endpoint/kpi/get';
import { showKPI } from '../endpoint/kpi/show';
import { updateKPI } from '../endpoint/kpi/update';
import { deleteKPI } from '../endpoint/kpi/delete';
import { getKPIData } from '../endpoint/kpi-data/get';
import { showKPIData } from '../endpoint/kpi-data/show';
import { updateKPIData } from '../endpoint/kpi-data/update';
import { deleteKPIData } from '../endpoint/kpi-data/delete';
import { createKpiCategory } from '../endpoint/kpi-category/create';
import { getKpiCategories } from '../endpoint/kpi-category/get';
import { showKpiCategory } from '../endpoint/kpi-category/show';
import { updateKpiCategory } from '../endpoint/kpi-category/update';
import { deleteKpiCategory } from '../endpoint/kpi-category/delete';

// Import holiday endpoint functions
import { createHoliday } from '../endpoint/holiday/create';
import { getHoliday } from '../endpoint/holiday/get';
import { getAllHolidays } from '../endpoint/holiday/getAll';
import { updateHoliday } from '../endpoint/holiday/update';
import { deleteHoliday } from '../endpoint/holiday/delete';

// Import leave endpoint functions
import { createLeave } from '../endpoint/leave/create';
import { getLeave } from '../endpoint/leave/get';
import { getAllLeaves } from '../endpoint/leave/getAll';
import { updateLeave } from '../endpoint/leave/update';
import { deleteLeave } from '../endpoint/leave/delete';

// Import client endpoint functions
import createClient from '../endpoint/client/create';
import getClient from '../endpoint/client/get';
import { getAllClients } from '../endpoint/client/getAll';
import updateClient from '../endpoint/client/update';
import deleteClient from '../endpoint/client/delete';

// Import ticket type endpoint functions
import createTicketType from '../endpoint/ticket-type/create';
import getTicketType from '../endpoint/ticket-type/get';
import { getAllTicketTypes } from '../endpoint/ticket-type/getAll';
import updateTicketType from '../endpoint/ticket-type/update';
import deleteTicketType from '../endpoint/ticket-type/delete';

// Import objective endpoint functions
import { createObjective } from '../endpoint/objective/create';
import { getObjective } from '../endpoint/objective/get';
import { showObjectives } from '../endpoint/objective/show';
import { updateObjective } from '../endpoint/objective/update';
import { deleteObjective } from '../endpoint/objective/delete';

// Import key result endpoint functions
import { createKeyResult } from '../endpoint/key-result/create';
import { getKeyResult } from '../endpoint/key-result/get';
import { showKeyResults } from '../endpoint/key-result/show';
import { updateKeyResult } from '../endpoint/key-result/update';
import { deleteKeyResult } from '../endpoint/key-result/delete';

// Import attendance endpoint functions
import { clockIn } from '../endpoint/attendance/clockIn';
import { clockOut } from '../endpoint/attendance/clockOut';
import { today } from '../endpoint/attendance/today';

// Import ticket endpoint functions
import { getTicket, getAllTickets } from '../endpoint/ticket/get';
import { createTicket } from '../endpoint/ticket/create';
import { updateTicket } from '../endpoint/ticket/update';
import { deleteTicket } from '../endpoint/ticket/delete';

// Import ticket agent endpoint functions
import { getTicketAgents } from '../endpoint/ticket-agent/get';

// Resource selector - first level selection
const resourceSelector: INodeProperties = {
  displayName: 'Resource',
  name: 'resource',
  type: 'options',
  noDataExpression: true,
  options: [
    {
      name: 'Attendance',
      value: 'attendance',
      description: 'Manage employee attendance records',
    },
    {
      name: 'Client',
      value: 'client',
      description: 'Manage client information',
    },
    {
      name: 'Department',
      value: 'department',
      description: 'Manage company departments',
    },
    {
      name: 'Designation',
      value: 'designation',
      description: 'Manage employee designations',
    },
    {
      name: 'Employee',
      value: 'employee',
      description: 'Manage employee records',
    },
    {
      name: 'Holiday',
      value: 'holiday',
      description: 'Manage company holidays',
    },
    {
      name: 'KPI',
      value: 'kpi',
      description: 'Manage key performance indicators',
    },
    {
      name: 'KPI Category',
      value: 'kpiCategory',
      description: 'Manage KPI categories',
    },
    {
      name: 'KPI Data',
      value: 'kpiData',
      description: 'Manage KPI data records',
    },
    {
      name: 'Leave',
      value: 'leave',
      description: 'Manage leave requests',
    },
    {
      name: 'OKR Key Result',
      value: 'keyResult',
      description: 'Manage OKR key results',
    },
    {
      name: 'OKR Objective',
      value: 'objective',
      description: 'Manage OKR objectives',
    },
    {
      name: 'Performance Cycle',
      value: 'performanceCycle',
      description: 'Manage performance cycles',
    },
    {
      name: 'Project',
      value: 'project',
      description: 'Manage projects',
    },
    {
      name: 'Project Category',
      value: 'projectCategory',
      description: 'Manage project categories',
    },
    {
      name: 'Task',
      value: 'task',
      description: 'Manage tasks',
    },
    {
      name: 'Task Category',
      value: 'taskCategory',
      description: 'Manage task categories',
    },
    {
      name: 'Ticket',
      value: 'ticket',
      description: 'Manage support tickets',
    },
    {
      name: 'Ticket Agent',
      value: 'ticketAgent',
      description: 'Manage ticket agents',
    },
    {
      name: 'Ticket Channel',
      value: 'ticketChannel',
      description: 'Manage ticket channels',
    },
    {
      name: 'Ticket Type',
      value: 'ticketType',
      description: 'Manage ticket types',
    },
  ],
  default: 'task',
};

// Define resources with their operations and fields
const resources = [
  { name: 'attendance', operations: attendanceOperations, fields: attendanceFields },
  { name: 'client', operations: clientOperations, fields: clientFields },
  { name: 'department', operations: departmentOperations, fields: departmentFields },
  { name: 'designation', operations: designationOperations, fields: designationFields },
  { name: 'employee', operations: employeeOperations, fields: employeeFields },
  { name: 'holiday', operations: holidayOperations, fields: holidayFields },
  { name: 'keyResult', operations: keyResultOperations, fields: keyResultFields },
  { name: 'kpi', operations: kpiOperations, fields: kpiFields },
  { name: 'kpiCategory', operations: kpiCategoryOperations, fields: kpiCategoryFields },
  { name: 'kpiData', operations: kpiDataOperations, fields: kpiDataFields },
  { name: 'leave', operations: leaveOperations, fields: leaveFields },
  { name: 'objective', operations: objectiveOperations, fields: objectiveFields },
  { name: 'performanceCycle', operations: performanceCycleOperations, fields: performanceCycleFields },
  { name: 'project', operations: projectsOperations, fields: projectsFields },
  { name: 'projectCategory', operations: projectCategoriesOperations, fields: projectCategoriesFields },
  { name: 'task', operations: tasksOperations, fields: tasksFields },
  { name: 'taskCategory', operations: taskCategoriesOperations, fields: taskCategoriesFields },
  { name: 'ticket', operations: ticketOperations, fields: ticketFields },
  { name: 'ticketAgent', operations: ticketAgentOperations, fields: ticketAgentFields },
  { name: 'ticketChannel', operations: ticketChannelOperations, fields: ticketChannelFields },
  { name: 'ticketType', operations: ticketTypeOperations, fields: ticketTypeFields },
];

// Combine all properties for the node
const modularProperties: INodeProperties[] = [
  resourceSelector,
  ...resources.flatMap(resource => [...resource.operations, ...resource.fields]),
];

export class Flowyteam implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Flowyteam',
		name: 'flowyteam',
		icon: 'file:flowyteam.svg',
		group: ['transform'],
		version: 1,
		description: 'Custom node for Flowyteam API',
		subtitle: '={{ $parameter["resource"] + ": " + $parameter["operation"] }}',
		defaults: {
			name: 'Flowyteam',
		},
		inputs: [{ type: NodeConnectionType.Main }],
		outputs: [{ type: NodeConnectionType.Main }],
		credentials: [
			{
				name: 'flowyteamApi',
				required: true,
			},
		],
		properties: modularProperties,
		usableAsTool: true,
	};

	async execute(this: IExecuteFunctions) {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		// For ticket, ticket channel, ticket type, client, key result, objective, performance cycle, project, and project category create/update/delete operations, only process the first item to avoid duplicates
		const firstResource = this.getNodeParameter('resource', 0) as string;
		const firstOperation = this.getNodeParameter('operation', 0) as string;
		
		if ((firstResource === 'ticket' || firstResource === 'ticketChannel' || firstResource === 'ticketType' || firstResource === 'client' || firstResource === 'keyResult' || firstResource === 'objective' || firstResource === 'performanceCycle' || firstResource === 'project' || firstResource === 'projectCategory' || firstResource === 'department' || firstResource === 'holiday' || firstResource === 'leave' || firstResource === 'employee' || firstResource === 'kpiCategory' || firstResource === 'kpi' || firstResource === 'kpiData' || firstResource === 'taskCategory' || firstResource === 'task') && (firstOperation === 'create' || firstOperation === 'update' || firstOperation === 'delete' || firstOperation === 'get')) {
			// Only process one item using the first input item
			let responseData;
			if (firstResource === 'ticket') {
				if (firstOperation === 'create') {
					responseData = await createTicket.call(this, 0);
				} else if (firstOperation === 'update') {
					responseData = await updateTicket.call(this, 0);
				} else if (firstOperation === 'delete') {
					responseData = await deleteTicket.call(this, 0);
				}
			} else if (firstResource === 'ticketChannel') {
				if (firstOperation === 'create') {
					responseData = await createTicketChannel.call(this, 0);
				} else if (firstOperation === 'update') {
					responseData = await updateTicketChannel.call(this, 0);
				} else if (firstOperation === 'delete') {
					responseData = await deleteTicketChannel.call(this, 0);  
				}
			} else if (firstResource === 'ticketType') {
				if (firstOperation === 'create') {
					responseData = await createTicketType.call(this, 0);
				} else if (firstOperation === 'update') {
					responseData = await updateTicketType.call(this, 0);
				} else if (firstOperation === 'delete') {
					responseData = await deleteTicketType.call(this, 0);
				}
			} else if (firstResource === 'client') {
				if (firstOperation === 'create') {
					responseData = await createClient.call(this, 0);
				} else if (firstOperation === 'update') {
					responseData = await updateClient.call(this, 0);
				} else if (firstOperation === 'delete') {
					responseData = await deleteClient.call(this, 0);
				}
			} else if (firstResource === 'keyResult') {
				if (firstOperation === 'create') {
					responseData = await createKeyResult.call(this, 0);
				} else if (firstOperation === 'update') {
					responseData = await updateKeyResult.call(this, 0);
				} else if (firstOperation === 'delete') {
					responseData = await deleteKeyResult.call(this, 0);
				}
			} else if (firstResource === 'objective') {
				if (firstOperation === 'create') {
					responseData = await createObjective.call(this, 0);
				} else if (firstOperation === 'update') {
					responseData = await updateObjective.call(this, 0);
				} else if (firstOperation === 'delete') {
					responseData = await deleteObjective.call(this, 0);
				}
			} else if (firstResource === 'performanceCycle') {
				if (firstOperation === 'create') {
					responseData = await createPerformanceCycle.call(this, 0);
				} else if (firstOperation === 'update') {
					responseData = await updatePerformanceCycle.call(this, 0);
				} else if (firstOperation === 'delete') {
					responseData = await deletePerformanceCycle.call(this, 0);
				}
			} else if (firstResource === 'project') {
				if (firstOperation === 'create') {
					responseData = await createProject.call(this, 0);
				} else if (firstOperation === 'update') {
					responseData = await updateProject.call(this, 0);
				} else if (firstOperation === 'delete') {
					responseData = await deleteProject.call(this, 0);
				} else if (firstOperation === 'get') {
					responseData = await getProject.call(this, 0);
				}
			} else if (firstResource === 'projectCategory') {
				if (firstOperation === 'create') {
					responseData = await createProjectCategory.call(this, 0);
				} else if (firstOperation === 'update') {
					responseData = await updateProjectCategory.call(this, 0);
				} else if (firstOperation === 'delete') {
					responseData = await deleteProjectCategory.call(this, 0);
				}
			} else if (firstResource === 'department') {
				if (firstOperation === 'create') {
					responseData = await createDepartment.call(this, 0);
				} else if (firstOperation === 'update') {
					responseData = await updateDepartment.call(this, 0);
				} else if (firstOperation === 'delete') {
					responseData = await deleteDepartment.call(this, 0);
				}
			} else if (firstResource === 'holiday') {
				if (firstOperation === 'create') {
					responseData = await createHoliday.call(this, 0);
				} else if (firstOperation === 'update') {
					responseData = await updateHoliday.call(this, 0);
				} else if (firstOperation === 'delete') {
					responseData = await deleteHoliday.call(this, 0);
				}
			} else if (firstResource === 'leave') {
				if (firstOperation === 'create') {
					responseData = await createLeave.call(this, 0);
				} else if (firstOperation === 'update') {
					responseData = await updateLeave.call(this, 0);
				} else if (firstOperation === 'delete') {
					responseData = await deleteLeave.call(this, 0);
				}
			} else if (firstResource === 'employee') {
				if (firstOperation === 'create') {
					responseData = await createEmployee.call(this, 0);
				} else if (firstOperation === 'update') {
					responseData = await updateEmployee.call(this, 0);
				} else if (firstOperation === 'delete') {
					responseData = await deleteEmployee.call(this, 0);
				}
			} else if (firstResource === 'kpiCategory') {
				if (firstOperation === 'create') {
					responseData = await createKpiCategory.call(this, 0);
				} else if (firstOperation === 'update') {
					responseData = await updateKpiCategory.call(this, 0);
				} else if (firstOperation === 'delete') {
					responseData = await deleteKpiCategory.call(this, 0);
				}
			} else if (firstResource === 'kpi') {
				if (firstOperation === 'create') {
					responseData = await createKPI.call(this, 0);
				} else if (firstOperation === 'update') {
					responseData = await updateKPI.call(this, 0);
				} else if (firstOperation === 'delete') {
					responseData = await deleteKPI.call(this, 0);
				} else if (firstOperation === 'get') {
					responseData = await showKPI.call(this, 0);
				}
			} else if (firstResource === 'kpiData') {
				if (firstOperation === 'get') {
					responseData = await showKPIData.call(this, 0);
				} else if (firstOperation === 'update') {
					responseData = await updateKPIData.call(this, 0);
				} else if (firstOperation === 'delete') {
					responseData = await deleteKPIData.call(this, 0);
				}
			} else if (firstResource === 'taskCategory') {
				if (firstOperation === 'create') {
					responseData = await createTaskCategory.call(this, 0);
				} else if (firstOperation === 'update') {
					responseData = await updateTaskCategory.call(this, 0);
				} else if (firstOperation === 'delete') {
					responseData = await deleteTaskCategory.call(this, 0);
				} else if (firstOperation === 'get') {
					responseData = await getTaskCategory.call(this, 0);
				}
			} else if (firstResource === 'task') {
				if (firstOperation === 'create') {
					responseData = await createTask.call(this, 0);
				} else if (firstOperation === 'update') {
					responseData = await updateTask.call(this, 0);
				} else if (firstOperation === 'delete') {
					responseData = await deleteTask.call(this, 0);
				} else if (firstOperation === 'get') {
					responseData = await getTask.call(this, 0);
				}
			}
			if (responseData) {
				if (Array.isArray(responseData)) {
					returnData.push(...responseData);
				} else {
					returnData.push(responseData);
				}
			}
			return [returnData];
		}

		for (let i = 0; i < items.length; i++) {
			const resource = this.getNodeParameter('resource', i) as string;
			const operation = this.getNodeParameter('operation', i) as string;
			let responseData;

			switch (resource) {
				case 'attendance':
					switch (operation) {
						case 'clockIn':
							responseData = await clockIn.call(this, i);
							break;
						case 'clockOut':
							responseData = await clockOut.call(this, i);
							break;
						case 'today':
							responseData = await today.call(this, i);
							break;
						default:
							throw new NodeOperationError(this.getNode(), `The operation '${operation}' is not supported for Attendance resource`);
					}
					break;

				case 'task':
					switch (operation) {
						case 'create':
							responseData = await createTask.call(this, i);
							break;
						case 'get':
							responseData = await getTask.call(this, i);
							break;
						case 'getAll':
							responseData = await getAllTasks.call(this, i);
							break;
						case 'update':
							responseData = await updateTask.call(this, i);
							break;
						case 'delete':
							responseData = await deleteTask.call(this, i);
							break;
						default:
							throw new NodeOperationError(this.getNode(), `The operation '${operation}' is not supported for Task resource`);
					}
					break;

				case 'taskCategory':
					switch (operation) {
						case 'create':
							responseData = await createTaskCategory.call(this, i);
							break;
						case 'get':
							responseData = await getTaskCategory.call(this, i);
							break;
						case 'getAll':
							responseData = await getAllTaskCategories.call(this, i);
							break;
						case 'update':
							responseData = await updateTaskCategory.call(this, i);
							break;
						case 'delete':
							responseData = await deleteTaskCategory.call(this, i);
							break;
						default:
							throw new NodeOperationError(this.getNode(), `The operation '${operation}' is not supported for Task Category resource`);
					}
					break;

				case 'project':
					switch (operation) {
						case 'create':
							responseData = await createProject.call(this, i);
							break;
						case 'get':
							responseData = await getProject.call(this, i);
							break;
						case 'getAll':
							responseData = await showProjects.call(this, i);
							break;
						case 'update':
							responseData = await updateProject.call(this, i);
							break;
						case 'delete':
							responseData = await deleteProject.call(this, i);
							break;
						default:
							throw new NodeOperationError(this.getNode(), `The operation '${operation}' is not supported for Project resource`);
					}
					break;

				case 'projectCategory':
					switch (operation) {
						case 'create':
							responseData = await createProjectCategory.call(this, i);
							break;
						case 'get':
							responseData = await getProjectCategory.call(this, i);
							break;
						case 'getAll':
							responseData = await showProjectCategories.call(this, i);
							break;
						case 'update':
							responseData = await updateProjectCategory.call(this, i);
							break;
						case 'delete':
							responseData = await deleteProjectCategory.call(this, i);
							break;
						default:
							throw new NodeOperationError(this.getNode(), `The operation '${operation}' is not supported for Project Category resource`);
					}
					break;

				case 'kpi':
					switch (operation) {
						case 'create':
							responseData = await createKPI.call(this, i);
							break;
						case 'getAll':
							responseData = await getKPIs.call(this, i);
							break;
						case 'get':
							responseData = await showKPI.call(this, i);
							break;
						case 'update':
							responseData = await updateKPI.call(this, i);
							break;
						case 'delete':
							responseData = await deleteKPI.call(this, i);
							break;
						default:
							throw new NodeOperationError(this.getNode(), `The operation '${operation}' is not supported for KPI resource`);
					}
					break;

				case 'kpiData':
					switch (operation) {
						case 'getAll':
							responseData = await getKPIData.call(this, i);
							break;
						case 'get':
							responseData = await showKPIData.call(this, i);
							break;
						case 'update':
							responseData = await updateKPIData.call(this, i);
							break;
						case 'delete':
							responseData = await deleteKPIData.call(this, i);
							break;
						default:
							throw new NodeOperationError(this.getNode(), `The operation '${operation}' is not supported for KPI Data resource`);
					}
					break;

				case 'kpiCategory':
					switch (operation) {
						case 'create':
							responseData = await createKpiCategory.call(this, i);
							break;
						case 'get':
							responseData = await showKpiCategory.call(this, i);
							break;
						case 'getAll':
							responseData = await getKpiCategories.call(this, i);
							break;
						case 'update':
							responseData = await updateKpiCategory.call(this, i);
							break;
						case 'delete':
							responseData = await deleteKpiCategory.call(this, i);
							break;
						default:
							throw new NodeOperationError(this.getNode(), `The operation '${operation}' is not supported for KPI Category resource`);
					}
					break;

				case 'employee':
					switch (operation) {
						case 'create':
							responseData = await createEmployee.call(this, i);
							break;
						case 'get':
							responseData = await getEmployee.call(this, i);
							break;
						case 'getAll':
							responseData = await getAllEmployees.call(this, i);
							break;
						case 'update':
							responseData = await updateEmployee.call(this, i);
							break;
						case 'delete':
							responseData = await deleteEmployee.call(this, i);
							break;
						default:
							throw new NodeOperationError(this.getNode(), `The operation '${operation}' is not supported for Employee resource`);
					}
					break;

				case 'department':
					switch (operation) {
						case 'create':
							responseData = await createDepartment.call(this, i);
							break;
						case 'get':
							responseData = await getDepartment.call(this, i);
							break;
						case 'getAll':
							responseData = await getAllDepartments.call(this, i);
							break;
						case 'update':
							responseData = await updateDepartment.call(this, i);
							break;
						case 'delete':
							responseData = await deleteDepartment.call(this, i);
							break;
						default:
							throw new NodeOperationError(this.getNode(), `The operation '${operation}' is not supported for Department resource`);
					}
					break;

				case 'designation':
					switch (operation) {
						case 'create':
							responseData = await createDesignation.call(this, i);
							break;
						case 'get':
							responseData = await getDesignation.call(this, i);
							break;
						case 'getAll':
							responseData = await getAllDesignations.call(this, i);
							break;
						case 'update':
							responseData = await updateDesignation.call(this, i);
							break;
						case 'delete':
							responseData = await deleteDesignation.call(this, i);
							break;
						default:
							throw new NodeOperationError(this.getNode(), `The operation '${operation}' is not supported for Designation resource`);
					}
					break;

				case 'holiday':
					switch (operation) {
						case 'create':
							responseData = await createHoliday.call(this, i);
							break;
						case 'get':
							responseData = await getHoliday.call(this, i);
							break;
						case 'getAll':
							responseData = await getAllHolidays.call(this, i);
							break;
						case 'update':
							responseData = await updateHoliday.call(this, i);
							break;
						case 'delete':
							responseData = await deleteHoliday.call(this, i);
							break;
						default:
							throw new NodeOperationError(this.getNode(), `The operation '${operation}' is not supported for Holiday resource`);
					}
					break;

				case 'leave':
					switch (operation) {
						case 'create':
							responseData = await createLeave.call(this, i);
							break;
						case 'get':
							responseData = await getLeave.call(this, i);
							break;
						case 'getAll':
							responseData = await getAllLeaves.call(this, i);
							break;
						case 'update':
							responseData = await updateLeave.call(this, i);
							break;
						case 'delete':
							responseData = await deleteLeave.call(this, i);
							break;
						default:
							throw new NodeOperationError(this.getNode(), `The operation '${operation}' is not supported for Leave resource`);
					}
					break;

				case 'client':
					switch (operation) {
						case 'create':
							responseData = await createClient.call(this, i);
							break;
						case 'get':
							responseData = await getClient.call(this, i);
							break;
						case 'getAll':
							responseData = await getAllClients.call(this, i);
							break;
						case 'update':
							responseData = await updateClient.call(this, i);
							break;
						case 'delete':
							responseData = await deleteClient.call(this, i);
							break;
						default:
							throw new NodeOperationError(this.getNode(), `The operation '${operation}' is not supported for Client resource`);
					}
					break;

				case 'objective':
					switch (operation) {
						case 'create':
							responseData = await createObjective.call(this, i);
							break;
						case 'get':
							responseData = await getObjective.call(this, i);
							break;
						case 'getAll':
							responseData = await showObjectives.call(this, i);
							break;
						case 'update':
							responseData = await updateObjective.call(this, i);
							break;
						case 'delete':
							responseData = await deleteObjective.call(this, i);
							break;
						default:
							throw new NodeOperationError(this.getNode(), `The operation '${operation}' is not supported for Objective resource`);
					}
					break;

				case 'keyResult':
					switch (operation) {
						case 'create':
							responseData = await createKeyResult.call(this, i);
							break;
						case 'get':
							responseData = await getKeyResult.call(this, i);
							break;
						case 'getAll':
							responseData = await showKeyResults.call(this, i);
							break;
						case 'update':
							responseData = await updateKeyResult.call(this, i);
							break;
						case 'delete':
							responseData = await deleteKeyResult.call(this, i);
							break;
						default:
							throw new NodeOperationError(this.getNode(), `The operation '${operation}' is not supported for Key Result resource`);
					}
					break;

				case 'ticket':
          switch (operation) {
            case 'create':
							responseData = await createTicket.call(this, i);
							break;
						case 'get':
							responseData = await getTicket.call(this, i);
							break;
						case 'getAll':
							responseData = await getAllTickets.call(this, i);
							break;
						case 'update':
							responseData = await updateTicket.call(this, i);
							break;
						case 'delete':
							responseData = await deleteTicket.call(this, i);
							break;
						default:
              throw new NodeOperationError(this.getNode(), `The operation '${operation}' is not supported for Ticket resource`);
          }
          break;

        case 'ticketAgent':
          switch (operation) {
            case 'get':
              responseData = await getTicketAgents.call(this, i);
              break;
            default:
              throw new NodeOperationError(this.getNode(), `The operation '${operation}' is not supported for resource '${resource}'.`);
          }
          break;

        case 'ticketChannel':
          switch (operation) {
            case 'get':
              responseData = await getTicketChannel.call(this, i);
              break;
            case 'getAll':
              responseData = await getAllTicketChannels.call(this, i);
              break;
            case 'create':
              responseData = await createTicketChannel.call(this, i);
              break;
            case 'update':
              responseData = await updateTicketChannel.call(this, i);
              break;
            case 'delete':
              responseData = await deleteTicketChannel.call(this, i);
              break;
            default:
              throw new NodeOperationError(this.getNode(), `The operation '${operation}' is not supported for resource '${resource}'.`);
          }
          break;
          
        case 'performanceCycle':
          switch (operation) {
            case 'create':
              responseData = await createPerformanceCycle.call(this, i);
              break;
            case 'get':
              responseData = await getPerformanceCycle.call(this, i);
              break;
            case 'getAll':
              responseData = await getAllPerformanceCycles.call(this, i);
              break;
            case 'update':
              responseData = await updatePerformanceCycle.call(this, i);
              break;
            case 'delete':
              responseData = await deletePerformanceCycle.call(this, i);
              break;
            default:
              throw new NodeOperationError(this.getNode(), `The operation '${operation}' is not supported for resource '${resource}'.`);
          }
          break;

				case 'ticketType':
					switch (operation) {
						case 'create':
							responseData = await createTicketType.call(this, i);
							break;
						case 'get':
							responseData = await getTicketType.call(this, i);
							break;
						case 'getAll':
							responseData = await getAllTicketTypes.call(this, i);
							break;
						case 'update':
							responseData = await updateTicketType.call(this, i);
							break;
						case 'delete':
							responseData = await deleteTicketType.call(this, i);
							break;
						default:
							throw new NodeOperationError(this.getNode(), `The operation '${operation}' is not supported for Ticket Type resource`);
					}
					break;

				default:
					throw new NodeOperationError(this.getNode(), `The resource '${resource}' is not supported`);
			}

			// responseData is already in n8n format from endpoint functions
			if (Array.isArray(responseData)) {
				returnData.push(...responseData);
			} else {
				returnData.push(responseData);
			}
		}

		return [returnData];
	}
}
