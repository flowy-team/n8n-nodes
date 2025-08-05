import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

export async function getProjectCategory(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const categoryId = this.getNodeParameter('categoryId', index) as string;

	try {
		const responseData = await ApiRequest.call(this, 'GET', `/project-category/${categoryId}`);

		// Handle different response structures
		let categoryData;
		if (responseData && responseData.data && typeof responseData.data === 'object') {
			// Standard wrapper: { status: true, message: "...", data: {...} }
			categoryData = responseData.data;
		} else if (responseData && responseData.id) {
			// Direct object: { id: 123, category_name: "...", ... }
			categoryData = responseData;
		} else if (responseData && typeof responseData === 'object') {
			// Any object response - try to use it directly
			categoryData = responseData;
		} else {
			// No valid data found
			throw new NodeApiError(this.getNode(), {
				message: 'No project category data found',
				description: `Project category with ID ${categoryId} not found or returned empty data`,
			});
		}

		// Validate that we have an ID (minimum requirement)
		if (!categoryData || !categoryData.id) {
			throw new NodeApiError(this.getNode(), {
				message: 'Invalid project category data',
				description: `Project category with ID ${categoryId} returned invalid or incomplete data`,
			});
		}

		// Transform to simplified format with proper fallbacks
		const simplifiedCategory = {
			id: categoryData.id,
			categoryName: categoryData.category_name || categoryData.categoryName || '',
			companyId: categoryData.company_id || categoryData.companyId || null,
			createdAt: categoryData.created_at || categoryData.createdAt || null,
			updatedAt: categoryData.updated_at || categoryData.updatedAt || null,
		};

		return [{ json: simplifiedCategory, pairedItem: { item: index } }];

	} catch (error) {
		// Handle API errors with specific messages
		if (error.response) {
			const status = error.response.status;
			const responseData = error.response.data;
			
			if (status === 404) {
				throw new NodeApiError(this.getNode(), {
					message: 'Project category not found',
					description: `Project category with ID ${categoryId} does not exist`,
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
					description: 'You do not have permission to access this project category',
					httpCode: '403',
				});
			} else {
				throw new NodeApiError(this.getNode(), {
					message: `API Error: ${status}`,
					description: responseData?.message || 'Failed to retrieve project category',
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
			message: 'Failed to retrieve project category',
			description: error.message || 'An unexpected error occurred',
		});
	}
}

export async function showProjectCategories(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const limit = this.getNodeParameter('limit', index, 10) as number;
	const page = this.getNodeParameter('page', index, 1) as number;
	const search = this.getNodeParameter('search', index, '') as string;
	const sortDirection = this.getNodeParameter('sortDirection', index, 'DESC') as string;
	const sortField = this.getNodeParameter('sortField', index, 'id') as string;

	const qs: IDataObject = {
		limit,
		page,
	};

	if (search) {
		qs.search = search;
	}

	// Add sorting parameters
	if (sortField) {
		qs.sort_field = sortField;
	}
	if (sortDirection) {
		qs.sort_direction = sortDirection;
	}

	const responseData = await ApiRequest.call(this, 'GET', '/project-category', {}, qs);

	// Always return simplified response - handle different response structures
	let categoriesArray;
	if (responseData.data && responseData.data.data && Array.isArray(responseData.data.data)) {
		// Nested pagination structure: { status: true, message: "...", data: { current_page: 1, data: [...] } }
		categoriesArray = responseData.data.data;
	} else if (responseData.data && Array.isArray(responseData.data)) {
		// Standard structure: { status: true, message: "...", data: [...] }
		categoriesArray = responseData.data;
	} else if (Array.isArray(responseData)) {
		// Direct array structure: [...]
		categoriesArray = responseData;
	} else {
		// Fallback: return the raw response
		return [{ json: responseData, pairedItem: { item: index } }];
	}

	// Handle empty results
	if (!categoriesArray || categoriesArray.length === 0) {
		return [{ 
			json: { 
				status: true, 
				message: 'No project categories found', 
				data: [] 
			}, 
			pairedItem: { item: index } 
		}];
	}

	// Simplify each category in the array
	const simplifiedCategories = categoriesArray.map((category: any) => ({
		id: category.id,
		categoryName: category.category_name,
		companyId: category.company_id,
		createdAt: category.created_at,
		updatedAt: category.updated_at,
		// Remove unnecessary API metadata for simplified view
	}));

	// Return array of simplified categories
	return simplifiedCategories.map((category: any) => ({
		json: category,
		pairedItem: { item: index }
	}));
} 