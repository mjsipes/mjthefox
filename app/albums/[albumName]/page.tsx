import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function Albums({ params }: { params: { albumName: string } }) {
  const { albumName } = params;
  console.log("Album Name:", albumName);
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: instruments } = await supabase.from("instruments").select();
  console.log("Instruments:", instruments);

  const { data: items, error } = await supabase.storage
    .from("mj-photos")
    .list(albumName);
  console.log("Storage Data:", items);
  console.error("Storage Error:", error);

  const publicUrls = items?.map((item) => {
    const { data } = supabase.storage
      .from("mj-photos")
      .getPublicUrl(`${albumName}/${item.name}`);
    return data.publicUrl;
  }) || [];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {publicUrls.map((url, i) => (
        <div key={i} className="relative w-full aspect-square">
          <Image
            src={url}
            alt={`Photo ${i + 1}`}
            fill
            className="object-cover rounded"
          />
        </div>
      ))}
    </div>
  );
}
