import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function deleteKPI(
	this: IExecuteFunctions, 
	index: number
): Promise<INodeExecutionData[]> {
	const indicatorId = this.getNodeParameter('indicatorId', index) as string;
	
	const responseData = await ApiRequest.call(this, 'DELETE', `/indicators/${indicatorId}`);

	// Handle delete response - usually returns success/status message
	let result;
	if (responseData.status !== undefined) {
		// Standard structure: { status: true, message: "..." }
		result = {
			success: responseData.status,
			message: responseData.message || 'KPI deleted successfully',
			indicatorId: indicatorId,
		};
	} else {
		// Fallback: return success with indicator ID
		result = {
			success: true,
			message: 'KPI deleted successfully',
			indicatorId: indicatorId,
		};
	}

	return [{ json: result, pairedItem: { item: index } }];
} 