import { cn } from "@/web/lib/utils";

export function SegmentedProgress({
	segments,
	value,
	className,
}: {
	segments: number;
	value: number;
	className?: string;
}) {
	return (
		<div className={cn("flex flex-row items-center justify-center gap-1.5", className)}>
			{Array.from({ length: segments }).map((_, index) => (
				<div
					key={index}
					className={cn(
						"h-[6px] w-full rounded-xs transition-colors",
						// The value is 1-based for the step, but the index is 0-based.
						// So we check if the index is less than the current step value.
						index < value ? "bg-primary" : "bg-muted"
					)}
				/>
			))}
		</div>
	);
}
