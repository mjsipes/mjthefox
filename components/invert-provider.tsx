"use client"

import * as React from "react"

type InvertProviderProps = {
  children: React.ReactNode
  defaultInverted?: boolean
}

type InvertProviderState = {
  inverted: boolean
  setInverted: (inverted: boolean) => void
}

const initialState: InvertProviderState = {
  inverted: false,
  setInverted: () => null,
}

const InvertProviderContext = React.createContext<InvertProviderState>(initialState)

export function InvertProvider({
  children,
  defaultInverted = false,
  ...props
}: InvertProviderProps) {
  const [inverted, setInverted] = React.useState<boolean>(defaultInverted)

  const value = {
    inverted,
    setInverted,
  }

  return (
    <InvertProviderContext.Provider {...props} value={value}>
      {children}
    </InvertProviderContext.Provider>
  )
}

export const useInvert = () => {
  const context = React.useContext(InvertProviderContext)

  if (context === undefined)
    throw new Error("useInvert must be used within a InvertProvider")

  return context
}
