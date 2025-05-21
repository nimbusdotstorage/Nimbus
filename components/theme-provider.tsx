"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface ThemeContextProps {
  theme: "light" | "dark" | "system"
  setTheme: (theme: "light" | "dark" | "system") => void
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: "system",
  setTheme: () => {},
})

export const ThemeProvider = ({
  children,
  defaultTheme = "system",
  attribute = "class",
}: {
  children: React.ReactNode
  defaultTheme?: "light" | "dark" | "system"
  attribute?: string
}) => {
  const [theme, setTheme] = useState<"light" | "dark" | "system">(defaultTheme)

  useEffect(() => {
    // Function to update the attribute on the html element
    function updateTheme() {
      const root = window.document.documentElement

      if (theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
        root.setAttribute(attribute, systemTheme)
        return
      }

      root.setAttribute(attribute, theme)
    }

    updateTheme()
  }, [theme, attribute])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
