import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function ImageView({
  params,
}: {
  params: { albumName: string; imageName: string };
}) {
  const { albumName, imageName } = params;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // Verify the image exists in storage
  const { data: items, error } = await supabase.storage
    .from("mj-photos")
    .list(albumName);

  if (error || !items) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Album not found</h1>
        <Link 
          href="/albums" 
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Back to Albums
        </Link>
      </div>
    );
  }

  // Check if the specific image exists
  const imageExists = items.some(item => item.name === imageName);
  
  if (!imageExists) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Image not found</h1>
        <Link 
          href={`/albums/${albumName}`}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Back to {albumName} Album
        </Link>
      </div>
    );
  }

  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/${albumName}/${imageName}`;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Image
        src={imageUrl}
        alt={`${imageName} from ${albumName}`}
        width={1920}
        height={1080}
        className="max-w-full max-h-screen object-contain"
        priority
      />
    </div>
  );
}
