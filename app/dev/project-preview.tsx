import Image from "next/image";

import type { Project } from "./projects";
import type { LinkPreview } from "./link-preview";

export function ProjectPreview({
  project,
  preview,
  priority = false,
}: {
  project: Project;
  preview: LinkPreview;
  priority?: boolean;
}) {
  if (preview.image) {
    return (
      <div className="relative aspect-[1200/630] w-full shrink-0 overflow-hidden bg-muted">
        <Image
          src={preview.image}
          alt={preview.title ?? `${project.name} GitHub preview`}
          fill
          unoptimized
          referrerPolicy="no-referrer"
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.015]"
        />
      </div>
    );
  }

  return (
    <div className="flex aspect-[1200/630] w-full shrink-0 flex-col items-center justify-center gap-2 border border-dashed border-border bg-muted/30 px-5 text-center">
      <span className="font-mono text-xs text-muted-foreground">github.com</span>
      <span className="text-sm font-medium">{project.name}</span>
    </div>
  );
}
