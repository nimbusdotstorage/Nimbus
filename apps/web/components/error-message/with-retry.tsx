import { parseError } from "@/web/utils/error";
import { Button } from "../ui/button";

export function ErrorMessageWithRetry({ error, retryFn }: { error: unknown; retryFn: () => void }) {
	return (
		<div className="space-y-2 flex-1 flex flex-col items-center justify-center">
			<p>{parseError(error)}</p>
			<Button onClick={retryFn}>Try again</Button>
		</div>
	);
}
