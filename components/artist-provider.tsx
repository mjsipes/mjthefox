"use client"

import * as React from "react"

export const ARTISTS = [
  "Original",
  "Andy Warhol",
  "Frida Kahlo", 
  "Henri Matisse",
  "Pablo Picasso",
  "Salvador Dalí",
  "Vincent van Gogh"
] as const

export type Artist = typeof ARTISTS[number]

type ArtistProviderProps = {
  children: React.ReactNode
  defaultArtist?: Artist
}

type ArtistProviderState = {
  artist: Artist
  setArtist: (artist: Artist) => void
}

const initialState: ArtistProviderState = {
  artist: "Original",
  setArtist: () => null,
}

const ArtistProviderContext = React.createContext<ArtistProviderState>(initialState)

export function ArtistProvider({
  children,
  ...props
}: ArtistProviderProps) {
  // AI artist styles discontinued — always show originals.
  React.useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof window.localStorage?.removeItem !== "function"
    ) {
      return
    }
    window.localStorage.removeItem("artist-preference")
  }, [])

  return (
    <ArtistProviderContext.Provider {...props} value={initialState}>
      {children}
    </ArtistProviderContext.Provider>
  )
}

export const useArtist = () => {
  const context = React.useContext(ArtistProviderContext)

  if (context === undefined)
    throw new Error("useArtist must be used within a ArtistProvider")

  return context
}
