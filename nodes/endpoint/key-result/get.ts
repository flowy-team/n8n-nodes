import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function getKeyResult(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const keyResultId = this.getNodeParameter('keyResultId', index) as string;

	const responseData = await ApiRequest.call(this, 'GET', `/key-result/${keyResultId}`);

	// Always return simplified response - handle different response structures
	let keyResultData;
	if (responseData.data) {
		// Standard structure: { status: true, message: "...", data: {...} }
		keyResultData = responseData.data;
	} else if (responseData.id) {
		// Direct structure: { id: 123, title: "...", ... }
		keyResultData = responseData;
	} else {
		// Fallback: return the raw response
		return [{ json: responseData, pairedItem: { item: index } }];
	}

	// Simplify the response according to n8n UX guidelines
	const simplifiedKeyResult = {
		id: keyResultData.id,
		objectiveId: keyResultData.objective_id,
		title: keyResultData.krs_title || keyResultData.title,
		owner: keyResultData.krs_owner,
		initialValue: keyResultData.krs_init,
		currentValue: keyResultData.krs_now,
		targetValue: keyResultData.krs_tar,
		description: keyResultData.description,
		unitValue: keyResultData.unit_value,
		weight: keyResultData.weight,
		confidence: keyResultData.confidence,
		currentPercentage: keyResultData.current_percentage,
		createdAt: keyResultData.created_at,
		updatedAt: keyResultData.updated_at,
		// Remove API metadata: status, message, company_id, etc.
	};

	return [{ json: simplifiedKeyResult, pairedItem: { item: index } }];
} 	