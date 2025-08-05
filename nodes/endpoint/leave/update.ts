import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function updateLeave(
  this: IExecuteFunctions, 
  index: number
): Promise<INodeExecutionData[]> {
  const leaveId = this.getNodeParameter('leaveId', index) as string;
  
  if (!leaveId) {
    throw new Error('Leave ID is required');
  }

  // Get the direct fields (these are required fields for update operation)
  const userId = this.getNodeParameter('userId', index) as string;
  const leaveTypeId = this.getNodeParameter('leaveTypeId', index) as string;
  const duration = this.getNodeParameter('duration', index) as string;
  const reason = this.getNodeParameter('reason', index) as string;
  const status = this.getNodeParameter('status', index) as string;
  
  // Get additional fields from the collection
  const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;

  // Prepare the request body with all fields
  const body: IDataObject = {
    user_id: userId,
    leave_type_id: leaveTypeId,
    duration,
    reason,
    status,
  };

  // Handle date fields based on duration
  if (duration === 'single') {
    const leaveDate = this.getNodeParameter('leaveDate', index) as string;
    if (leaveDate) {
      body.leave_date = leaveDate;
    }
  } else if (duration === 'multiple') {
    const multiDate = this.getNodeParameter('multiDate', index) as string;
    if (multiDate) {
      body.multi_date = multiDate;
    }
  }

  // Handle file upload if present in additional fields
  if (additionalFields.attachment) {
    const binaryData = this.helpers.assertBinaryData(index, 'attachment');
    body.attachment = {
      value: binaryData.data,
      options: {
        filename: binaryData.fileName || 'attachment',
        contentType: binaryData.mimeType || 'application/octet-stream',
      },
    };
  }

  const responseData = await ApiRequest.call(this, 'PUT', `/leave/${leaveId}`, body);

  // Always return simplified response - handle different response structures
  let leaveData;
  if (responseData.data) {
    // Standard structure: { status: true, message: "...", data: {...} }
    leaveData = responseData.data;
  } else if (responseData.id) {
    // Direct structure: { id: 123, user_id: "...", ... }
    leaveData = responseData;
  } else {
    // Fallback: return the raw response
    return [{ json: responseData, pairedItem: { item: index } }];
  }

  // Simplify the response according to n8n UX guidelines
  const simplifiedLeave = {
    id: leaveData.id,
    userId: leaveData.user_id,
    leaveTypeId: leaveData.leave_type_id,
    duration: leaveData.duration,
    reason: leaveData.reason,
    status: leaveData.status,
    leaveDate: leaveData.leave_date,
    multiDate: leaveData.multi_date,
    attachment: leaveData.attachment,
    appliedOn: leaveData.applied_on,
    createdAt: leaveData.created_at,
    updatedAt: leaveData.updated_at,
    // Remove internal fields and keep user-friendly names
  };

  return [{ json: simplifiedLeave, pairedItem: { item: index } }];
}
