"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="size-7 focus-visible:ring-0 focus-visible:ring-offset-0"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <Sun className={`size-4 transition-all ${isDark ? 'scale-0 -rotate-90' : 'scale-100 rotate-0'}`} />
      <Moon className={`absolute size-4 transition-all ${isDark ? 'scale-100 rotate-0' : 'scale-0 rotate-90'}`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
