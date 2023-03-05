export enum FormRequestType {
	NAME = 'name',
	EMAIL = 'email',
	LOG = 'log'
}

export interface ILogRequest {
	name: string;
	email: string;
	log: string;
}

export interface ILogResponse {
	data: string;
	status: number;
}
