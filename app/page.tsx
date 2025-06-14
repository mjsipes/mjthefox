import Image from "next/image";
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <Image
    src="https://gjbeonnspjcwyrpgcnuz.supabase.co/storage/v1/object/public/mj-photos//IMG_3509.jpg"
    width={2000}
    height={2000}
    alt="Picture of the author"
  />
  );
}
