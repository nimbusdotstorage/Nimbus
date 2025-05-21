import { Bell, HelpCircle, Search, Settings, HardDrive } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ModeToggle } from "@/components/mode-toggle"
import { Box, ChevronDown, Cloud, Plus, Server } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  return (
    <header className="border-b bg-background">
      <div className="flex h-16 items-center px-4 gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-0 flex items-center gap-2 font-semibold">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold">D</span>
              </div>
              <span>DrivePlus</span>
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>File Sources</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <HardDrive className="mr-2 h-4 w-4" />
              <span>My Drive</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Cloud className="mr-2 h-4 w-4" />
              <span>Google Drive</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Cloud className="mr-2 h-4 w-4" />
              <span>OneDrive</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Box className="mr-2 h-4 w-4" />
              <span>Dropbox</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Box className="mr-2 h-4 w-4" />
              <span>Box</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Server className="mr-2 h-4 w-4" />
              <span>Personal Server</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Plus className="mr-2 h-4 w-4" />
              <span>Add New Source</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search in Drive" className="w-full pl-8 bg-muted/50" />
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button variant="ghost" size="icon">
            <HelpCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
