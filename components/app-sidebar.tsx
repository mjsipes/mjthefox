import * as React from "react"

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
          title: "Home",
          url: "/home",
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
              <a href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <img src="/turtle.jpeg" alt="Turtle" className="size-4 rounded" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Mjsipes Photography</span>
                </div>
              </a>
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
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={item.url}>{item.title}</a>
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
