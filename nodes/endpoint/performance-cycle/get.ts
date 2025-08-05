import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function getPerformanceCycle(
  this: IExecuteFunctions,
  index: number,
): Promise<INodeExecutionData[]> {
  const performanceCycleId = this.getNodeParameter('performanceCycleId', index) as string;
  
  try {
    const responseData = await ApiRequest.call(this, 'GET', `/performance-cycle/${performanceCycleId}`);

    // Handle different response structures
    let cycleData;
    
    if (responseData && responseData.data && typeof responseData.data === 'object') {
      // Standard wrapper: { status: true, message: "...", data: {...} }
      cycleData = responseData.data;
    } else if (responseData && responseData.id) {
      // Direct object: { id: 123, name: "...", ... }
      cycleData = responseData;
    } else if (responseData && typeof responseData === 'object') {
      // Any object response - try to use it directly
      cycleData = responseData;
    } else {
      // No valid data found
      throw new NodeApiError(this.getNode(), {
        message: 'No performance cycle data found',
        description: `Performance cycle with ID ${performanceCycleId} not found or returned empty data`,
      });
    }

    // Validate that we have an ID (minimum requirement)
    if (!cycleData || !cycleData.id) {
      throw new NodeApiError(this.getNode(), {
        message: 'Invalid performance cycle data',
        description: `Performance cycle with ID ${performanceCycleId} returned invalid or incomplete data`,
      });
    }

    // Transform to simplified format with proper fallbacks
    const simplifiedCycle = {
      id: cycleData.id,
      name: cycleData.name || '',
      cycleType: cycleData.cycle_type || cycleData.cycleType || '',
      type: cycleData.type || '',
      startedAt: cycleData.started_at || cycleData.startedAt || null,
      finishedAt: cycleData.finished_at || cycleData.finishedAt || null,
      resultsValue: cycleData.results_value || cycleData.resultsValue || 0,
      vision: cycleData.vision || '',
      mission: cycleData.mission || '',
      displayLock: cycleData.display_lock !== undefined ? cycleData.display_lock : (cycleData.displayLock !== undefined ? cycleData.displayLock : false),
      previousCycleId: cycleData.previous_cycle_id || cycleData.previousCycleId || null,
      companyId: cycleData.company_id || cycleData.companyId || null,
      createdAt: cycleData.created_at || cycleData.createdAt || null,
      updatedAt: cycleData.updated_at || cycleData.updatedAt || null,
    };

    return [{ json: simplifiedCycle, pairedItem: { item: index } }];

  } catch (error) {
    // Handle API errors with specific messages
    if (error.response) {
      const status = error.response.status;
      const responseData = error.response.data;
      
      if (status === 404) {
        throw new NodeApiError(this.getNode(), {
          message: 'Performance cycle not found',
          description: `Performance cycle with ID ${performanceCycleId} does not exist`,
          httpCode: '404',
        });
      } else if (status === 401) {
        throw new NodeApiError(this.getNode(), {
          message: 'Authentication failed',
          description: 'Please check your API credentials',
          httpCode: '401',
        });
      } else if (status === 403) {
        throw new NodeApiError(this.getNode(), {
          message: 'Access forbidden',
          description: 'You do not have permission to access this performance cycle',
          httpCode: '403',
        });
      } else {
        throw new NodeApiError(this.getNode(), {
          message: `API Error: ${status}`,
          description: responseData?.message || 'Failed to retrieve performance cycle',
          httpCode: status.toString(),
        });
      }
    }
    
    // Re-throw if it's already a NodeApiError
    if (error instanceof NodeApiError) {
      throw error;
    }
    
    // Generic error
    throw new NodeApiError(this.getNode(), {
      message: 'Failed to retrieve performance cycle',
      description: error.message || 'An unexpected error occurred',
    });
  }
}

export default getPerformanceCycle;
