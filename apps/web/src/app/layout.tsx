import type { ReactNode } from "react";
import "@/app/globals.css";

import { ReactQueryProvider } from "@/components/providers/query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import promoImage from "@/public/images/preview.png";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { siteConfig } from "@/utils/site-config";
import { Toaster } from "sonner";

export const metadata = {
	keywords: ["nimbus", "cloud", "storage", "file", "sharing", "upload", "download", "sync", "backup"],
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`,
	},
	description: siteConfig.description,
	metadataBase: new URL(siteConfig.url as string),
	openGraph: {
		title: siteConfig.name,
		description: siteConfig.description,
		url: siteConfig.url,
		siteName: siteConfig.name,
		images: [
			{
				url: promoImage.src,
				width: promoImage.width,
				height: promoImage.height,
				alt: siteConfig.name,
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		title: siteConfig.name,
		description: siteConfig.description,
		site: siteConfig.twitterHandle,
		card: "summary_large_image",
		domain: siteConfig.url,
		images: [
			{
				url: promoImage.src,
				width: promoImage.width,
				height: promoImage.height,
				alt: siteConfig.name,
			},
		],
	},
	robots: {
		index: true,
		follow: true,
		nocache: false,
		googleBot: {
			index: true,
			follow: true,
			noimageindex: false,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
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
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<ReactQueryProvider>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
						<div className="relative min-h-screen">
							<main className="flex flex-1 justify-center">
								{children}
								<Analytics />
							</main>
							<Toaster position="top-center" richColors theme="system" />
						</div>
					</ThemeProvider>
				</ReactQueryProvider>
			</body>
		</html>
	);
}
