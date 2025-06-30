import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function Instruments() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: instruments } = await supabase.from("instruments").select();
  console.log("Instruments:", instruments);

  const { data: files, error } = await supabase.storage
    .from("mj-photos")
    .list("deep space");
  console.log("Storage Data:", files);
  console.error("Storage Error:", error);

  const imageUrls =
    files?.map((item) => {
      const { data } = supabase.storage
        .from("mj-photos")
        .getPublicUrl(`deep space/${item.name}`);
      return data.publicUrl;
    }) || [];

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {imageUrls.map((url, idx) => (
        <div key={idx} className="w-full h-auto relative aspect-square">
          <Image
            src={url}
            alt={`Image ${idx}`}
            layout="fill"
            objectFit="cover"
            className="rounded shadow"
          />
        </div>
      ))}
    </div>
  );
}
