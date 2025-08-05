import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function deleteKPIData(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const recordId = this.getNodeParameter('recordId', index) as string;
	
	const responseData = await ApiRequest.call(this, 'DELETE', `/indicator-record/${recordId}`);

	// Handle delete response - usually returns success/status message
	let result;
	if (responseData.status !== undefined) {
		result = {
			success: responseData.status,
			message: responseData.message || 'KPI Data record deleted successfully',
			recordId: recordId,
		};
	} else {
		result = {
			success: true,
			message: 'KPI Data record deleted successfully',
			recordId: recordId,
		};
	}

	return [{ json: result, pairedItem: { item: index } }];
} 