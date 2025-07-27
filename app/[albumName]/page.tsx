import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import AlbumGrid from "./AlbumGrid";

export default async function Albums({
  params,
}: {
  params: Promise<{ albumName: string }>;
}) {
  const { albumName } = await params;

  const supabase = createClient(cookies());

  const BUCKET = "mj-photos";
  const { data: items, error } = await supabase.storage
    .from(BUCKET)
    .list(`${albumName}/small`);

  if (error) {
    console.error("Storage Error:", error);
  }

  const publicUrls =
    items?.map((item) => ({
      name: item.name,
      url: `${BUCKET}/${albumName}/small/${item.name}`,
    })) || [];

  return <AlbumGrid albumName={albumName} images={publicUrls} />;
}
