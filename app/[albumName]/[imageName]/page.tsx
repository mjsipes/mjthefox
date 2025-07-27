import ImageView from "./ImageView";

export default async function ImagePage({
  params,
}: {
  params: Promise<{ albumName: string; imageName: string }>;
}) {
  const { albumName, imageName } = await params;

  return <ImageView albumName={albumName} imageName={imageName} />;
}
