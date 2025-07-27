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
      url: "#",
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
      url: "#",
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
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <Image src="/turtle.jpeg" alt="Turtle" className="aspect-square size-8 rounded-lg" width={32} height={32} />
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Mjsipes Photography</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url} className="font-medium">
                    {item.title}
                  </Link>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild>
                          <Link href={item.url}>{item.title}</Link>
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
