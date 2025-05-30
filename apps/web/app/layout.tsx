import type { ReactNode } from "react";
import "@/web/app/globals.css";
import { Inter } from "next/font/google";

import { ThemeProvider } from "components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/main-sidebar/app-sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Nimbus - Better Cloud Storage",
	description: "A modern cloud storage solution",
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					<SidebarProvider>
						<AppSidebar />
						<main className="flex-1 p-1">{children}</main>
					</SidebarProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
