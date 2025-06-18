import { ERROR_MESSAGES } from "../constants/error-message";
import { ERROR_CODES } from "../constants/error-code";

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

export const getServerErrorResponse = () => {
	return new ErrorResponse({
		code: ERROR_CODES.INTERNAL_SERVER_ERROR,
		message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
	});
};
