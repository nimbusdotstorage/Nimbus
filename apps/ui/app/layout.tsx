import type React from "react"
import "@/ui/app/globals.css"
import { Inter } from "next/font/google"

import { ThemeProvider } from "@/ui/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Nimbus - Better Cloud Storage",
  description: "A modern cloud storage solution",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
