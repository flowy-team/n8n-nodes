import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

/**
 * Retrieves all employees with optional filtering and pagination
 * @param this - IExecuteFunctions from n8n
 * @param index - Index of the item
 * @returns Array of employees or empty array if none found
 */
export async function getAllEmployees(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
  try {
    const returnAll = this.getNodeParameter('returnAll', index, false) as boolean;
    const simplify = this.getNodeParameter('simplify', index, true) as boolean;
    const sortDirection = this.getNodeParameter('sortDirection', index, 'DESC') as string;
    const sortField = this.getNodeParameter('sortField', index, 'id') as string;
    const qs: IDataObject = {};

    // Handle pagination
    if (!returnAll) {
      const limit = this.getNodeParameter('limit', index, 10) as number;
      const page = this.getNodeParameter('page', index, 1) as number;
      
      if (limit < 1 || limit > 1000) {
        throw new Error('Limit must be between 1 and 1000');
      }
      
      qs.limit = limit;
      qs.page = page;
    }

    // Get additional fields for filtering
    const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;
    
    // Add search parameter if provided
    if (additionalFields.search) {
      const searchTerm = (additionalFields.search as string).trim();
      if (searchTerm) {
        qs.search = searchTerm;
      }
    }

    // Add status filter if provided and not 'all'
    if (additionalFields.status && additionalFields.status !== 'all') {
      qs.status = additionalFields.status;
    }

    // Add department filter if provided
    if (additionalFields.department) {
      const departmentId = (additionalFields.department as string).trim();
      if (departmentId) {
        qs.department = departmentId;
      }
    }

    // Add designation filter if provided
    if (additionalFields.designation) {
      const designationId = (additionalFields.designation as string).trim();
      if (designationId) {
        qs.designation = designationId;
      }
    }

    // Prioritize direct sorting fields over additionalFields sorting
    if (sortField) {
      qs.sort_field = sortField;
    } else if (additionalFields.sortBy) {
      qs.sort_by = additionalFields.sortBy;
    }

    if (sortDirection) {
      qs.sort_direction = sortDirection;
    } else if (additionalFields.sortOrder) {
      qs.sort_order = additionalFields.sortOrder;
    }

    // Make API request
    const responseData = await ApiRequest.call(
      this, 
      'GET', 
      '/employees', 
      {}, // No body for GET requests
      qs // Query parameters
    );

    // If simplify is false, return raw API response
    if (!simplify) {
      return [{ json: responseData, pairedItem: { item: index } }];
    }

    // Handle different response structures for simplified output
    let employeesArray;
    if (responseData.data && Array.isArray(responseData.data)) {
      // Standard structure: { status: true, message: "...", data: [...] }
      employeesArray = responseData.data;
    } else if (Array.isArray(responseData)) {
      // Direct array structure: [...]
      employeesArray = responseData;
    } else {
      // Fallback: return the raw response if no data found
      return [{ json: responseData, pairedItem: { item: index } }];
    }

    // Simplify each employee in the array
    const simplifiedEmployees = employeesArray.map((employee: any) => ({
      id: employee.id,
      userId: employee.user_id,
      name: employee.name,
      email: employee.email,
      mobile: employee.mobile,
      gender: employee.gender,
      status: employee.status,
      login: employee.login,
      locale: employee.locale,
      customEmployeeId: employee.employee_id,
      address: employee.address,
      joiningDate: employee.joining_date,
      department: employee.department || 'No department',
      designation: employee.designation || 'No designation',
      preferredName: employee.preferred_name,
      username: employee.username,
      timezone: employee.timezone,
      // Remove unnecessary API metadata for simplified view
    }));

    // Return array of simplified employees
    return simplifiedEmployees.map((employee: any) => ({
      json: employee,
      pairedItem: { item: index }
    }));

  } catch (error) {
    // Improve error messages for user
    if (error.httpCode === 404) {
      return [{ json: { status: false, message: 'No employees found', data: [] }, pairedItem: { item: index } }];
    }
    
    if (error instanceof Error) {
      throw new Error(`Failed to retrieve employees: ${error.message}`);
    }
    
    throw new Error('An unknown error occurred while retrieving employees');
  }
}
