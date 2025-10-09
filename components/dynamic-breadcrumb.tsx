"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function DynamicBreadcrumb() {
  const pathname = usePathname()
  
  // Generate breadcrumb items based on the current path
  const generateBreadcrumbs = () => {
    const segments = pathname.split('/').filter(Boolean)
    const breadcrumbs = []
    
    // Always add Home as the first item
    breadcrumbs.push({
      label: "Home",
      href: "/",
      isCurrent: segments.length === 0
    })
    
    // Add album name if we're in an album
    if (segments.length >= 1) {
      const albumName = segments[0]
      const formattedAlbumName = albumName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      
      breadcrumbs.push({
        label: formattedAlbumName,
        href: `/${albumName}`,
        isCurrent: segments.length === 1
      })
    }
    
    // Add image name if we're viewing a specific image
    if (segments.length >= 2) {
      const imageName = segments[1]
      // Remove file extension and format the name
      const formattedImageName = imageName
        .replace(/\.[^/.]+$/, '') // Remove file extension
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      
      breadcrumbs.push({
        label: formattedImageName,
        href: pathname,
        isCurrent: true
      })
    }
    
    return breadcrumbs
  }
  
  const breadcrumbs = generateBreadcrumbs()
  
  // Function to get styled label based on breadcrumb position
  const getStyledLabel = (label: string, index: number) => {
    if (index === 0) {
      // First breadcrumb: no styling changes
      return label
    } else if (index === 1) {
      // Second breadcrumb: blue with brackets (brackets also colored)
      return <span className="text-sipes-blue">[{label}]</span>
    } else if (index === 2) {
      // Third breadcrumb: green with parentheses (parentheses also colored)
      return <span className="text-sipes-green">({label})</span>
    }
    // Default for any additional breadcrumbs
    return label
  }
  
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={item.href}>
            <BreadcrumbItem>
              {item.isCurrent ? (
                <BreadcrumbPage>{getStyledLabel(item.label, index)}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={item.href}>{getStyledLabel(item.label, index)}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && (
              <BreadcrumbSeparator />
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
} 