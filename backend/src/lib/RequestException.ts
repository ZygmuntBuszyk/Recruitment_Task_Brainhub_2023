import { HttpStatusCode } from '../types/HttpStatusCode';

export class RequestException extends Error {
	message: string;
	key?: string;
	status: HttpStatusCode;

	constructor({ message, key, status }: { message: string; key?: string; status: HttpStatusCode }) {
		super(message);
		this.message = message;
		this.key = key;
		this.status = status;
	}
}
