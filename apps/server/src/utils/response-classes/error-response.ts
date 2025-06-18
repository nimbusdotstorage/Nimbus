export class ErrorResponse<T> {
	success: boolean;
	code: string;
	message: string;
	error?: T;
	constructor(response: { code: string; message: string; error?: T }) {
		this.success = false;
		this.code = response.code;
		this.message = response.message;
		this.error = response.error;
	}
}
