export class SuccessResponse<T> {
	success: boolean;
	message: string;
	code: string;
	data: T;

	constructor(response: { code: string; message: string; data: T }) {
		this.success = true;
		this.code = response.code;
		this.message = response.message;
		this.data = response.data;
	}
}
