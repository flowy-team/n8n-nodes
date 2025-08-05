import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class FlowyteamApi implements ICredentialType {
	name = 'flowyteamApi';
	displayName = 'Flowyteam API';
	documentationUrl = 'https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];

}
