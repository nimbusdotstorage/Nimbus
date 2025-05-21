"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, Clock, Plus, Folder, HardDrive, Share, Star, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  // Sample folders
  const folders = [
    { id: "1", name: "Documents" },
    { id: "2", name: "Images" },
    { id: "3", name: "Videos" },
    { id: "4", name: "Projects" },
    { id: "5", name: "Work" },
  ]

  return (
    <div className="w-64 border-r bg-background p-4 flex flex-col min-h-full">
      <div className="flex flex-col flex-grow overflow-y-auto">
        <Button className="w-full justify-start gap-2 mb-6">
          <Plus className="h-4 w-4" />
          New Upload
        </Button>

        <nav className="space-y-1">
          <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between" onClick={() => setIsOpen(!isOpen)}>
                <div className="flex items-center gap-2">
                  <HardDrive className="h-4 w-4" />
                  <span>My Cloud</span>
                </div>
                {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6 pt-1">
              {folders.map((folder) => (
                <Button key={folder.id} variant="ghost" size="sm" className="w-full justify-start gap-2 h-8">
                  <Folder className="h-3.5 w-3.5" />
                  {folder.name}
                </Button>
              ))}
            </CollapsibleContent>
          </Collapsible>

          <Button variant="ghost" className="w-full justify-start gap-2">
            <Share className="h-4 w-4" />
            Shared with me
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Star className="h-4 w-4" />
            Starred
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Clock className="h-4 w-4" />
            Recent
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Trash className="h-4 w-4" />
            Trash
          </Button>
        </nav>
      </div>

      <div className="p-4 border-t bg-background">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Storage</h3>
          <Progress value={8} className="h-2" />
          <p className="text-xs text-muted-foreground">158.3 GB of 2 TB used</p>
        </div>
        <div className="mt-4">
          <Button variant="outline" className="w-full">
            Get more storage
          </Button>
        </div>
      </div>
    </div>
  )
}
