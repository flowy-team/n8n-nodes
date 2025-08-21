import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

const updateLead = async function(
    this: IExecuteFunctions,
    index: number,
): Promise<INodeExecutionData[]> {
    const leadId = this.getNodeParameter('leadId', index) as string;
    const clientName = this.getNodeParameter('clientName', index) as string;
    const nextFollowUp = this.getNodeParameter('nextFollowUp', index) as string;
    const updateFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;
    
    const body: IDataObject = {
        client_name: clientName,
        next_follow_up: nextFollowUp,
    };
    
    // Add fields to update if they are provided
    if (updateFields.clientName) {
        body.client_name = updateFields.clientName as string;
    }
    
    if (updateFields.companyName !== undefined) {
        body.company_name = updateFields.companyName as string || '-';
    }
    
    if (updateFields.website !== undefined) {
        body.website = updateFields.website as string;
    }
    
    if (updateFields.address !== undefined) {
        body.address = updateFields.address as string;
    }
    
    if (updateFields.email !== undefined) {
        body.email = updateFields.email as string;
    }
    
    if (updateFields.mobile !== undefined) {
        body.mobile = updateFields.mobile as string;
    }
    
    if (updateFields.note !== undefined) {
        body.note = updateFields.note as string;
    }
    
    if (updateFields.nextFollowUp) {
        body.next_follow_up = updateFields.nextFollowUp as string;
    }
    
    if (updateFields.agentId !== undefined) {
        body.agent_id = updateFields.agentId as number;
    }
    
    if (updateFields.sourceId !== undefined) {
        body.source_id = updateFields.sourceId as number;
    }
    
    if (updateFields.statusId !== undefined) {
        body.status_id = updateFields.statusId as number;
    }
    
    if (updateFields.meetingDate) {
        body.meeting_date = updateFields.meetingDate as string;
    }
    
    const responseData = await ApiRequest.call(
        this,
        'PUT',
        `/leads/${leadId}`,
        body,
        { followUp: 'all', client: 'all' }
    );
    
    return this.helpers.returnJsonArray([responseData]);
};

export default updateLead;
