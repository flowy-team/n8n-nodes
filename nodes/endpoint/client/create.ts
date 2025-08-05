import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function createClient(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  // Required fields
  const name = this.getNodeParameter('name', index) as string;
  const email = this.getNodeParameter('email', index) as string;
  
  // Additional fields
  const additionalFields = this.getNodeParameter('additionalFields', index, {}) as Record<string, any>;

  // Validate required fields
  if (!name) {
    throw new Error('Nama client wajib diisi');
  }

  if (!email) {
    throw new Error('Email client wajib diisi');
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Format email tidak valid');
  }

  // Validate website URL format if provided
  if (additionalFields.website && !/^https?:\/\//.test(additionalFields.website)) {
    throw new Error('Format website tidak valid, harus dimulai dengan http:// atau https://');
  }

  // Prepare request body according to API documentation
  const body: Record<string, any> = {
    name,
    email,
    send_email: 'yes', // Default value as per API
  };

  // Add additional fields if provided
  if (additionalFields.companyName) body.company_name = additionalFields.companyName;
  if (additionalFields.website) body.website = additionalFields.website;
  if (additionalFields.address) body.address = additionalFields.address;
  if (additionalFields.mobile) body.mobile = additionalFields.mobile;
  if (additionalFields.skype) body.skype = additionalFields.skype;
  if (additionalFields.linkedin) body.linkedin = additionalFields.linkedin;
  if (additionalFields.twitter) body.twitter = additionalFields.twitter;
  if (additionalFields.facebook) body.facebook = additionalFields.facebook;
  if (additionalFields.gstNumber) body.gst_number = additionalFields.gstNumber;
  if (additionalFields.note) body.note = additionalFields.note;
  if (additionalFields.sendEmail) body.send_email = additionalFields.sendEmail ? 'yes' : 'no';

  const responseData = await ApiRequest.call(this, 'POST', '/clients', body);

  // Always return simplified response - handle different response structures
  let clientData;
  if (responseData.data) {
    // Standard structure: { status: true, message: "...", data: {...} }
    clientData = responseData.data;
  } else if (responseData.id) {
    // Direct structure: { id: 123, name: "...", ... }
    clientData = responseData;
  } else {
    // Fallback: return the raw response
    return [{ json: responseData, pairedItem: { item: index } }];
  }

  // Simplify the response according to n8n UX guidelines
  const simplifiedClient = {
    id: clientData.id,
    userId: clientData.user_id,
    name: clientData.name,
    email: clientData.email,
    mobile: clientData.mobile,
    companyName: clientData.company_name,
    address: clientData.address,
    website: clientData.website,
    note: clientData.note,
    skype: clientData.skype,
    facebook: clientData.facebook,
    twitter: clientData.twitter,
    linkedin: clientData.linkedin,
    gstNumber: clientData.gst_number,
    createdAt: clientData.created_at,
    updatedAt: clientData.updated_at,
    // Remove: status, message, company_id (internal reference)
  };

  return [{ json: simplifiedClient, pairedItem: { item: index } }];
}

export default createClient;
