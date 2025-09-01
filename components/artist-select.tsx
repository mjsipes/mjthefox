"use client"

import * as React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useArtist, ARTISTS, type Artist } from "@/components/artist-provider"

export function ArtistSelect() {
  const { artist, setArtist } = useArtist()

  return (
    <Select value={artist} onValueChange={(value: Artist) => setArtist(value)}>
      <SelectTrigger className="w-[165px] shadow-none" size="sm">
        <SelectValue placeholder="Select artist style" />
      </SelectTrigger>
      <SelectContent>
        {ARTISTS.map((artistName) => (
          <SelectItem key={artistName} value={artistName}>
            {artistName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
