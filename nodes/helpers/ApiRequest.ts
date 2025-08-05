import {
	IDataObject,
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	IWebhookFunctions,
	IHttpRequestMethods,
	IRequestOptions,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';
import { config } from '../config';

export async function ApiRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions | IWebhookFunctions,
	method: IHttpRequestMethods,
	resource: string,
	body: any = {},
	qs: IDataObject = {},
	uri?: string,
	_option: IDataObject = {},
): Promise<any> {
	const credentials = await this.getCredentials('flowyteamApi');

	// Menggunakan baseUrl dari konfigurasi
	const baseUrl = config.baseUrl;

	// Log untuk debugging
	// console.log('Menggunakan baseUrl dari konfigurasi:', baseUrl);

	const options: IRequestOptions = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${credentials.apiToken}`,
		},
		method,
		qs,
		body,
		uri: uri || `${baseUrl}/api/v2${resource}`,
		json: true,
	};

	try {
		return await this.helpers.request.call(this, options);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}
