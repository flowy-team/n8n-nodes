import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function getLeave(
  this: IExecuteFunctions, 
  index: number
): Promise<INodeExecutionData[]> {
  const leaveId = this.getNodeParameter('leaveId', index) as string;
  
  if (!leaveId) {
    throw new Error('Leave ID is required');
  }

  const responseData = await ApiRequest.call(this, 'GET', `/leave/${leaveId}`);

  // Debug logging to understand the API response structure
  console.log('Leave Get API Response:', JSON.stringify(responseData, null, 2));

  // Always return simplified response - handle different response structures
  let leaveData;
  if (responseData.data) {
    // Standard structure: { status: true, message: "...", data: {...} }
    leaveData = responseData.data;
    console.log('Using responseData.data:', JSON.stringify(leaveData, null, 2));
  } else if (responseData.id) {
    // Direct structure: { id: 123, user_id: "...", ... }
    leaveData = responseData;
    console.log('Using direct responseData:', JSON.stringify(leaveData, null, 2));
  } else {
    // Fallback: return the raw response
    console.log('No expected structure found, returning raw response');
    return [{ json: responseData, pairedItem: { item: index } }];
  }

  // Check if leaveData is valid
  if (!leaveData || typeof leaveData !== 'object') {
    console.log('Invalid leaveData:', leaveData);
    return [{ json: { error: 'Invalid leave data received from API', rawResponse: responseData }, pairedItem: { item: index } }];
  }

  // Simplify the response according to n8n UX guidelines
  // Only include fields that actually exist to avoid undefined values
  const simplifiedLeave: any = {};

  if (leaveData.id !== undefined) simplifiedLeave.id = leaveData.id;
  if (leaveData.user_id !== undefined) simplifiedLeave.userId = leaveData.user_id;
  if (leaveData.leave_type_id !== undefined) simplifiedLeave.leaveTypeId = leaveData.leave_type_id;
  if (leaveData.duration !== undefined) simplifiedLeave.duration = leaveData.duration;
  if (leaveData.reason !== undefined) simplifiedLeave.reason = leaveData.reason;
  if (leaveData.status !== undefined) simplifiedLeave.status = leaveData.status;
  if (leaveData.leave_date !== undefined) simplifiedLeave.leaveDate = leaveData.leave_date;
  if (leaveData.multi_date !== undefined) simplifiedLeave.multiDate = leaveData.multi_date;
  if (leaveData.attachment !== undefined) simplifiedLeave.attachment = leaveData.attachment;
  if (leaveData.applied_on !== undefined) simplifiedLeave.appliedOn = leaveData.applied_on;
  if (leaveData.created_at !== undefined) simplifiedLeave.createdAt = leaveData.created_at;
  if (leaveData.updated_at !== undefined) simplifiedLeave.updatedAt = leaveData.updated_at;

  console.log('Simplified leave object:', JSON.stringify(simplifiedLeave, null, 2));

  return [{ json: simplifiedLeave, pairedItem: { item: index } }];
}
