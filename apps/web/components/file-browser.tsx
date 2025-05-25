"use client";

import { useState } from "react";
import { FileText, Folder, Grid, List, MoreVertical, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

interface FileItem {
  id: string;
  name: string;
  type: "folder" | "document" | "image" | "video";
  size?: string;
  modified: string;
}

export function FileBrowser() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleFileClick = (file: FileItem) => {
    setSelectedFile(file);
    setIsPreviewOpen(true);
  };

  // Sample data
  const files: FileItem[] = [
    {
      id: "1",
      name: "Documents",
      type: "folder",
      modified: "May 15, 2024",
    },
    {
      id: "2",
      name: "Images",
      type: "folder",
      modified: "May 12, 2024",
    },
    {
      id: "3",
      name: "Project Proposal",
      type: "document",
      size: "2.4 MB",
      modified: "May 10, 2024",
    },
    {
      id: "4",
      name: "Quarterly Report",
      type: "document",
      size: "4.2 MB",
      modified: "May 8, 2024",
    },
    {
      id: "5",
      name: "Meeting Notes",
      type: "document",
      size: "1.1 MB",
      modified: "May 5, 2024",
    },
    {
      id: "6",
      name: "Videos",
      type: "folder",
      modified: "May 3, 2024",
    },
  ];

  return (
    <div
      className={`space-y-4 ${isPreviewOpen ? "blur-sm transition-all" : ""}`}
    >
      <div className="flex items-center justify-between">
        <Tabs defaultValue="all" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="folders">Folders</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {files.map((file) => (
            <Card
              key={file.id}
              className="overflow-hidden bg-card hover:bg-accent/10 transition-colors cursor-pointer"
              onClick={() => handleFileClick(file)}
            >
              <CardContent className="p-0">
                <div className="aspect-square flex items-center justify-center bg-muted/50 p-4">
                  {file.type === "folder" ? (
                    <Folder className="h-12 w-12 text-primary" />
                  ) : (
                    <FileText className="h-12 w-12 text-primary" />
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between p-2">
                <div className="truncate">
                  <h3 className="text-xs font-medium truncate">{file.name}</h3>
                  <p className="text-[10px] text-muted-foreground">
                    {file.modified}
                  </p>
                </div>
                <FileActions />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="border rounded-md overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-3 font-medium">Name</th>
                <th className="text-left p-3 font-medium">Modified</th>
                <th className="text-left p-3 font-medium">Size</th>
                <th className="p-3 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr
                  key={file.id}
                  className="border-t hover:bg-accent/10 transition-colors"
                >
                  <td className="p-4 flex items-center gap-2">
                    {file.type === "folder" ? (
                      <Folder className="h-4 w-4 text-primary" />
                    ) : (
                      <FileText className="h-4 w-4 text-primary" />
                    )}
                    {file.name}
                  </td>
                  <td className="p-3 text-sm text-muted-foreground">
                    {file.modified}
                  </td>
                  <td className="p-3 text-sm text-muted-foreground">
                    {file.size || "—"}
                  </td>
                  <td className="p-3">
                    <FileActions />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Document Preview Drawer */}
      <Sheet open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
          <SheetHeader className="mb-4">
            <div className="flex items-center justify-between">
              <SheetTitle>{selectedFile?.name}</SheetTitle>
              <SheetClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </SheetClose>
            </div>
            <SheetDescription>
              {selectedFile?.type === "document"
                ? "Document Preview"
                : "Folder Contents"}
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-4">
            {selectedFile?.type === "document" ? (
              <div className="border rounded-md p-4 bg-muted/30">
                <div className="aspect-[3/4] bg-background rounded-md border flex items-center justify-center mb-4">
                  <FileText className="h-16 w-16 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">{selectedFile?.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Size: {selectedFile?.size}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Last modified: {selectedFile?.modified}
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-medium mb-2">Document Content Preview</h4>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                    <div className="h-4 bg-muted rounded w-4/6"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Folder className="h-12 w-12 mx-auto mb-2" />
                <p>Folder preview not available</p>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function FileActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Open</DropdownMenuItem>
        <DropdownMenuItem>Share</DropdownMenuItem>
        <DropdownMenuItem>Download</DropdownMenuItem>
        <DropdownMenuItem>Rename</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
