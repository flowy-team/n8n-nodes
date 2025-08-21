import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

const createLead = async function(
    this: IExecuteFunctions,
    index: number,
): Promise<INodeExecutionData[]> {
    // Get required fields
    const clientName = this.getNodeParameter('clientName', index) as string;
    const nextFollowUp = this.getNodeParameter('nextFollowUp', index) as string;
    const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;
    
    // Prepare request body
    const body: IDataObject = {
        client_name: clientName,
        next_follow_up: nextFollowUp,
    };
    
    // Add optional fields if provided
    if (additionalFields.companyName) {
        body.company_name = additionalFields.companyName as string;
    } else {
        body.company_name = '-';
    }
    
    if (additionalFields.website) {
        body.website = additionalFields.website as string;
    }
    
    if (additionalFields.address) {
        body.address = additionalFields.address as string;
    }
    
    if (additionalFields.email) {
        body.email = additionalFields.email as string;
    }
    
    if (additionalFields.mobile) {
        body.mobile = additionalFields.mobile as string;
    }
    
    if (additionalFields.note) {
        body.note = additionalFields.note as string;
    }
    
    if (additionalFields.nextFollowUp) {
        body.next_follow_up = additionalFields.nextFollowUp as string;
    }
    
    if (additionalFields.agentId) {
        body.agent_id = additionalFields.agentId as number;
    }
    
    if (additionalFields.sourceId) {
        body.source_id = additionalFields.sourceId as number;
    }
    
    if (additionalFields.statusId) {
        body.status_id = additionalFields.statusId as number;
    }
    
    if (additionalFields.meetingDate) {
        body.meeting_date = additionalFields.meetingDate as string;
    }
    
    // Make API request
    const responseData = await ApiRequest.call(
        this,
        'POST',
        '/leads',
        body,
        { followUp: 'all', client: 'all' } // Query parameters
    );
    
    return this.helpers.returnJsonArray([responseData]);
};

export default createLead;
