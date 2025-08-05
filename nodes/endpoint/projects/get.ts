import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function getProject(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const projectId = this.getNodeParameter('projectId', index) as string;
	
	try {
		const responseData = await ApiRequest.call(this, 'GET', `/projects/${projectId}`);

		// Handle different response structures
		let projectData;
		if (responseData && responseData.data && typeof responseData.data === 'object') {
			// Standard wrapper: { status: true, message: "...", data: {...} }
			projectData = responseData.data;
		} else if (responseData && responseData.id) {
			// Direct object: { id: 123, project_name: "...", ... }
			projectData = responseData;
		} else if (responseData && typeof responseData === 'object') {
			// Any object response - try to use it directly
			projectData = responseData;
		} else {
			// No valid data found
			throw new NodeApiError(this.getNode(), {
				message: 'No project data found',
				description: `Project with ID ${projectId} not found or returned empty data`,
			});
		}

		// Validate that we have an ID (minimum requirement)
		if (!projectData || !projectData.id) {
			throw new NodeApiError(this.getNode(), {
				message: 'Invalid project data',
				description: `Project with ID ${projectId} returned invalid or incomplete data`,
			});
		}

		// Transform to simplified format with proper fallbacks
		const simplifiedProject = {
			id: projectData.id,
			projectName: projectData.project_name || projectData.projectName || '',
			startDate: projectData.start_date || projectData.startDate || null,
			deadline: projectData.deadline || null,
			completionPercent: projectData.completion_percent || projectData.completionPercent || 0,
			status: projectData.status || '',
			projectBudget: projectData.project_budget || projectData.projectBudget || 0,
			currencyId: projectData.currency_id || projectData.currencyId || null,
			clientId: projectData.client_id || projectData.clientId || null,
			categoryId: projectData.category_id || projectData.categoryId || null,
			isProjectAdmin: projectData.isProjectAdmin || false,
			projectSummary: projectData.project_summary || projectData.projectSummary || '',
			notes: projectData.notes || '',
			hoursAllocated: projectData.hours_allocated || projectData.hoursAllocated || 0,
			client: projectData.client ? {
				id: projectData.client.id,
				name: projectData.client.name || 'Unnamed Client',
				companyName: projectData.client.company_name || 'No Company',
				email: projectData.client.email,
				status: projectData.client.status,
			} : null,
			currency: projectData.currency ? {
				id: projectData.currency.id,
				currencyName: projectData.currency.currency_name,
				currencySymbol: projectData.currency.currency_symbol,
				currencyCode: projectData.currency.currency_code,
				exchangeRate: projectData.currency.exchange_rate,
			} : null,
			category: projectData.category || null,
			membersCount: projectData.members ? projectData.members.length : 0,
			members: projectData.members ? projectData.members.map((member: any) => ({
				id: member.id,
				userId: member.user_id,
				projectId: member.project_id,
				user: member.user ? {
					id: member.user.id,
					uid: member.user.uid,
					name: member.user.name || 'Unnamed User',
					email: member.user.email,
					username: member.user.username,
					gender: member.user.gender,
					locale: member.user.locale,
					timezone: member.user.timezone,
					status: member.user.status,
					imageUrl: member.user.image_url,
				} : null,
			})) : [],
			companyId: projectData.company_id || projectData.companyId || null,
			createdAt: projectData.created_at || projectData.createdAt || null,
			updatedAt: projectData.updated_at || projectData.updatedAt || null,
		};

		return [{ json: simplifiedProject, pairedItem: { item: index } }];

	} catch (error) {
		// Handle API errors with specific messages
		if (error.response) {
			const status = error.response.status;
			const responseData = error.response.data;
			
			if (status === 404) {
				throw new NodeApiError(this.getNode(), {
					message: 'Project not found',
					description: `Project with ID ${projectId} does not exist`,
					httpCode: '404',
				});
			} else if (status === 401) {
				throw new NodeApiError(this.getNode(), {
					message: 'Authentication failed',
					description: 'Please check your API credentials',
					httpCode: '401',
				});
			} else if (status === 403) {
				throw new NodeApiError(this.getNode(), {
					message: 'Access forbidden',
					description: 'You do not have permission to access this project',
					httpCode: '403',
				});
			} else {
				throw new NodeApiError(this.getNode(), {
					message: `API Error: ${status}`,
					description: responseData?.message || 'Failed to retrieve project',
					httpCode: status.toString(),
				});
			}
		}
		
		// Re-throw if it's already a NodeApiError
		if (error instanceof NodeApiError) {
			throw error;
		}
		
		// Generic error
		throw new NodeApiError(this.getNode(), {
			message: 'Failed to retrieve project',
			description: error.message || 'An unexpected error occurred',
		});
	}
}

