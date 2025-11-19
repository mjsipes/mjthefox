"use client";

import Image from "next/image";
import Link from "next/link";
import { ImageLoader } from "next/image";
import supabaseLoader from "@/utils/supabase/supabase-image-loader";
import { useAlbumsMetadata } from "@/hooks/use-albums-metadata";
import { useInvert } from "@/components/invert-provider";
import { useArtistImage } from "@/hooks/use-artist-image";
import { AsciiArrow } from "@/components/AsciiArrow";

// Album organization matching sidebar structure
const albumCategories = {
  "Worldly Travels": [
    "san-francisco",
    "sonoma", 
    "half-moon-bay",
    "kauai",
    "yosemite",
    "new-zealand",
    "joshua-tree"
  ],
  "Special Collections": [
    "day-in-the-life-of-a-desert-tortoise",
    "project-nuance",
    "celestial",
    "cloud-9",
    "sfo-amst"
  ]
};

function AlbumCover({ album }: { album: { name: string; firstImageUrl: string } }) {
  const { inverted } = useInvert();
  const { imageUrl } = useArtistImage(album.firstImageUrl);

  return (
    <div className="aspect-video relative">
      <Image
        loader={supabaseLoader as ImageLoader}
        src={imageUrl || album.firstImageUrl}
        alt={`${album.name} album cover`}
        fill
        className={`object-cover ${inverted ? 'invert' : ''}`}
      />
    </div>
  );
}

export default function Home() {
  const { albumsMetadata, loading } = useAlbumsMetadata();

  if (loading) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center h-full">
        <Image
          src="/favicon.ico"
          alt="fox"
          className="aspect-square size-8"
          width={32}
          height={32}
        />
        <p>Loading albums...</p>
      </div>
    );
  }

  // Create ordered list of albums matching sidebar order
  const orderedAlbumNames = [
    ...albumCategories["Worldly Travels"],
    ...albumCategories["Special Collections"]
  ];

  const orderedAlbums = orderedAlbumNames
    .map(albumName => albumsMetadata.find(album => album.name === albumName))
    .filter(album => album !== undefined);

  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {orderedAlbums.map((album) => (
          <Link
            key={album.name}
            href={`/${album.name}`}
            className="group border border-transparent hover:border-sipes-blue dark:hover:border-sipes-orange"
          >
            <AlbumCover album={album} />
            <div className="p-4 text-center">
              <h3 className="font-medium capitalize text-sm group-hover:text-sipes-green">
                <span className="opacity-0 group-hover:opacity-100"><AsciiArrow direction="right" /></span>
                {album.name.replace(/-/g, ' ')}
                <span className="opacity-0 group-hover:opacity-100"><AsciiArrow direction="left" /></span>
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
