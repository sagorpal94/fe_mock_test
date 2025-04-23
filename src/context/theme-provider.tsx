import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type ThemeProviderProps = {
    children: React.ReactNode
}

type ThemeProviderState = {
    isDark: boolean
    setIsDark: (isDark: boolean) => void
}

const initialState: ThemeProviderState = {
    isDark: false,
    setIsDark: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [isDark, setIsDark] = useState<boolean>(() => {
        // Check localStorage first
        const savedTheme = localStorage.getItem("theme")
        if (savedTheme) {
            return savedTheme === "dark"
        }
        // Fall back to system preference
        if (typeof window !== "undefined") {
            return window.matchMedia("(prefers-color-scheme: dark)").matches
        }
        return false
    })

    useEffect(() => {
        const root = window.document.documentElement
        root.classList.remove("light", "dark")
        root.classList.add(isDark ? "dark" : "light")

        // Save to localStorage
        localStorage.setItem("theme", isDark ? "dark" : "light")
    }, [isDark])

    const value = {
        isDark,
        setIsDark,
    }

    return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext)
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }
    return context
}
