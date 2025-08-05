import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function createHoliday(
  this: IExecuteFunctions, 
  index: number
): Promise<INodeExecutionData[]> {
  const occasion = this.getNodeParameter('occasion', index) as string;
  const date = this.getNodeParameter('date', index) as string;

  const body = {
    occasion,
    date,
  };

  const responseData = await ApiRequest.call(this, 'POST', '/holiday', body);

  // Always return simplified response - handle different response structures
  let holidayData;
  if (responseData.data) {
    // Standard structure: { status: true, message: "...", data: {...} }
    holidayData = responseData.data;
  } else if (responseData.id) {
    // Direct structure: { id: 123, occasion: "...", ... }
    holidayData = responseData;
  } else {
    // Fallback: return the raw response
    return [{ json: responseData, pairedItem: { item: index } }];
  }

  // Simplify the response according to n8n UX guidelines
  const simplifiedHoliday = {
    id: holidayData.id,
    occasion: holidayData.occassion || holidayData.occasion, // Handle both spellings
    date: holidayData.date,
    companyId: holidayData.company_id,
    createdAt: holidayData.created_at,
    updatedAt: holidayData.updated_at,
    // Remove internal fields and keep user-friendly names
  };

  return [{ json: simplifiedHoliday, pairedItem: { item: index } }];
}
