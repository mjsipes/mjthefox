import Image from "next/image";

interface ImageViewProps {
  params: {
    albumName: string;
    imageName: string;
  };
}

export default function ImageView({ params }: ImageViewProps) {
  const { albumName, imageName } = params;

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
