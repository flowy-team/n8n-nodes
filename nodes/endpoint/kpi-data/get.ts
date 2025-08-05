import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function getKPIData(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const indicatorId = this.getNodeParameter('indicatorId', index, '') as string;
	const simplify = this.getNodeParameter('simplify', index, true) as boolean;
	const sortDirection = this.getNodeParameter('sortDirection', index, 'DESC') as string;
	const sortField = this.getNodeParameter('sortField', index, 'id') as string;

	const qs: IDataObject = {};

	// Add indicator ID filter if provided
	if (indicatorId) {
		qs.indicator_id = indicatorId;
	}

	// Add sorting parameters
	if (sortField) {
		qs.sort_field = sortField;
	}
	if (sortDirection) {
		qs.sort_direction = sortDirection;
	}

	const responseData = await ApiRequest.call(this, 'GET', '/indicator-record', {}, qs);

	// If simplify is false, return raw API response
	if (!simplify) {
		return [{ json: responseData, pairedItem: { item: index } }];
	}

	// Handle different response structures for simplified output
	let kpiDataArray;
	if (responseData.data && Array.isArray(responseData.data)) {
		// Standard structure: { status: true, message: "...", data: [...] }
		kpiDataArray = responseData.data;
	} else if (Array.isArray(responseData)) {
		// Direct array structure: [...]
		kpiDataArray = responseData;
	} else {
		// Fallback: return the raw response
		return [{ json: responseData, pairedItem: { item: index } }];
	}

	// Simplify each KPI data record in the array
	const simplifiedKpiData = kpiDataArray.map((kpiRecord: any) => ({
		id: kpiRecord.id,
		companyId: kpiRecord.company_id,
		indicatorId: kpiRecord.indicator_id,
		periodKey: kpiRecord.period_key,
		currentValue: kpiRecord.current_value,
		targetValue: kpiRecord.target_value,
		remark: kpiRecord.remark || 'No remark',
		updatedBy: kpiRecord.updated_by,
		createdAt: kpiRecord.created_at,
		updatedAt: kpiRecord.updated_at,
		// Remove unnecessary API metadata for simplified view
	}));

	// Return array of simplified KPI data records
	return simplifiedKpiData.map((kpiRecord: any) => ({
		json: kpiRecord,
		pairedItem: { item: index }
	}));
} 