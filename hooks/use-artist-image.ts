import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { useArtist, type Artist } from "@/components/artist-provider"
import { getImageId_from_image_path, getImagePath_from_image_id } from "@/app/api/gen-image/supabase-functions"

type ArtistImageResult = {
  imageUrl: string | null
  isLoading: boolean
  error: string | null
}

export function useArtistImage(originalImagePath: string): ArtistImageResult {
  const { artist } = useArtist()
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    async function getArtistImage() {
      if (artist === "Original") {
        setImageUrl(originalImagePath)
        setIsLoading(false)
        setError(null)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        // Step 1: Convert image path to image ID
        // originalImagePath format: "mj-photos/album-name/large/image.jpg"
        const bucket = "mj-photos"
        const path = originalImagePath.startsWith("mj-photos/") 
          ? originalImagePath.slice(10) // Remove "mj-photos/" prefix
          : originalImagePath
        
        const originalImageId = await getImageId_from_image_path(supabase, bucket, path)
        
        if (!originalImageId) {
          console.log("No image ID found for path, using original:", originalImagePath)
          setImageUrl(originalImagePath)
          setIsLoading(false)
          return
        }

        // Step 2: Search image_metadata table for artist version
        const { data: metadataData, error: metadataError } = await supabase
          .from("image_metadata")
          .select("image_id")
          .eq("parent_id", originalImageId)
          .eq("artist", artist)
          .single()

        if (metadataError || !metadataData) {
          console.log("No artist version found in metadata, using original:", artist, originalImagePath)
          setImageUrl(originalImagePath)
          setIsLoading(false)
          return
        }

        // Step 3: Get the artist image path from the new image_id
        const artistImagePath = await getImagePath_from_image_id(supabase, metadataData.image_id)
        
        if (!artistImagePath) {
          console.log("Artist image path not found, using original:", originalImagePath)
          setImageUrl(originalImagePath)
          setIsLoading(false)
          return
        }

        // Step 4: Create the path format that supabase loader expects
        const artistImageSrcPath = `${artistImagePath.bucket_id}/${artistImagePath.name}`

        console.log("Found artist image path:", artistImageSrcPath)
        setImageUrl(artistImageSrcPath)
        setIsLoading(false)

      } catch (err) {
        console.error("Error getting artist image:", err)
        setError(err instanceof Error ? err.message : "Unknown error")
        setImageUrl(originalImagePath) // Fallback to original
        setIsLoading(false)
      }
    }

    getArtistImage()
  }, [artist, originalImagePath, supabase])

  return { imageUrl, isLoading, error }
}
