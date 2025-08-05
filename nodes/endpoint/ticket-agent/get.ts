import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function getTicketAgents(
  this: IExecuteFunctions, 
  index: number
): Promise<INodeExecutionData[]> {
  const simplify = this.getNodeParameter('simplify', index, true) as boolean;
  const sortDirection = this.getNodeParameter('sortDirection', index, 'ASC') as string;
  const sortField = this.getNodeParameter('sortField', index, 'agent_name') as string;

  // Build query parameters for sorting
  const queryParams = new URLSearchParams();
  if (sortField) {
    queryParams.append('sort_field', sortField);
  }
  if (sortDirection) {
    queryParams.append('sort_direction', sortDirection);
  }

  const queryString = queryParams.toString();
  const url = queryString ? `/ticket-agent?${queryString}` : '/ticket-agent';

  const responseData = await ApiRequest.call(this, 'GET', url);

  // If simplify is false, return raw API response
  if (!simplify) {
    return [{ json: responseData, pairedItem: { item: index } }];
  }

  // Handle different response structures for simplified output
  let agentsArray;
  if (responseData.data && Array.isArray(responseData.data)) {
    // Standard structure: { status: true, message: "...", data: [...] }
    agentsArray = responseData.data;
  } else if (Array.isArray(responseData)) {
    // Direct array structure: [...]
    agentsArray = responseData;
  } else {
    // Fallback: return the raw response
    return [{ json: responseData, pairedItem: { item: index } }];
  }

  // Simplify each agent in the array
  const simplifiedAgents = agentsArray.map((agent: any) => ({
		agentId: agent.agent_id,
		agentName: agent.agent_name,
		groupId: agent.group_id,
		groupName: agent.group_name,
		status: agent.status,
		// Remove API metadata: status, message from parent object
  }));

  // Return array of simplified agents
  return simplifiedAgents.map((agent: any) => ({
    json: agent,
    pairedItem: { item: index }
  }));
}

export default getTicketAgents; 