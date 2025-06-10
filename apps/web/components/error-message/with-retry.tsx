import { Button } from "@/components/ui/button";
import { parseError } from "@/web/utils/error";

export function ErrorMessageWithRetry({ error, retryFn }: { error: unknown; retryFn: () => void }) {
	return (
		<div className="flex flex-1 flex-col items-center justify-center space-y-2">
			<p>{parseError(error)}</p>
			<Button onClick={retryFn}>Try again</Button>
		</div>
	);
}
