import type { ReactNode } from "react";

import { SessionProvider } from "@/components/providers/session-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/main-sidebar/app-sidebar";
import { auth } from "@nimbus/auth/auth";
import { headers } from "next/headers";

export default async function AppLayout({ children }: { children: ReactNode }) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) return null;

	return (
		<SessionProvider value={{ session, user: session.user }}>
			<SidebarProvider>
				<AppSidebar variant="inset" />
				<SidebarInset className="md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-0">
					<main className="flex-1 p-1">{children}</main>
				</SidebarInset>
			</SidebarProvider>
		</SessionProvider>
	);
}
