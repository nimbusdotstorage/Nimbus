import type { ComponentProps } from "react";
import { cn } from "lib/utils";

interface FieldErrorProps extends ComponentProps<"span"> {
	error?: string;
}

export function FieldError({ error, className, ...props }: FieldErrorProps) {
	if (!error) return null;

	return (
		<span className={cn("text-destructive pl-1 text-sm", className)} {...props}>
			{error}
		</span>
	);
}
