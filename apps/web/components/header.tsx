import { Bell, HelpCircle, Settings } from "lucide-react";

import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/repo/auth/src/auth-client";
import { LogOut, Search } from "lucide-react";
import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { signOut } from "@/repo/auth/methods";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
	const router = useRouter();

	const handleSignOut = async () => {
		try {
			await signOut();
			toast.success("Signed out successfully");
			router.push("/");
		} catch (error: any) {
			toast.error(error.message);
			console.error("Error signing out:", error);
		}
	};

	const userName = session?.user?.name;
	const userEmail = session?.user?.email;
	const userImage = session?.user?.image;
	const userInitials = getInitials(userName);

	return (
		<header className="border-b bg-background">
			<div className="flex h-16 items-center px-4 gap-4 justify-between">
				<SidebarTrigger />
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
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon" className="rounded-full">
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
									<DropdownMenuItem className="flex flex-col items-start focus:bg-transparent cursor-default">
										<div className="font-medium">{userName || "User"}</div>
										<div className="text-xs text-muted-foreground">{userEmail || "No email"}</div>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
										<LogOut className="mr-2 h-4 w-4" />
										<span>Sign Out</span>
									</DropdownMenuItem>
								</>
							) : (
								<DropdownMenuItem asChild className="cursor-pointer">
									<Link href="/signin">Log In</Link>
								</DropdownMenuItem>
							)}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
}
