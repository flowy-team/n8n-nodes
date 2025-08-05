import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function today(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const responseData = await ApiRequest.call(this, 'GET', '/attendance/today');

	return [{ json: responseData, pairedItem: { item: index } }];
} 