import type { ReactNode } from "react";
import "@/web/app/globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ReactQueryProvider } from "@/web/components/providers/query-provider";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
	title: "Nimbus",
	description: "A better cloud storage solution.",
	openGraph: {
		title: "Nimbus",
		description: "A better cloud storage solution.",
		url: "https://nimbus.storage",
		siteName: "Nimbus",
		// images: [
		// 	{
		// 		// TODO: Add promo image
		// 		url: "/images/promo.png",
		// 		width: 1200,
		// 		height: 630,
		// 		alt: "Nimbus",
		// 	},
		// ],
		locale: "en_US",
		type: "website",
	},
};

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<ReactQueryProvider>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
						<div className="relative min-h-screen">
							<main className="flex-1 flex justify-center ">
								{children}
								<Analytics />
							</main>
						</div>
					</ThemeProvider>
				</ReactQueryProvider>
			</body>
		</html>
	);
}
