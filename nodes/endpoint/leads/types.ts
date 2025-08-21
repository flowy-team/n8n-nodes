import { IDataObject } from 'n8n-workflow';

export interface ILead extends IDataObject {
    id?: string | number;
    client_name: string;
    company_name?: string;
    email?: string;
    phone?: string;
    website?: string;
    address?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    country?: string;
    status?: string;
    source?: string;
    notes?: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
}

export interface ILeadListResponse {
    data: ILead[];
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
}

export interface ILeadResponse {
    data: ILead;
}

export interface ILeadCreateRequest extends Omit<ILead, 'id' | 'created_at' | 'updated_at' | 'deleted_at'> {}
export interface ILeadUpdateRequest extends Partial<ILeadCreateRequest> {}

export interface ILeadFilterOptions extends IDataObject {
    status?: string;
    source?: string;
    start_date?: string;
    end_date?: string;
    sort_by?: string;
    sort_order?: 'asc' | 'desc';
    page?: number;
    per_page?: number;
}
