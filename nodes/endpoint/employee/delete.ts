import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

/**
 * Deletes an employee by ID
 * @param this - IExecuteFunctions from n8n
 * @param index - Index of the item
 * @returns Success message or throws error if deletion fails
 */
export async function deleteEmployee(
  this: IExecuteFunctions, 
  index: number
): Promise<INodeExecutionData[]> {
  let employeeId: string;
  
  try {
    employeeId = this.getNodeParameter('employeeId', index) as string;
    
    if (!employeeId) {
      throw new Error('Employee ID is required to delete an employee');
    }

    const responseData = await ApiRequest.call(
      this, 
      'DELETE', 
      `/employees/${employeeId}`
    );
    
    // Handle delete response - usually returns success/status message
    let result;
    if (responseData.status !== undefined) {
      // Standard structure: { status: true, message: "..." }
      result = {
        success: responseData.status,
        message: responseData.message || `Employee with ID ${employeeId} has been deleted successfully`,
        employeeId: employeeId,
      };
    } else {
      // Fallback: return success with employee ID
      result = {
      success: true,
      message: `Employee with ID ${employeeId} has been deleted successfully`,
        employeeId: employeeId,
      ...(responseData || {})
    };
    }

    return [{ json: result, pairedItem: { item: index } }];

  } catch (error) {
    // Improve error messages for user
    if (error.httpCode === 404) {
      const errorEmployeeId = this.getNodeParameter('employeeId', index) as string;
      throw new Error(`Employee with ID ${errorEmployeeId || 'unknown'} not found`);
    }
    
    // Handle other potential errors
    if (error instanceof Error) {
      throw new Error(`Failed to delete employee: ${error.message}`);
    }
    
    throw new Error('An unknown error occurred while deleting the employee. Please check the employee ID and try again.');
  }
}
