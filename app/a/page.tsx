import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function Instruments() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: instruments } = await supabase.from("instruments").select();
  console.log("Instruments:", instruments);

  const { data, error } = await supabase
  .storage
  .from('mj-photos')
  .list('deep space', {
    limit: 100,
    offset: 0,
    sortBy: { column: 'name', order: 'asc' },
  })
  console.log("Storage Data:", data);
  console.error("Storage Error:", error);
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
