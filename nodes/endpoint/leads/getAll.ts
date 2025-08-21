import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

const getAllLeads = async function(
    this: IExecuteFunctions,
    index: number,
): Promise<INodeExecutionData[]> {
    const responseData = await ApiRequest.call(
        this,
        'GET',
        '/leads',
        {},
        { followUp: 'all', client: 'all' }
    );
    
    return this.helpers.returnJsonArray(responseData);
};

export default getAllLeads;
