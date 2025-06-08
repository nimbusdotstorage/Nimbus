"use client";

import React from "react";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, Folder, Tag, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface SearchResult {
	id: string;
	name: string;
	type: string;
	size: string;
	modified: string;
	keywords: string[];
	tags: Array<{ id: string; name: string; color: string }>;
}

interface SearchDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

// Demo data for search results
const DEMO_FILES: SearchResult[] = [
	{
		id: "1",
		name: "Q4_Financial_Report.xlsx",
		type: "spreadsheet",
		size: "2.4 MB",
		modified: "May 10, 2024",
		keywords: ["financial", "report", "q4", "spreadsheet", "billing", "revenue"],
		tags: [
			{ id: "tag1", name: "financial", color: "bg-green-500" },
			{ id: "tag2", name: "important", color: "bg-red-500" },
		],
	},
	{
		id: "2",
		name: "Invoice_Template.xlsx",
		type: "spreadsheet",
		size: "1.2 MB",
		modified: "May 8, 2024",
		keywords: ["invoice", "template", "billing", "spreadsheet", "accounting"],
		tags: [
			{ id: "tag3", name: "billing", color: "bg-blue-500" },
			{ id: "tag4", name: "template", color: "bg-purple-500" },
		],
	},
	{
		id: "3",
		name: "Budget_Planning_2024.xlsx",
		type: "spreadsheet",
		size: "3.1 MB",
		modified: "May 5, 2024",
		keywords: ["budget", "planning", "2024", "spreadsheet", "financial"],
		tags: [
			{ id: "tag1", name: "financial", color: "bg-green-500" },
			{ id: "tag5", name: "planning", color: "bg-yellow-500" },
		],
	},
	{
		id: "4",
		name: "Meeting_Notes.docx",
		type: "document",
		size: "0.8 MB",
		modified: "May 3, 2024",
		keywords: ["meeting", "notes", "document", "discussion"],
		tags: [{ id: "tag6", name: "meetings", color: "bg-indigo-500" }],
	},
	{
		id: "5",
		name: "Project_Proposal.pdf",
		type: "document",
		size: "4.2 MB",
		modified: "May 1, 2024",
		keywords: ["project", "proposal", "document", "plan"],
		tags: [
			{ id: "tag7", name: "projects", color: "bg-pink-500" },
			{ id: "tag2", name: "important", color: "bg-red-500" },
		],
	},
	{
		id: "6",
		name: "Client_Presentation.pptx",
		type: "presentation",
		size: "15.3 MB",
		modified: "April 28, 2024",
		keywords: ["presentation", "client", "slides", "proposal"],
		tags: [
			{ id: "tag8", name: "presentations", color: "bg-orange-500" },
			{ id: "tag9", name: "client", color: "bg-cyan-500" },
		],
	},
	{
		id: "7",
		name: "Team_Photos",
		type: "folder",
		size: "156 MB",
		modified: "April 25, 2024",
		keywords: ["photos", "team", "images", "pictures"],
		tags: [{ id: "tag10", name: "photos", color: "bg-emerald-500" }],
	},
	{
		id: "8",
		name: "Expense_Report_March.xlsx",
		type: "spreadsheet",
		size: "890 KB",
		modified: "April 20, 2024",
		keywords: ["expense", "report", "march", "billing", "accounting"],
		tags: [
			{ id: "tag3", name: "billing", color: "bg-blue-500" },
			{ id: "tag11", name: "expenses", color: "bg-amber-500" },
		],
	},
];

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
	const [query, setQuery] = useState("");
	const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
	const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
	const [extractedKeywords, setExtractedKeywords] = useState<string[]>([]);

	const handleSearch = () => {
		if (!query.trim()) {
			setSearchResults([]);
			setExtractedKeywords([]);
			return;
		}

		// Simple keyword extraction
		const keywords = query
			.toLowerCase()
			.split(/\s+/)
			.filter(word => word.length > 2);
		setExtractedKeywords(keywords);

		// Filter files based on keywords
		const results = DEMO_FILES.filter(file => {
			const searchText =
				`${file.name} ${file.keywords.join(" ")} ${file.tags.map(t => t.name).join(" ")}`.toLowerCase();
			return keywords.some(keyword => searchText.includes(keyword.toLowerCase()));
		});

		setSearchResults(results);
	};

	const handleKeyPress = (e: KeyboardEvent) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	const toggleFileSelection = (fileId: string) => {
		setSelectedFiles(prev => {
			const newSet = new Set(prev);
			if (newSet.has(fileId)) {
				newSet.delete(fileId);
			} else {
				newSet.add(fileId);
			}
			return newSet;
		});
	};

	const addTagToSelected = (tagName: string) => {
		if (selectedFiles.size === 0) return;

		const newTag = {
			id: `tag_${Date.now()}`,
			name: tagName,
			color: "bg-blue-500",
		};

		setSearchResults(prev =>
			prev.map(file => (selectedFiles.has(file.id) ? { ...file, tags: [...file.tags, newTag] } : file))
		);

		setSelectedFiles(new Set()); // Clear selection after tagging
	};

	const getFileIcon = (type: string) => {
		switch (type) {
			case "folder":
				return <Folder className="h-4 w-4 text-blue-500" />;
			case "spreadsheet":
				return <FileText className="h-4 w-4 text-green-500" />;
			case "presentation":
				return <FileText className="h-4 w-4 text-orange-500" />;
			default:
				return <FileText className="h-4 w-4 text-gray-500" />;
		}
	};

	// Reset when dialog opens
	const handleOpenChange = (newOpen: boolean) => {
		if (newOpen) {
			setQuery("");
			setSearchResults([]);
			setSelectedFiles(new Set());
			setExtractedKeywords([]);
		}
		onOpenChange(newOpen);
	};

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogContent className="max-w-4xl max-h-[85vh] h-[85vh] overflow-hidden flex flex-col">
				<DialogHeader className="flex-shrink-0">
					<DialogTitle className="flex items-center gap-2">
						<Search className="h-5 w-5 text-blue-500" />
						Advanced Search
					</DialogTitle>
					<DialogDescription>Search through your files and organize them with tags</DialogDescription>
				</DialogHeader>

				<div className="flex-shrink-0 space-y-3">
					<div className="flex gap-2">
						<div className="relative flex-1">
							<Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Search for files, documents, folders..."
								value={query}
								onChange={e => setQuery(e.target.value)}
								onKeyPress={handleKeyPress}
								className="pl-10"
								autoFocus
							/>
						</div>
						<Button onClick={handleSearch} disabled={!query.trim()}>
							<Search className="h-4 w-4 mr-2" />
							Search
						</Button>
					</div>

					{/* Quick Search Examples */}
					<div className="flex gap-2 flex-wrap">
						<Button
							variant="outline"
							size="sm"
							onClick={() => {
								setQuery("spreadsheet billing");
								setTimeout(handleSearch, 100);
							}}
						>
							<FileText className="h-3 w-3 mr-1" />
							Billing spreadsheets
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={() => {
								setQuery("financial report");
								setTimeout(handleSearch, 100);
							}}
						>
							<FileText className="h-3 w-3 mr-1" />
							Financial reports
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={() => {
								setQuery("presentation client");
								setTimeout(handleSearch, 100);
							}}
						>
							<FileText className="h-3 w-3 mr-1" />
							Client presentations
						</Button>
						{selectedFiles.size > 0 && (
							<Button
								variant="outline"
								size="sm"
								onClick={() => addTagToSelected("important")}
								className="border-blue-500 text-blue-600"
							>
								<Tag className="h-3 w-3 mr-1" />
								Tag Selected ({selectedFiles.size})
							</Button>
						)}
					</div>

					{/* Keywords */}
					{extractedKeywords.length > 0 && (
						<div>
							<div className="flex items-center gap-2 mb-2">
								<Filter className="h-4 w-4 text-primary" />
								<span className="text-sm font-medium">Search terms:</span>
							</div>
							<div className="flex flex-wrap gap-1">
								{extractedKeywords.map((keyword, index) => (
									<Badge key={index} variant="secondary" className="text-xs">
										{keyword}
									</Badge>
								))}
							</div>
						</div>
					)}
				</div>

				{/* Results */}
				<div className="flex-1 min-h-0 overflow-hidden flex flex-col">
					{searchResults.length > 0 ? (
						<div className="flex flex-col h-full">
							<div className="flex-shrink-0 flex items-center justify-between py-3 border-b">
								<h3 className="text-lg font-semibold">
									Found {searchResults.length} result{searchResults.length !== 1 ? "s" : ""}
								</h3>
								{selectedFiles.size > 0 && (
									<div className="flex items-center gap-2">
										<span className="text-sm text-muted-foreground">{selectedFiles.size} selected</span>
										<Button size="sm" onClick={() => addTagToSelected("important")}>
											<Tag className="h-3 w-3 mr-1" />
											Add Tag
										</Button>
									</div>
								)}
							</div>

							<div className="flex-1 overflow-y-auto py-3">
								<div className="grid gap-3">
									{searchResults.map(file => (
										<Card
											key={file.id}
											className={`cursor-pointer transition-colors hover:bg-accent/50 ${
												selectedFiles.has(file.id) ? "ring-2 ring-blue-500 bg-blue-50/50" : ""
											}`}
											onClick={() => toggleFileSelection(file.id)}
										>
											<CardContent className="p-4">
												<div className="flex items-start justify-between">
													<div className="flex items-center gap-3 flex-1">
														{getFileIcon(file.type)}
														<div className="flex-1 min-w-0">
															<h4 className="font-medium truncate">{file.name}</h4>
															<div className="flex items-center gap-2 text-sm text-muted-foreground">
																<span>{file.modified}</span>
																<span>•</span>
																<span>{file.size}</span>
																<span>•</span>
																<span className="capitalize">{file.type}</span>
															</div>
														</div>
													</div>
													<div className="flex flex-wrap gap-1 ml-4">
														{file.tags.map(tag => (
															<Badge key={tag.id} variant="secondary" className={`text-xs ${tag.color} text-white`}>
																{tag.name}
															</Badge>
														))}
													</div>
												</div>
											</CardContent>
										</Card>
									))}
								</div>
							</div>
						</div>
					) : query && query.trim() ? (
						<div className="flex-1 flex items-center justify-center text-center py-12">
							<div className="text-muted-foreground">
								<Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
								<p className="text-lg mb-2">No results found</p>
								<p className="text-sm">Try different keywords or check your spelling</p>
							</div>
						</div>
					) : (
						<div className="flex-1 flex items-center justify-center text-center py-12">
							<div className="text-muted-foreground">
								<Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
								<p className="text-lg mb-2">Start searching</p>
								<p className="text-sm">Enter keywords to find your files or try the examples above</p>
							</div>
						</div>
					)}
				</div>

				{/* Quick Actions */}
				{searchResults.length > 0 && (
					<div className="flex-shrink-0 border-t pt-3 mt-3">
						<div className="flex items-center gap-2 mb-2">
							<Tag className="h-4 w-4 text-primary" />
							<span className="text-sm font-medium">Quick actions:</span>
						</div>
						<div className="flex flex-wrap gap-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => addTagToSelected("important")}
								disabled={selectedFiles.size === 0}
							>
								Tag as Important
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => addTagToSelected("work")}
								disabled={selectedFiles.size === 0}
							>
								Tag as Work
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => addTagToSelected("archive")}
								disabled={selectedFiles.size === 0}
							>
								Tag as Archive
							</Button>
						</div>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
}
