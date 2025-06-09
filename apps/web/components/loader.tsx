import type { HTMLAttributes } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/web/lib/utils";

export function Loader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn("flex flex-1 items-center justify-center py-8", className)} {...props}>
			<Loader2 className="animate-spin" />
		</div>
	);
}
