import { IExecuteFunctions } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function updateKPIData(this: IExecuteFunctions, index: number): Promise<any> {
	const body: any = {};

	// Required fields for update
	const indicator_id = this.getNodeParameter('indicator_id', index) as string;
	const period_key = this.getNodeParameter('period_key', index) as string;
	const current_value = this.getNodeParameter('current_value', index) as string;
	const target_value = this.getNodeParameter('target_value', index) as string;
	const remark = this.getNodeParameter('remark', index) as string;

	body.indicator_id = indicator_id;
	body.period_key = period_key;
	body.current_value = current_value;
	body.target_value = target_value;
	body.remark = remark;

	const response = await ApiRequest.call(this, 'PUT', '/indicator-record/update-record', body);
	return response;
} 