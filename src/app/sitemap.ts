import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { allSlugsForSitemapQuery } from "@/sanity/lib/queries";
import { getSiteUrl } from "@/lib/utils";

import { BlogPost, Service, Project } from "@/types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const [data, settings] = await Promise.all([
    client.fetch(allSlugsForSitemapQuery),
    client.fetch(`*[_type == "siteSettings"][0] { enableProjects }`),
  ]);

  const showProjects = settings?.enableProjects !== false;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/hakkimizda`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/iletisim`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    ...(showProjects
      ? [{ url: `${base}/projeler`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 }]
      : []),
    { url: `${base}/hizmetler`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = [
    ...(data?.blogPosts?.map((p: BlogPost) => ({
      url: `${base}/${p.slug}`,
      lastModified: new Date(p._updatedAt || new Date()),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })) || []),

    ...(data?.services?.map((p: Service) => ({
      url: `${base}/hizmetler/${p.slug}`,
      lastModified: new Date(p._updatedAt || new Date()),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })) || []),

    ...(showProjects
      ? data?.projects?.map((p: Project) => ({
          url: `${base}/projeler/${p.slug}`,
          lastModified: new Date(p._updatedAt || new Date()),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        })) || []
      : []),
  ];

  return [...staticRoutes, ...dynamicRoutes];
}
