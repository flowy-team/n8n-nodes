import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function clockOut(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const attendanceId = this.getNodeParameter('attendanceId', index) as string;

	const responseData = await ApiRequest.call(this, 'PUT', `/attendance/clock-out/${attendanceId}`);

	return [{ json: responseData, pairedItem: { item: index } }];
} 