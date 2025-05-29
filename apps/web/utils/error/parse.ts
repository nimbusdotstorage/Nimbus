export function parseError(error: unknown) {
	if (typeof error === "string") {
		return error;
	}

	if (error instanceof Error) {
		return error.message;
	}

	return "An unknown error occurred";
}
