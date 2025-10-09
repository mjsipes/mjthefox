import * as React from "react"
import Link from "next/link"
import Image from "next/image"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Worldly Travels",
      url: "/",
      items: [
        {
          title: "San Francisco",
          url: "/san-francisco",
        },
        {
          title: "Sonoma",
          url: "/sonoma",
        },
        {
          title: "Half Moon Bay",
          url: "/half-moon-bay",
        },
        {
          title: "Kauai",
          url: "/kauai",
        },
        {
          title: "Yosemite",
          url: "/yosemite",
        },
        {
          title: "New Zealand",
          url: "/new-zealand",
        },
        {
          title: "Joshua Tree",
          url: "/joshua-tree",
        },
      ],
    },
    {
      title: "Special Collections",
      url: "/",
      items: [
        {
          title: "Day In The Life Of A Desert Tortoise",
          url: "/day-in-the-life-of-a-desert-tortoise",
        },
        {
          title: "Project Nuance",
          url: "/project-nuance",
        },
        {
          title: "Celestial",
          url: "/celestial",
        },
        {
          title: "Cloud 9",
          url: "/cloud-9",
        },
        {
          title: "SFO - AMST",
          url: "/sfo-amst",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar 
      {...props}
    >
      <SidebarHeader className="bg-background border-b border-sipes-orange h-16">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/" className="hover:text-sipes-blue">
                <Image src="/favicon.ico" alt="Turtle" className="aspect-square size-8 " width={32} height={32} />
                <div className="flex flex-col gap-0.5 leading-none ">
                  <span className="font-medium">Mjsipes Photography</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-background">
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url} className="font-medium hover:text-sipes-blue group/link">
                    {item.title}
                    <span className="opacity-0 group-hover/link:opacity-100">
                      <span className="text-sipes-green">&lt;</span>
                      <span className="text-sipes-green">-</span>
                      <span className="text-sipes-orange">-</span>
                      <span className="text-sipes-blue">-</span>
                    </span>
                  </Link>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild>
                          <Link href={item.url} className="hover:text-sipes-blue group/sublink">
                            {item.title}
                            <span className="opacity-0 group-hover/sublink:opacity-100">
                              <span className="text-sipes-green">&lt;</span>
                              <span className="text-sipes-green">-</span>
                              <span className="text-sipes-orange">-</span>
                              <span className="text-sipes-blue">-</span>
                            </span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
