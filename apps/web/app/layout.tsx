import type { ReactNode } from "react";
import "@/web/app/globals.css";

import { ReactQueryProvider } from "@/web/components/providers/query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import promoImage from "@/public/images/preview.png";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";

export const metadata = {
	title: "Nimbus",
	description: "A better cloud storage solution.",
	openGraph: {
		title: "Nimbus",
		description: "A better cloud storage solution.",
		url: "https://nimbus.storage",
		siteName: "Nimbus",
		images: [
			{
				url: promoImage.src,
				width: promoImage.width,
				height: promoImage.height,
				alt: "Nimbus",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		title: "Nimbus",
		description: "A better cloud storage solution.",
		site: "@nimbusdotcloud",
		card: "summary_large_image",
		images: [
			{
				url: promoImage.src,
				width: promoImage.width,
				height: promoImage.height,
				alt: "Nimbus",
			},
		],
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
							<main className="flex flex-1 justify-center">
								{children}
								<Analytics />
							</main>
							<Toaster position="top-center" richColors />
						</div>
					</ThemeProvider>
				</ReactQueryProvider>
			</body>
		</html>
	);
}
