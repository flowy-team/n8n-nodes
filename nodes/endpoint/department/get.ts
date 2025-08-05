import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function getDepartment(
  this: IExecuteFunctions, 
  index: number
): Promise<INodeExecutionData[]> {
  const departmentId = this.getNodeParameter('departmentId', index) as string;
  const responseData = await ApiRequest.call(this, 'GET', `/department/${departmentId}`);

  // Always return simplified response - handle different response structures
  let departmentData;
  if (responseData.data) {
    // Standard structure: { status: true, message: "...", data: {...} }
    departmentData = responseData.data;
  } else if (responseData.id) {
    // Direct structure: { id: 123, team_name: "...", ... }
    departmentData = responseData;
  } else {
    // Fallback: return the raw response
    return [{ json: responseData, pairedItem: { item: index } }];
  }

  // Simplify the response according to n8n UX guidelines
  const simplifiedDepartment = {
    id: departmentData.id,
    teamName: departmentData.team_name,
    description: departmentData.description,
    parentId: departmentData.parent_id,
    companyId: departmentData.company_id,
    leaderId: departmentData.leader_id,
    scoreAll: departmentData.score_all,
    scoreUse: departmentData.score_use,
    scorePeriod: departmentData.score_period,
    scorePeriodUse: departmentData.score_period_use,
    rewardPeriod: departmentData.reward_period,
    lft: departmentData._lft,
    rgt: departmentData._rgt,
    createdAt: departmentData.created_at,
    updatedAt: departmentData.updated_at,
    // Remove internal fields and keep user-friendly names
  };

  return [{ json: simplifiedDepartment, pairedItem: { item: index } }];
}

export async function getAllDepartments(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
  try {
    const returnAll = this.getNodeParameter('returnAll', index, false) as boolean;
    const simplify = this.getNodeParameter('simplify', index, true) as boolean;
    const sortDirection = this.getNodeParameter('sortDirection', index, 'DESC') as string;
    const sortField = this.getNodeParameter('sortField', index, 'id') as string;
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

    // Add sorting parameters (direct fields)
    if (sortField) {
      qs.sort_field = sortField;
    }

    if (sortDirection) {
      qs.sort_direction = sortDirection;
    }
    
    // Make API request
    const responseData = await ApiRequest.call(this, 'GET', '/department', {}, qs);

    // Debug logging
    console.log('Department API Response:', JSON.stringify(responseData, null, 2));
    console.log('Department Query Parameters:', JSON.stringify(qs, null, 2));

    // If simplify is false, return raw API response
    if (!simplify) {
      return [{ json: responseData, pairedItem: { item: index } }];
    }

    // Handle different response structures for simplified output
    let departmentsArray;
    if (responseData.data && Array.isArray(responseData.data)) {
      // Standard structure: { status: true, message: "...", data: [...] }
      departmentsArray = responseData.data;
      console.log('Using responseData.data, found', departmentsArray.length, 'departments');
    } else if (Array.isArray(responseData)) {
      // Direct array structure: [...]
      departmentsArray = responseData;
      console.log('Using direct array, found', departmentsArray.length, 'departments');
    } else {
      // Fallback: return the raw response if no data found
      console.log('No array found in response, returning raw response');
      return [{ json: responseData, pairedItem: { item: index } }];
    }

    // Simplify each department in the array
    const simplifiedDepartments = departmentsArray.map((department: any) => ({
      id: department.id,
      companyId: department.company_id,
      teamName: department.team_name,
      leaderId: department.leader_id,
      scoreAll: department.score_all,
      scoreUse: department.score_use,
      scorePeriod: department.score_period,
      scorePeriodUse: department.score_period_use,
      rewardPeriod: department.reward_period,
      description: department.description || 'No description',
      createdAt: department.created_at,
      updatedAt: department.updated_at,
      lft: department._lft,
      rgt: department._rgt,
      parentId: department.parent_id,
      // Remove unnecessary API metadata for simplified view
    }));

    // Return array of simplified departments
    return simplifiedDepartments.map((department: any) => ({
      json: department,
      pairedItem: { item: index }
    }));

  } catch (error) {
    console.error('Department API Error:', error);
    // Improve error messages for user
    if (error.httpCode === 404) {
      return [{ json: { status: false, message: 'No departments found', data: [] }, pairedItem: { item: index } }];
    }
    
    if (error instanceof Error) {
      throw new Error(`Failed to retrieve departments: ${error.message}`);
    }
    
    throw new Error('An unknown error occurred while retrieving departments');
  }
}
