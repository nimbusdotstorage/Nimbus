import { parseError } from "@/web/utils/error/parse";

export function ErrorMessage({ error }: { error: unknown }) {
	return (
		<div className="space-y-2 flex-1 flex flex-col items-center justify-center">
			<p>{parseError(error)}</p>
		</div>
	);
}
