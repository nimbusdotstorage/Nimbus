"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Discord } from "@/components/icons/discord";
import { Button } from "@/components/ui/button";
import { XPlatform } from "../icons/x";

export default function Header() {
	return (
		<header className="absolute top-0 right-0 left-0 z-50 flex items-center justify-between p-4">
			<h1 className="font-sans text-lg font-bold">Nimbus</h1>
			<div className="flex items-center gap-4">
				<Button variant="ghost" aria-label="Discord">
					<a href="https://discord.gg/c9nWy26ubK" target="_blank" rel="noopener noreferrer">
						<Discord />
					</a>
				</Button>
				<Button variant="ghost" aria-label="X (Twitter)">
					<a href="https://x.com/nimbusdotcloud" target="_blank" rel="noopener noreferrer">
						<XPlatform />
					</a>
				</Button>
				<ModeToggle />
			</div>
		</header>
	);
}
