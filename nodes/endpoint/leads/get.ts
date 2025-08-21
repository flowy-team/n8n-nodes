import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

const getLead = async function(
    this: IExecuteFunctions,
    index: number,
): Promise<INodeExecutionData[]> {
    const leadId = this.getNodeParameter('leadId', index) as string;
    
    const responseData = await ApiRequest.call(
        this,
        'GET',
        `/leads/${leadId}`,
        {},
        { followUp: 'all', client: 'all' }
    );
    
    return this.helpers.returnJsonArray(responseData);
};

export default getLead;
