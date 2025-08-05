import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function showKPIData(
	this: IExecuteFunctions, 
	index: number
): Promise<INodeExecutionData[]> {
	const recordId = this.getNodeParameter('recordId', index) as string;
	
	const responseData = await ApiRequest.call(this, 'GET', `/indicator-record/${recordId}`);

	// Always return simplified response - handle different response structures
	let kpiDataRecord;
	if (responseData.data) {
		// Standard structure: { status: true, message: "...", data: {...} }
		kpiDataRecord = responseData.data;
	} else if (responseData.id) {
		// Direct structure: { id: 123, value: "...", ... }
		kpiDataRecord = responseData;
	} else {
		// Fallback: return the raw response
		return [{ json: responseData, pairedItem: { item: index } }];
	}

	// Simplify the response according to n8n UX guidelines
	const simplifiedKpiData = {
		id: kpiDataRecord.id,
		indicatorId: kpiDataRecord.indicator_id,
		value: kpiDataRecord.value,
		period: kpiDataRecord.period,
		description: kpiDataRecord.description,
		companyId: kpiDataRecord.company_id,
		createdAt: kpiDataRecord.created_at,
		updatedAt: kpiDataRecord.updated_at,
		// Remove internal fields and keep user-friendly names
	};

	return [{ json: simplifiedKpiData, pairedItem: { item: index } }];
} 