import type { ReactNode } from "react";

interface EmptyStateProps {
	icon: ReactNode;
	title: string;
	description?: string;
	executeAction?: ReactNode;
}

export function EmptyState({ icon, title, description, executeAction }: EmptyStateProps) {
	return (
		<div className="bg-background/80 flex flex-col items-center rounded-2xl border border-dashed px-8 py-16 text-center shadow-sm dark:bg-neutral-900/80">
			<div className="bg-muted/60 mb-6 flex h-12 w-12 items-center justify-center rounded-lg dark:bg-neutral-800">
				{icon}
			</div>
			<h2 className="mb-2 text-xl font-bold">{title}</h2>
			{description && <p className="text-muted-foreground mb-6 text-base">{description}</p>}
			<div>{executeAction}</div>
		</div>
	);
}
