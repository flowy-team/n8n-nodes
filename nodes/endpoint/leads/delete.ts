import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export const deleteLead = async function(
    this: IExecuteFunctions,
    index: number,
): Promise<INodeExecutionData[]> {
    const leadId = this.getNodeParameter('leadId', index) as string;
    
    await ApiRequest.call(
        this,
        'DELETE',
        `/leads/${leadId}`,
        {},
        { followUp: 'all', client: 'all' }
    );
    
    // Return empty array to indicate successful deletion
    return [];
};

export const deleteLeads = async function(
    this: IExecuteFunctions,
    itemsLength: number,
): Promise<INodeExecutionData[]> {
    const returnData: INodeExecutionData[] = [];
    
    for (let i = 0; i < itemsLength; i++) {
        try {
            const leadId = this.getNodeParameter('leadId', i) as string;
            
            await ApiRequest.call(
                this,
                'DELETE',
                `/leads/${leadId}`,
                {},
                { followUp: 'all', client: 'all' }
            );
            
            returnData.push({ json: { success: true, leadId } });
        } catch (error) {
            if (this.continueOnFail()) {
                returnData.push({ json: { error: error.message } });
                continue;
            }
            throw error;
        }
    }
    
    return returnData;
};

// Default export for backward compatibility
const defaultExport = deleteLead as any;
Object.assign(defaultExport, { deleteLeads });
export default defaultExport;
