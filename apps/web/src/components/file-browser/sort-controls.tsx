"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ArrowUp, ArrowDown, SortAsc } from "lucide-react";
import type { SortConfig, SortField } from "@/lib/types";
import { getSortIcon } from "@/lib/utils";

interface SortControlsProps {
	sortConfig: SortConfig;
	onSortChange: (field: SortField) => void;
}

export function SortControls({ sortConfig, onSortChange }: SortControlsProps) {
	const getSortLabel = (field: SortField): string => {
		const labels = {
			name: "Name",
			modified: "Date Modified", 
			size: "File Size",
			type: "File Type",
		};
		return labels[field];
	};

	const getSortDirectionIcon = (field: SortField) => {
		const iconDirection = getSortIcon(field, sortConfig);
		if (!iconDirection) return <ArrowUpDown className="h-3 w-3 opacity-50" />;
		return iconDirection === "asc" ? 
			<ArrowUp className="h-3 w-3" /> : 
			<ArrowDown className="h-3 w-3" />;
	};

	const getCurrentSortLabel = () => {
		const fieldLabel = getSortLabel(sortConfig.field);
		const directionLabel = sortConfig.direction === "asc" ? "A-Z" : "Z-A";
		return `${fieldLabel} (${directionLabel})`;
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="sm" className="h-8 gap-2">
					<SortAsc className="h-4 w-4" />
					<span className="hidden sm:inline">Sort by: {getCurrentSortLabel()}</span>
					<span className="sm:hidden">Sort</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-48">
				<DropdownMenuItem
					className="flex items-center justify-between cursor-pointer"
					onClick={() => onSortChange("name")}
				>
					<span>Name</span>
					{getSortDirectionIcon("name")}
				</DropdownMenuItem>
				<DropdownMenuItem
					className="flex items-center justify-between cursor-pointer"
					onClick={() => onSortChange("modified")}
				>
					<span>Date Modified</span>
					{getSortDirectionIcon("modified")}
				</DropdownMenuItem>
				<DropdownMenuItem
					className="flex items-center justify-between cursor-pointer"
					onClick={() => onSortChange("size")}
				>
					<span>File Size</span>
					{getSortDirectionIcon("size")}
				</DropdownMenuItem>
				<DropdownMenuItem
					className="flex items-center justify-between cursor-pointer"
					onClick={() => onSortChange("type")}
				>
					<span>File Type</span>
					{getSortDirectionIcon("type")}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
} 