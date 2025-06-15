import { Bell, LogOut, MessageCircleQuestion, Search, Settings } from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "./providers/session-provider";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignOut } from "@/hooks/useAuth";
import Profile from "./ui/user-profile";

export function Header() {
	const { signOut, isLoading } = useSignOut();
	const { user } = useSession();

	const handleSignOut = async () => {
		await signOut();
	};

	const userName = user.name;
	const userEmail = user.email;
	const userImage = user.image;

	return (
		<header className="bg-background border-b">
			<div className="flex h-16 items-center justify-between gap-4 px-4">
				<SidebarTrigger className="size-9 cursor-pointer" />
				<div className="relative max-w-xl flex-1">
					<Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
					<Input type="search" placeholder="Search in Drive" className="bg-muted/50 w-full pl-8" />
				</div>
				<div className="flex items-center gap-2">
					<ModeToggle />
					<Button variant="ghost" size="icon">
						<MessageCircleQuestion className="h-5 w-5" />
					</Button>

					<Button variant="ghost" size="icon">
						<Settings className="h-5 w-5" />
					</Button>

					<Button variant="ghost" size="icon">
						<Bell className="h-5 w-5" />
					</Button>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon" className="cursor-pointer rounded-full">
								<Profile name={userName} url={userImage || null} size="sm" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem className="flex cursor-default flex-col items-start focus:bg-transparent">
								<div className="font-medium">{userName || "User"}</div>
								<div className="text-muted-foreground text-xs">{userEmail || "No email"}</div>
							</DropdownMenuItem>
							<DropdownMenuSeparator />

							<DropdownMenuItem onClick={handleSignOut} className="cursor-pointer" disabled={isLoading}>
								<LogOut className="mr-2 h-4 w-4" />
								<span>{isLoading ? "Signing out..." : "Sign Out"}</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
}
