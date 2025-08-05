import { INodeExecutionData, IExecuteFunctions } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function deleteKpiCategory(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const kpiCategoryId = this.getNodeParameter('kpiCategoryId', index) as string;
	
	const responseData = await ApiRequest.call(this, 'DELETE', `/indicator-category/${kpiCategoryId}`);

	// Handle delete response - usually returns success/status message
	let result;
	if (responseData.status !== undefined) {
		// Standard structure: { status: true, message: "..." }
		result = {
			success: responseData.status,
			message: responseData.message || 'KPI Category deleted successfully',
			kpiCategoryId: kpiCategoryId,
		};
	} else {
		// Fallback: return success with category ID
		result = {
			success: true,
			message: 'KPI Category deleted successfully',
			kpiCategoryId: kpiCategoryId,
		};
	}

	return [{ json: result, pairedItem: { item: index } }];
} 