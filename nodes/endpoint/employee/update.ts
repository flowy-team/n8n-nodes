import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { ApiRequest } from '../../helpers/ApiRequest';

/**
 * Validates and formats the joining date string
 * @param dateString Date string in YYYY-MM-DD format
 * @returns Formatted date string or throws error if invalid
 */
function validateJoiningDate(dateString: string): string {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) {
    throw new Error('Invalid date format. Please use YYYY-MM-DD format for joining date.');
  }
  
  // Check if date is valid
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid joining date. Please provide a valid date.');
  }
  
  return dateString;
}

/**
 * Validates email format
 * @param email Email string to validate
 * @returns True if email is valid, throws error if not
 */
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format. Please provide a valid email address.');
  }
  return true;
}

export async function updateEmployee(
  this: IExecuteFunctions, 
  index: number
): Promise<INodeExecutionData[]> {
  let employeeId: string;
  
  try {
    // Required fields
    employeeId = this.getNodeParameter('employeeId', index) as string;
    const name = this.getNodeParameter('name', index) as string;
    const email = this.getNodeParameter('email', index) as string;
    const joiningDate = validateJoiningDate(this.getNodeParameter('joiningDate', index) as string);
    
    // Direct fields (no longer in additionalFields)
    const mobile = this.getNodeParameter('mobile', index, '') as string;
    const gender = this.getNodeParameter('gender', index, 'male') as string;
    const status = this.getNodeParameter('status', index, 'active') as string;
    const login = this.getNodeParameter('login', index, 'enable') as string;
    const locale = this.getNodeParameter('locale', index, 'en') as string;
    const customEmployeeId = this.getNodeParameter('customEmployeeId', index, '') as string;
    const address = this.getNodeParameter('address', index, '') as string;
    const department = this.getNodeParameter('department', index, 0) as number;
    const designation = this.getNodeParameter('designation', index, 0) as number;
    const preferredName = this.getNodeParameter('preferredName', index, '') as string;
    const username = this.getNodeParameter('username', index, '') as string;
    const timezone = this.getNodeParameter('timezone', index, 'UTC') as string;
    const updatePassword = this.getNodeParameter('updatePassword', index, '') as string;
    
    // Validate required fields
    if (!employeeId) throw new Error('Employee ID is required to update an employee');
    if (!name) throw new Error('Name is required');
    if (!email) throw new Error('Email is required');
    validateEmail(email);

    // Prepare request body with required fields - matching exact API structure
    const body: IDataObject = {
      name,
      email,
      joining_date: joiningDate,
    };

    // Add optional fields if provided - using exact API field names
    if (mobile) body.mobile = mobile;
    if (gender) body.gender = gender;
    if (status) body.status = status;
    if (login) body.login = login;
    if (locale) body.locale = locale;
    if (customEmployeeId) body.employee_id = customEmployeeId;
    if (address) body.address = address;
    if (department && department > 0) body.department = department;
    if (designation && designation > 0) body.designation = designation;
    if (preferredName) body.preferred_name = preferredName;
    if (username) body.username = username;
    if (timezone) body.timezone = timezone;
    if (updatePassword) body.password = updatePassword;

    // Make API request
    console.log('Employee Update Request Body:', JSON.stringify(body, null, 2));
    console.log('API Endpoint:', `PUT /employees/${employeeId}`);
    
    const responseData = await ApiRequest.call(
      this, 
      'PUT', 
      `/employees/${employeeId}`, 
      body
    );
    console.log('Employee Update API Response:', JSON.stringify(responseData, null, 2));
    
    // Always return simplified response - handle different response structures
    let employeeData;
    if (responseData.data) {
      // Standard structure: { status: true, message: "...", data: {...} }
      employeeData = responseData.data;
    } else if (responseData.id) {
      // Direct structure: { id: 123, name: "...", ... }
      employeeData = responseData;
    } else {
      // Fallback: return the raw response
      return [{ json: responseData, pairedItem: { item: index } }];
    }

    // Simplify the response according to n8n UX guidelines
    const simplifiedEmployee = {
      id: employeeData.id,
      userId: employeeData.user_id,
      name: employeeData.name,
      email: employeeData.email,
      mobile: employeeData.mobile,
      gender: employeeData.gender,
      status: employeeData.status,
      login: employeeData.login,
      locale: employeeData.locale,
      customEmployeeId: employeeData.employee_id,
      address: employeeData.address,
      joiningDate: employeeData.joining_date,
      department: employeeData.department,
      designation: employeeData.designation,
      preferredName: employeeData.preferred_name,
      username: employeeData.username,
      timezone: employeeData.timezone,
      createdAt: employeeData.created_at,
      updatedAt: employeeData.updated_at,
      // Remove internal fields and keep user-friendly names
    };

    return [{ json: simplifiedEmployee, pairedItem: { item: index } }];

  } catch (error) {
    // Log the full error for debugging
    console.error('Employee Update Error:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    
    // Improve error messages for user
    if (error.httpCode === 404) {
      const errorEmployeeId = this.getNodeParameter('employeeId', index) as string;
      throw new Error(`Employee with ID ${errorEmployeeId || 'unknown'} not found`);
    } else if (error.httpCode === 422) {
      throw new Error(`Validation failed: ${error.message || 'Please check your input data'}`);
    } else if (error.httpCode === 400) {
      throw new Error(`Bad request: ${error.message || 'Invalid request data'}`);
    } else if (error.httpCode === 401) {
      throw new Error('Authentication failed: Please check your API credentials');
    } else if (error.httpCode === 403) {
      throw new Error('Permission denied: You don\'t have permission to update employees');
    }
    
    if (error instanceof Error) {
      throw new Error(`Failed to update employee: ${error.message}`);
    }
    throw error;
  }
}
