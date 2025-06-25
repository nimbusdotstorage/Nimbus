import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, LogOut, MessageCircleQuestion, Search, Settings } from "lucide-react";
import { SearchDialog } from "@/components/search/search-dialog";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { authClient } from "@nimbus/auth/auth-client";
import { ModeToggle } from "@/components/mode-toggle";
import Profile from "@/components/user-profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignOut } from "@/hooks/useAuth";
import { useState } from "react";
import Link from "next/link";

export function Header() {
	const { data: session, isPending } = authClient.useSession();
	const { signOut, isLoading } = useSignOut();
	const [isSearchOpen, setIsSearchOpen] = useState(false);

	const handleSignOut = async () => {
		await signOut();
	};

	const userName = session?.user?.name;
	const userEmail = session?.user?.email;
	// TODO: Cache the user image
	const userImage = session?.user?.image;
	return (
		<header className="bg-background border-b">
			<div className="flex h-16 items-center justify-between gap-4 px-4">
				<SidebarTrigger className="size-9 cursor-pointer" />
				<div className="flex max-w-xl flex-1 items-center">
					<div className="relative flex w-full items-center">
						<Search className="text-muted-foreground pointer-events-none absolute left-2.5 h-4 w-4" />
						<Input
							type="search"
							placeholder="Search smarter with AI"
							className="bg-muted/50 w-full pl-8"
							onFocus={() => setIsSearchOpen(true)}
						/>
					</div>
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
								<Profile url={userImage || null} name={userName || ""} size="sm" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							{isPending ? (
								<DropdownMenuItem>Loading...</DropdownMenuItem>
							) : session?.user ? (
								<>
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
								</>
							) : (
								<DropdownMenuItem asChild className="cursor-pointer">
									<Link href="/signin">Sign in</Link>
								</DropdownMenuItem>
							)}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			<SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
		</header>
	);
}
