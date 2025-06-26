
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Image from 'next/image'

export default async function Page() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: todos } = await supabase.from('todos').select()

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <Image
        src="https://gjbeonnspjcwyrpgcnuz.supabase.co/storage/v1/object/public/mj-photos//IMG_3509.jpg"
        width={2000}
        height={2000}
        alt="Picture of the author"
      />
    </div>
  )
}
