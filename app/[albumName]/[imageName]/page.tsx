// app/[albumName]/[imageName]/page.tsx

import ImageViewer from '@/components/image-viewer';

export default function ImageView({
  params,
}: {
  params: { albumName: string; imageName: string };
}) {
  const { albumName, imageName } = params;

  return <ImageViewer albumName={albumName} imageName={imageName} />;
}
