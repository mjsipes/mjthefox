import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Instruments() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: instruments } = await supabase.from("instruments").select();
  return <pre>{JSON.stringify(instruments, null, 2)}</pre>;
}
