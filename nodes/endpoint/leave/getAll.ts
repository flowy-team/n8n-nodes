import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function getAllLeaves(
  this: IExecuteFunctions, 
  index: number
): Promise<INodeExecutionData[]> {
  try {
    const returnAll = this.getNodeParameter('returnAll', index, false) as boolean;
    const simplify = this.getNodeParameter('simplify', index, true) as boolean;
    const qs: IDataObject = {};

    // Handle pagination
    if (!returnAll) {
      const limit = this.getNodeParameter('limit', index, 50) as number;
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

    // Add employee filter if provided
    if (additionalFields.employee) {
      const employeeId = (additionalFields.employee as string).trim();
      if (employeeId) {
        qs.employee = employeeId;
      }
    }

    // Add leave type filter if provided
    if (additionalFields.leaveType) {
      const leaveTypeId = (additionalFields.leaveType as string).trim();
      if (leaveTypeId) {
        qs.leaveType = leaveTypeId;
      }
    }

    // Add date range filters if provided
    if (additionalFields.startDate) {
      const startDate = new Date(additionalFields.startDate as string);
      qs.startDate = startDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    }

    if (additionalFields.endDate) {
      const endDate = new Date(additionalFields.endDate as string);
      qs.endDate = endDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    }

    // Make API request
    const responseData = await ApiRequest.call(this, 'GET', '/leave', {}, qs);

    // Debug logging
    console.log('Leave API Response:', JSON.stringify(responseData, null, 2));
    console.log('Leave Query Parameters:', JSON.stringify(qs, null, 2));

    // If simplify is false, return raw API response
    if (!simplify) {
      return [{ json: responseData, pairedItem: { item: index } }];
    }

    // Handle different response structures for simplified output
    let leavesArray;
    if (responseData.data && Array.isArray(responseData.data)) {
      // Standard structure: { status: true, message: "...", data: [...] }
      leavesArray = responseData.data;
      console.log('Using responseData.data, found', leavesArray.length, 'leaves');
    } else if (Array.isArray(responseData)) {
      // Direct array structure: [...]
      leavesArray = responseData;
      console.log('Using direct array, found', leavesArray.length, 'leaves');
    } else {
      // Fallback: return the raw response if no data found
      console.log('No array found in response, returning raw response');
      return [{ json: responseData, pairedItem: { item: index } }];
    }

    // Simplify each leave in the array
    const simplifiedLeaves = leavesArray.map((leave: any) => ({
      id: leave.id,
      userId: leave.user_id,
      leaveTypeId: leave.leave_type_id,
      duration: leave.duration,
      reason: leave.reason,
      status: leave.status,
      leaveDate: leave.leave_date,
      multiDate: leave.multi_date,
      attachment: leave.attachment,
      appliedOn: leave.applied_on,
      createdAt: leave.created_at,
      updatedAt: leave.updated_at,
      // Remove unnecessary API metadata for simplified view
    }));

    // Return array of simplified leaves
    return simplifiedLeaves.map((leave: any) => ({
      json: leave,
      pairedItem: { item: index }
    }));

  } catch (error) {
    console.error('Leave API Error:', error);
    // Improve error messages for user
    if (error.httpCode === 404) {
      return [{ json: { status: false, message: 'No leaves found', data: [] }, pairedItem: { item: index } }];
    }
    
    if (error instanceof Error) {
      throw new Error(`Failed to retrieve leaves: ${error.message}`);
    }
    
    throw new Error('An unknown error occurred while retrieving leaves');
  }
}
