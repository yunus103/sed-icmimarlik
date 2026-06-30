import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export const dynamic = "force-static";

export async function GET() {
  try {
    const [posts, services, projects] = await Promise.all([
      client.fetch(`*[_type == "blogPost" && defined(slug.current)].slug.current`, {}, { next: { tags: ["valid-slugs"] } }),
      client.fetch(`*[_type == "service" && defined(slug.current)].slug.current`, {}, { next: { tags: ["valid-slugs"] } }),
      client.fetch(`*[_type == "project" && defined(slug.current)].slug.current`, {}, { next: { tags: ["valid-slugs"] } }),
    ]);

    const allSlugs = [
      ...(posts || []),
      ...(services || []),
      ...(projects || []),
    ];

    return NextResponse.json({ slugs: allSlugs }, {
      headers: {
        "Cache-Control": "public, s-maxage=31536000, stale-while-revalidate=59",
      },
    });
  } catch (error) {
    console.error("Failed to fetch valid slugs:", error);
    return NextResponse.json({ slugs: [] }, { status: 500 });
  }
}
