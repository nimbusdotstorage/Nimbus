import { SearchDialog } from "@/components/search/search-dialog";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";

export function SearchBar() {
	const [isSearchOpen, setIsSearchOpen] = useState(false);

	return (
		<>
			<Button
				variant="ghost"
				size="sm"
				className="flex h-8 items-center justify-start gap-2 self-stretch rounded-lg px-3 py-2 shadow-sm hover:bg-white dark:bg-neutral-700 dark:hover:bg-neutral-600"
				onClick={() => setIsSearchOpen(true)}
				aria-label="Open search dialog"
				aria-expanded={isSearchOpen}
			>
				<Search className="size-4" />
				<span className="text-sm">Search files...</span>
				{/* <kbd className="bg-muted text-muted-foreground pointer-events-none ml-auto inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
					<span className="text-xs">ctrl</span>/
				</kbd>  */}
			</Button>

			<SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
		</>
	);
}
