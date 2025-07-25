// app/[albumName]/[imageName]/page.tsx

import Image from "next/image";

export default function ImageView({
  params,
}: {
  params: { albumName: string; imageName: string };
}) {
  const { albumName, imageName } = params;

  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/${albumName}/${imageName}`;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Image
        src={imageUrl}
        alt={`${imageName} from ${albumName}`}
        width={1200}
        height={1200}
        className="max-w-full max-h-screen object-contain"
        priority
      />
    </div>
  );
}
