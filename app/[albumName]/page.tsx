import AlbumGrid from "./AlbumGrid";

export default async function Albums({
  params,
}: {
  params: Promise<{ albumName: string }>;
}) {
  const { albumName } = await params;

  return <AlbumGrid albumName={albumName} />;
}
