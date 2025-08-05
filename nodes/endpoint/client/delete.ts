import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function deleteClient(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const clientId = this.getNodeParameter('clientId', index) as string;

  const responseData = await ApiRequest.call(this, 'DELETE', `/clients/${clientId}`);

  // Handle different response structures for delete operations
  let deleteResponse;
  if (responseData.status !== undefined && responseData.message) {
    // Standard API response: { status: true, message: "Client deleted successfully" }
    deleteResponse = {
      success: responseData.status,
      message: responseData.message,
      clientId: clientId,
      deletedAt: new Date().toISOString(),
    };
  } else if (responseData.data) {
    // Response with deleted client data: { status: true, message: "...", data: {...} }
    deleteResponse = {
      success: true,
      message: responseData.message || 'Client deleted successfully',
      clientId: clientId,
      deletedClient: {
        id: responseData.data.id,
        name: responseData.data.name,
        email: responseData.data.email,
      },
      deletedAt: new Date().toISOString(),
    };
  } else {
    // Fallback: assume success if no error was thrown
    deleteResponse = {
      success: true,
      message: 'Client deleted successfully',
      clientId: clientId,
      deletedAt: new Date().toISOString(),
    };
  }

  return [{ json: deleteResponse, pairedItem: { item: index } }];
}

export default deleteClient;
