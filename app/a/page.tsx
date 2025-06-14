
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Image from 'next/image'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: todos } = await supabase.from('todos').select()


  return (
    <Image
      src="https://gjbeonnspjcwyrpgcnuz.supabase.co/storage/v1/object/public/mj-photos//IMG_3509.jpg"
      width={2000}
      height={2000}
      alt="Picture of the author"
    />
  )
}
