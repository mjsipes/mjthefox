import { unstable_cache } from "next/cache";

export type LinkPreview = {
  image: string | null;
  title: string | null;
};

function getMetaContent(html: string, key: string) {
  const tags = html.match(/<meta\s+[^>]*>/gi) ?? [];

  for (const tag of tags) {
    const property = tag.match(/(?:property|name)=["']([^"']+)["']/i)?.[1];
    const content = tag.match(/content=["']([^"']+)["']/i)?.[1];

    if (property?.toLowerCase() === key && content) {
      return content.replaceAll("&amp;", "&");
    }
  }

  return null;
}

async function fetchLinkPreview(url: string): Promise<LinkPreview> {
  try {
    const response = await fetch(url, {
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      return { image: null, title: null };
    }

    const html = await response.text();
    const image =
      getMetaContent(html, "og:image") ??
      getMetaContent(html, "twitter:image");
    const title =
      getMetaContent(html, "og:title") ??
      html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] ??
      null;

    return {
      image: image ? new URL(image, url).toString() : null,
      title,
    };
  } catch {
    return { image: null, title: null };
  }
}

export const getLinkPreview = unstable_cache(
  fetchLinkPreview,
  ["dev-link-preview"],
  { revalidate: 86400 },
);