export async function showProjects(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	try {
		const returnAll = this.getNodeParameter('returnAll', index, false) as boolean;
		const simplify = this.getNodeParameter('simplify', index, true) as boolean;
		const sortDirection = this.getNodeParameter('sortDirection', index, 'DESC') as string;
		const sortField = this.getNodeParameter('sortField', index, 'id') as string;
		
		const qs: IDataObject = {};

		// Handle pagination
		if (!returnAll) {
			const limit = this.getNodeParameter('limit', index, 10) as number;
			const page = this.getNodeParameter('page', index, 1) as number;
			
			if (limit < 1 || limit > 1000) {
				throw new Error('Limit must be between 1 and 1000');
			}
			
			qs.limit = limit;
			qs.page = page;
		}

		// Add sorting parameters
		if (sortField) {
			qs.sort_field = sortField;
		}
		if (sortDirection) {
			qs.sort_direction = sortDirection;
		}

		// Get additional fields for filtering
		const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;
		
		// Add search parameter if provided
		if (additionalFields.search) {
			const searchTerm = (additionalFields.search as string).trim();
			if (searchTerm) {
				qs.search = searchTerm;
			}
		}

		// Add status filter if provided and not 'all'
		if (additionalFields.status && additionalFields.status !== 'all') {
			qs.status = additionalFields.status;
		}

		console.log('Making API call to /projects with query params:', qs);

		// Make API request
		const responseData = await ApiRequest.call(this, 'GET', '/projects', {}, qs);

		console.log('API Response structure:', {
			hasData: !!responseData.data,
			isDataArray: Array.isArray(responseData.data),
			dataType: typeof responseData.data,
			responseKeys: Object.keys(responseData)
		});

		// If simplify is false, return raw API response
		if (!simplify) {
			return [{ json: responseData, pairedItem: { item: index } }];
		}

		// Handle different response structures for simplified output
		let projectsArray;
		if (responseData.data && responseData.data.data && Array.isArray(responseData.data.data)) {
			// Nested pagination structure: { status: true, message: "...", data: { current_page: 1, data: [...] } }
			projectsArray = responseData.data.data;
			console.log('Using nested pagination structure, found', projectsArray.length, 'projects');
		} else if (responseData.data && Array.isArray(responseData.data)) {
			// Standard structure: { status: true, message: "...", data: [...] }
			projectsArray = responseData.data;
			console.log('Using standard structure, found', projectsArray.length, 'projects');
		} else if (Array.isArray(responseData)) {
			// Direct array structure: [...]
			projectsArray = responseData;
			console.log('Using direct array structure, found', projectsArray.length, 'projects');
		} else {
			// Fallback: return the raw response if no recognizable structure
			console.log('Unrecognized response structure, returning raw response');
			return [{ json: responseData, pairedItem: { item: index } }];
		}

		// Handle empty results
		if (!projectsArray || projectsArray.length === 0) {
			return [{ 
				json: { 
					status: true, 
					message: 'No projects found', 
					data: [] 
				}, 
				pairedItem: { item: index } 
			}];
		}

		// Simplify each project in the array
		const simplifiedProjects = projectsArray.map((project: any) => ({
			id: project.id,
			projectName: project.project_name,
			startDate: project.start_date,
			deadline: project.deadline,
			completionPercent: project.completion_percent,
			status: project.status,
			projectBudget: project.project_budget,
			currencyId: project.currency_id,
			clientId: project.client_id || 'No Client',
			isProjectAdmin: project.isProjectAdmin,
			category: project.category || 'No Category',
			client: project.client ? {
				id: project.client.id,
				name: project.client.name || 'Unnamed Client',
				companyName: project.client.company_name || 'No Company',
				email: project.client.email,
				status: project.client.status,
			} : null,
			currency: project.currency ? {
				id: project.currency.id,
				currencyName: project.currency.currency_name,
				currencySymbol: project.currency.currency_symbol,
				currencyCode: project.currency.currency_code,
				exchangeRate: project.currency.exchange_rate,
			} : null,
			membersCount: project.members ? project.members.length : 0,
			members: project.members ? project.members.map((member: any) => ({
				id: member.id,
				userId: member.user_id,
				projectId: member.project_id,
				user: member.user ? {
					id: member.user.id,
					uid: member.user.uid,
					name: member.user.name || 'Unnamed User',
					email: member.user.email,
					username: member.user.username,
					gender: member.user.gender,
					locale: member.user.locale,
					timezone: member.user.timezone,
					status: member.user.status,
					imageUrl: member.user.image_url,
				} : null,
			})) : [],
			createdAt: project.created_at,
			updatedAt: project.updated_at,
		}));

		console.log('Successfully processed', simplifiedProjects.length, 'simplified projects');

		// Return array of simplified projects
		return simplifiedProjects.map((project: any) => ({
			json: project,
			pairedItem: { item: index }
		}));

	} catch (error) {
		console.error('API Error details:', error);
		
		// Log more specific error information
		if (error.response) {
			console.error('Response status:', error.response.status);
			console.error('Response statusText:', error.response.statusText);
			console.error('Response data:', error.response.data);
			console.error('Response headers:', error.response.headers);
		}
		
		if (error.request) {
			console.error('Request was made but no response received');
			console.error('Request config:', error.request);
		}
		
		// Enhanced error handling with more specific messages
		if (error.httpCode === 404) {
			return [{ 
				json: { 
					status: false, 
					message: 'Projects endpoint not found (404). Check if the API URL is correct.', 
					data: [] 
				}, 
				pairedItem: { item: index } 
			}];
		}
		
		if (error.httpCode === 401) {
			return [{ 
				json: { 
					status: false, 
					message: 'Unauthorized (401). Check if your API token is valid.', 
					data: [] 
				}, 
				pairedItem: { item: index } 
			}];
		}
		
		if (error.httpCode === 403) {
			return [{ 
				json: { 
					status: false, 
					message: 'Forbidden (403). Check if your API token has permission to access projects.', 
					data: [] 
				}, 
				pairedItem: { item: index } 
			}];
		}
		
		if (error instanceof Error) {
			throw new Error(`Failed to retrieve projects: ${error.message}. Check your API configuration and credentials.`);
		}
		
		throw new Error('An unknown error occurred while retrieving projects. Check your network connection and API configuration.');
	}
} 