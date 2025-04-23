import {Moon, Sun} from "lucide-react"
import {useTheme} from "../context/theme-provider.tsx";


export function ThemeToggle() {
    const {isDark, setIsDark} = useTheme()
    return (
        <button
            className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50  hover:bg-accent hover:text-accent-foreground py-2 group/toggle h-8 w-8 px-0"
            onClick={() => setIsDark(!isDark)}
        >
            {isDark ? (
                <Moon
                    className="w-4 h-4 hidden [html.dark_&]:block"
                    strokeWidth={1.5}
                />
            ) : (
                <Sun
                    className="w-4 h-4 hidden [html.light_&]:block"
                    strokeWidth={1.5}
                />
            )}
        </button>
    );
}