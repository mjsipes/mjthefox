"use client"

import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import { useInvert } from "@/components/invert-provider"

import { Button } from "@/components/ui/button"

export function InvertToggle() {
  const { inverted, setInverted } = useInvert()

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="size-7 focus-visible:ring-0 focus-visible:ring-offset-0"
      onClick={() => setInverted(!inverted)}
    >
      <Eye className={`size-4 transition-all ${inverted ? 'scale-0 -rotate-90' : 'scale-100 rotate-0'}`} />
      <EyeOff className={`absolute size-4 transition-all ${inverted ? 'scale-100 rotate-0' : 'scale-0 rotate-90'}`} />
      <span className="sr-only">Toggle image invert</span>
    </Button>
  )
}
