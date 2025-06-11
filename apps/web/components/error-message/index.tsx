import { parseError } from "@/web/utils/error";

export function ErrorMessage({ error }: { error: unknown }) {
	return (
		<div className="flex flex-1 flex-col items-center justify-center space-y-2">
			<p>{parseError(error)}</p>
		</div>
	);
}
