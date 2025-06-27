"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ModeToggle } from "@/components/mode-toggle";
import { Discord } from "@/components/icons/discord";
import Logo from "@/components/icons/brand/logo";
import { XPlatform } from "@/components/icons/x";
import { Button } from "@/components/ui/button";
import { GitHub } from "../icons/github";
import { Users } from "lucide-react";
import Link from "next/link";

export default function Header() {
	return (
		<header className="border-border bg-surface/80 fixed top-4 left-1/2 z-50 mx-auto flex w-full max-w-2xl -translate-x-1/2 items-center justify-between rounded-lg border px-4 py-2 backdrop-blur-xs">
			<h1>
				<Link href="/" className="hover:text-primary/80 flex items-center gap-2 font-bold transition-colors">
					<span>
						<Logo className="h-9 w-9" aria-hidden="true" />
					</span>
					Nimbus
				</Link>
			</h1>
			<div className="flex items-center gap-1">
				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="ghost" asChild aria-label="Contributors">
							<Link href="/contributors" className="hover:text-primary/80 transition-colors">
								<Users className="h-5 w-5" />
							</Link>
						</Button>
					</TooltipTrigger>
					<TooltipContent>Contributors</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="ghost" aria-label="Discord">
							<a href="https://discord.gg/c9nWy26ubK" target="_blank" rel="noopener noreferrer">
								<Discord />
							</a>
						</Button>
					</TooltipTrigger>
					<TooltipContent>Discord</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="ghost" asChild>
							<a href="https://github.com/nimbusdotstorage/Nimbus" target="_blank" rel="noopener noreferrer">
								<GitHub />
							</a>
						</Button>
					</TooltipTrigger>
					<TooltipContent>Github</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="ghost" aria-label="X (Twitter)">
							<a href="https://x.com/nimbusdotcloud" target="_blank" rel="noopener noreferrer">
								<XPlatform />
							</a>
						</Button>
					</TooltipTrigger>
					<TooltipContent>X (Twitter)</TooltipContent>
				</Tooltip>
				<ModeToggle />
			</div>
		</header>
	);
}
