import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function Albums() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: instruments } = await supabase.from("instruments").select();
  console.log("Instruments:", instruments);

  const { data, error } = await supabase.storage
    .from("mj-photos")
    .list("deep space");
  console.log("Storage Data:", data);
  console.error("Storage Error:", error);

  for (const item of data || []) {
    console.log("Item:", item.name);
    const { data } = supabase.storage
      .from("mj-photos")
      .getPublicUrl(`deep space/${item.name}`);
    console.log("Public URL:", data.publicUrl);
  }
  return (
    <div className="relative w-full h-full">
      <Image
        src="https://gjbeonnspjcwyrpgcnuz.supabase.co/storage/v1/object/public/mj-photos//IMG_3509.jpg"
        width={2000}
        height={2000}
        alt="Picture of the author"
        className="object-cover w-full h-full"
      />
    </div>
  );
}
