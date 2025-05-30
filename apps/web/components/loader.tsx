import { Loader2 } from "lucide-react";
import type React from "react";
import { cn } from "../lib/utils";

export function Loader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn("flex items-center justify-center flex-1 py-8", className)} {...props}>
			<Loader2 className="animate-spin" />
		</div>
	);
}
