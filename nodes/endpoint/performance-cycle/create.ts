import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function createPerformanceCycle(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const name = this.getNodeParameter('name', index) as string;
  const cycleType = this.getNodeParameter('cycleType', index) as string;
  const startedAt = this.getNodeParameter('startedAt', index) as string;
  const finishedAt = this.getNodeParameter('finishedAt', index) as string;

  const body = {
    name,
    cycle_type: cycleType,
    started_at: startedAt,
    finished_at: finishedAt,
  };

  const responseData = await ApiRequest.call(this, 'POST', '/performance-cycle', body);

  // Always return simplified response - handle different response structures
  let cycleData;
  if (responseData.data) {
    // Standard structure: { status: true, message: "...", data: {...} }
    cycleData = responseData.data;
  } else if (responseData.id) {
    // Direct structure: { id: 123, name: "...", ... }
    cycleData = responseData;
  } else {
    // Fallback: return the raw response
    return [{ json: responseData, pairedItem: { item: index } }];
  }

  // Simplify the response according to n8n UX guidelines
  const simplifiedCycle = {
    id: cycleData.id,
    name: cycleData.name,
    cycleType: cycleData.cycle_type,
    type: cycleData.type,
    startedAt: cycleData.started_at,
    finishedAt: cycleData.finished_at,
    resultsValue: cycleData.results_value,
    vision: cycleData.vision,
    mission: cycleData.mission,
    displayLock: cycleData.display_lock,
    previousCycleId: cycleData.previous_cycle_id,
    createdAt: cycleData.created_at,
    updatedAt: cycleData.updated_at,
    // Remove API metadata: status, message, company_id, etc.
  };

  return [{ json: simplifiedCycle, pairedItem: { item: index } }];
}

export default createPerformanceCycle;
