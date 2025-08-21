// Import all lead endpoint functions using require
const createLead = require('./create').default;
const getLead = require('./get').default;
const getAllLeads = require('./getAll').default;
const updateLead = require('./update').default;
const deleteModule = require('./delete');

// Export all functions
const leads = {
    createLead,
    getLead,
    getAllLeads,
    updateLead,
    deleteLead: deleteModule.default || deleteModule,
    deleteLeads: (deleteModule.deleteLeads || deleteModule).bind(deleteModule)
};

// Export for CommonJS
module.exports = leads;

// Export types for TypeScript
export interface LeadsModule {
    createLead: any;
    getLead: any;
    getAllLeads: any;
    updateLead: any;
    deleteLead: any;
    deleteLeads: any;
}
