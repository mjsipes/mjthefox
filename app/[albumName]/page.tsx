import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export default async function Albums({
  params,
}: {
  params: { albumName: string };
}) {
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

  const publicUrls =
    items?.map((item) => ({
      url: `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/${albumName}/${item.name}?width=400`, // thumbnail with width 400px
      name: item.name,
    })) || [];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {publicUrls.map((item, i) => (
        <Link 
          key={i} 
          href={`/${albumName}/${item.name}`}
          className="relative w-full aspect-square block hover:opacity-90 transition-opacity"
        >
          <Image
            src={item.url}
            alt={`Image ${i + 1}`}
            width={1000}
            height={1000}
          />
        </Link>
      ))}
    </div>
  );
}
