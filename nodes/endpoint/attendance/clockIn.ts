import type { IDataObject, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function clockIn(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const working_from = this.getNodeParameter('working_from', index) as string;

	const body: IDataObject = {
		working_from,
	};

	const responseData = await ApiRequest.call(this, 'POST', '/attendance/clock-in', body);

	return [{ json: responseData, pairedItem: { item: index } }];
} 