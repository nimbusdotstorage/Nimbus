import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, LogOut, MessageCircleQuestion, Search, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SearchDialog } from "@/components/search/search-dialog";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { authClient } from "@nimbus/auth/auth-client";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignOut } from "@/hooks/useAuth";
import { useState } from "react";
import Link from "next/link";

const getInitials = (name?: string | null) => {
	if (!name) return "SG";
	const parts = name.trim().split(/\s+/);
	if (parts.length === 0) return "SG";

	const firstInitial = parts[0]?.[0] || "";
	const lastInitial = parts.length > 1 ? parts[parts.length - 1]?.[0] || "" : "";

	return (firstInitial + lastInitial).toUpperCase() || "SG";
};

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
	const userInitials = getInitials(userName);

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
								<Avatar className="h-8 w-8">
									{userImage && <AvatarImage src={userImage} alt={userName || "User"} />}
									<AvatarFallback>{isPending ? "..." : userInitials}</AvatarFallback>
								</Avatar>
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
