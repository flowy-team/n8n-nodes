import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

/**
 * Retrieves employee details by ID
 * @param this - IExecuteFunctions from n8n
 * @param index - Index of the item
 * @returns Employee details or throws error if not found
 */
export async function getEmployee(
  this: IExecuteFunctions, 
  index: number
): Promise<INodeExecutionData[]> {
  try {
    const employeeId = this.getNodeParameter('employeeId', index) as string;
    
    if (!employeeId) {
      throw new Error('Employee ID is required to retrieve an employee');
    }

    const responseData = await ApiRequest.call(this, 'GET', `/employees/${employeeId}`);

    // Always return simplified response - handle different response structures
    let employeeData;
    if (responseData.data) {
      // Standard structure: { status: true, message: "...", data: {...} }
      employeeData = responseData.data;
    } else if (responseData.id) {
      // Direct structure: { id: 123, name: "...", ... }
      employeeData = responseData;
    } else {
      // Fallback: return the raw response
      return [{ json: responseData, pairedItem: { item: index } }];
    }

    // Simplify the response according to n8n UX guidelines
    const simplifiedEmployee = {
      id: employeeData.id,
      name: employeeData.name,
      email: employeeData.email,
      mobile: employeeData.mobile,
      gender: employeeData.gender,
      status: employeeData.status,
      login: employeeData.login,
      locale: employeeData.locale,
      customEmployeeId: employeeData.employee_id,
      address: employeeData.address,
      joiningDate: employeeData.joining_date,
      department: employeeData.department,
      designation: employeeData.designation,
      preferredName: employeeData.preferred_name,
      username: employeeData.username,
      timezone: employeeData.timezone,
      createdAt: employeeData.created_at,
      updatedAt: employeeData.updated_at,
      // Remove internal fields and keep user-friendly names
    };

    return [{ json: simplifiedEmployee, pairedItem: { item: index } }];

  } catch (error) {
    // Improve error messages for user
    if (error.httpCode === 404) {
      const employeeId = this.getNodeParameter('employeeId', index) as string;
      throw new Error(`Employee with ID ${employeeId || 'unknown'} not found`);
    }
    
    if (error instanceof Error) {
      throw new Error(`Failed to retrieve employee: ${error.message}`);
    }
    
    throw new Error('An unknown error occurred while retrieving employee details');
  }
}
