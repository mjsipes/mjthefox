import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { PhotoCarousel } from "@/components/photo-carousel";

const supabaseUrl = "https://gjbeonnspjcwyrpgcnuz.supabase.co";
const supabaseStoragePath = "/storage/v1/object/public/mj-photos";

export default function Home() {
  const carouselImages = [
    {
      src: `${supabaseUrl}${supabaseStoragePath}/home/1.jpg`,
      alt: "Switzerland Photo 1",
    },
    {
      src: `${supabaseUrl}${supabaseStoragePath}/home/2.jpg`,
      alt: "Switzerland Photo 2",
    },
    {
      src: `${supabaseUrl}${supabaseStoragePath}/home/3.jpg`,
      alt: "Switzerland Photo 3",
    },
  ];

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">mjthefox.com</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="relative w-full">
            <Image
              src={`${supabaseUrl}${supabaseStoragePath}/home/pano.jpg`}
              width={1200}
              height={800}
              alt="Switzerland Pano"
              className="w-full h-auto object-cover"
              priority
            />
            <PhotoCarousel images={carouselImages} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
