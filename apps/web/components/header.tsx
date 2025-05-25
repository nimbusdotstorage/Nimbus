import { Bell, HelpCircle, Search, Settings, HardDrive } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/mode-toggle";
import { ChevronDown, Plus, Server } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import Image from "next/image";
import AzureIcon from "@/public/azure";
import GoogleCloudIcon from "@/public/gcp";
import AWSIcon from "@/public/aws";
import ICloudIcon from "@/public/icloud";
import OneDriveIcon from "@/public/onedrive";
import GoogleDriveIcon from "@/public/googledrive";

export function Header() {
  return (
    <header className="border-b bg-background">
      <div className="flex h-16 items-center px-4 gap-4 justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="p-0 flex items-center gap-2 font-semibold"
            >
              {/* Need a logo */}
              {/* <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold">
                  <Image
                    width={24}
                    height={24}
                    src="/public/cloud.svg"
                    alt="cloud"
                  />
                </span>
              </div>*/}
              <span>Nimbus</span>
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Sources</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <HardDrive className="mr-2 h-4 w-4" />
              <span>Local Files</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <GoogleDriveIcon className="mr-2 h-4 w-4" />
              <span>Google Drive</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <OneDriveIcon className="mr-2 h-4 w-4" />
              <span>OneDrive</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ICloudIcon className="mr-2 h-4 w-4" />
              <span>iCloud</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <AWSIcon className="mr-2 h-4 w-4" />
              <span>S3</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <GoogleCloudIcon className="mr-2 h-4 w-4" />
              <span>GCP</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <AzureIcon className="mr-2 h-4 w-4" />
              <span>Azure</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Server className="mr-2 h-4 w-4" />
              <span>NAS</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Plus className="mr-2 h-4 w-4" />
              <span>Add New Source</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search in Drive"
            className="w-full pl-8 bg-muted/50"
          />
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
  );
}
