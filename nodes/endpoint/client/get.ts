import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function getClient(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const clientId = this.getNodeParameter('clientId', index) as string;

  const responseData = await ApiRequest.call(this, 'GET', `/clients/${clientId}`);

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

export default getClient;
