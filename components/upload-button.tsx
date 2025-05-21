import { Plus, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function UploadButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Upload className="h-4 w-4 mr-2" />
          Upload file
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Upload className="h-4 w-4 mr-2" />
          Upload folder
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Folder className="h-4 w-4 mr-2" />
          Create folder
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

import { Folder } from "lucide-react"
