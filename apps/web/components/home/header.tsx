"use client";

import { Discord } from "@/components/icons/discord";
import { Button } from "@/components/ui/button";
import { XPlatform } from "../icons/x";
import { ModeToggle } from "@/components/mode-toggle";

export default function Header() {
	return (
		<header className="absolute top-0 left-0 right-0 z-50 items-center justify-between p-4 flex">
			<h1 className="text-lg font-bold font-sans">Nimbus</h1>
			<div className="flex items-center gap-4">
				<Button variant="ghost" aria-label="Discord">
					<Discord />
				</Button>
				<Button variant="ghost" aria-label="X (Twitter)">
					<XPlatform />
				</Button>
				<ModeToggle />
			</div>
		</header>
	);
}
