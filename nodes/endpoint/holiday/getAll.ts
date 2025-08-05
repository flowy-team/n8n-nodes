import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function getAllHolidays(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
  try {
    const returnAll = this.getNodeParameter('returnAll', index, false) as boolean;
    const qs: IDataObject = {};

    // Handle pagination
    if (!returnAll) {
      const limit = this.getNodeParameter('limit', index, 50) as number;
      const page = this.getNodeParameter('page', index, 1) as number;
      
      if (limit < 1 || limit > 1000) {
        throw new Error('Limit must be between 1 and 1000');
      }
      
      qs.limit = limit;
      qs.page = page;
    }

    // Get additional fields for filtering
    const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;
    
    // Add year filter if provided
    if (additionalFields.year) {
      const year = additionalFields.year as number;
      if (year >= 2000 && year <= 2100) {
        qs.year = year;
      }
    }

    // Make API request
    const responseData = await ApiRequest.call(this, 'GET', '/holiday', {}, qs);

    // Debug logging
    console.log('Holiday API Response:', JSON.stringify(responseData, null, 2));
    console.log('Holiday Query Parameters:', JSON.stringify(qs, null, 2));

    // Handle different response structures
    let holidaysArray;
    if (responseData.data && Array.isArray(responseData.data)) {
      // Standard structure: { status: true, message: "...", data: [...] }
      holidaysArray = responseData.data;
      console.log('Using responseData.data, found', holidaysArray.length, 'holidays');
    } else if (Array.isArray(responseData)) {
      // Direct array structure: [...]
      holidaysArray = responseData;
      console.log('Using direct array, found', holidaysArray.length, 'holidays');
    } else {
      // Fallback: return the raw response if no data found
      console.log('No array found in response, returning raw response');
      return [{ json: responseData, pairedItem: { item: index } }];
    }

    // Convert each holiday to n8n format
    return holidaysArray.map((holiday: any) => ({
      json: {
        id: holiday.id,
        companyId: holiday.company_id,
        occasion: holiday.occassion,
        date: holiday.date,
        createdAt: holiday.created_at,
        updatedAt: holiday.updated_at,
      },
      pairedItem: { item: index }
    }));

  } catch (error) {
    console.error('Holiday API Error:', error);
    // Improve error messages for user
    if (error.httpCode === 404) {
      return [{ json: { status: false, message: 'No holidays found', data: [] }, pairedItem: { item: index } }];
    }
    
    if (error instanceof Error) {
      throw new Error(`Failed to retrieve holidays: ${error.message}`);
    }
    
    throw new Error('An unknown error occurred while retrieving holidays');
  }
}
