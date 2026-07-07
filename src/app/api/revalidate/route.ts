import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

type SanitySlug = { current?: string } | string | null | undefined;

type WebhookPayload = {
  _type?: string;
  _id?: string;
  operation?: string;
  transition?: string;
  action?: string;
  slug?: SanitySlug;
  previousSlug?: SanitySlug;
  beforeSlug?: SanitySlug;
  oldSlug?: SanitySlug;
  slugChanged?: boolean;
  affectsUrl?: boolean;
  document?: {
    _type?: string;
    _id?: string;
    slug?: SanitySlug;
  };
  before?: {
    slug?: SanitySlug;
  };
};

function normalizeSlug(slug: SanitySlug): string | undefined {
  if (!slug) return undefined;
  if (typeof slug === "string") return slug || undefined;
  return slug.current || undefined;
}

function collectTags(payload: WebhookPayload) {
  const type = payload._type || payload.document?._type;
  const slug = normalizeSlug(payload.slug || payload.document?.slug);
  const previousSlug = normalizeSlug(
    payload.previousSlug || payload.beforeSlug || payload.oldSlug || payload.before?.slug,
  );

  const tags = new Set<string>();

  switch (type) {
    case "siteSettings":
    case "navigation":
      tags.add("layout");
      break;
    case "homePage":
      tags.add("home");
      break;
    case "aboutPage":
      tags.add("about");
      break;
    case "contactPage":
      tags.add("contact");
      break;
    case "blogPage":
      tags.add("blogPage");
      break;
    case "servicesPage":
      tags.add("servicesPage");
      break;
    case "projectsPage":
      tags.add("projectsPage");
      break;
    case "blogPost":
      tags.add("blog:list");
      if (slug) tags.add(`blog:detail:${slug}`);
      if (previousSlug && previousSlug !== slug) tags.add(`blog:detail:${previousSlug}`);
      break;
    case "blogCategory":
      tags.add("blog:list");
      tags.add("blog:categories");
      break;
    case "service":
      tags.add("service:list");
      if (slug) tags.add(`service:detail:${slug}`);
      if (previousSlug && previousSlug !== slug) tags.add(`service:detail:${previousSlug}`);
      break;
    case "project":
      tags.add("project:list");
      if (slug) tags.add(`project:detail:${slug}`);
      if (previousSlug && previousSlug !== slug) tags.add(`project:detail:${previousSlug}`);
      break;
    case "faq":
      tags.add("faq");
      break;
    default:
      if (type) tags.add(type);
      break;
  }

  return { type, slug, previousSlug, tags };
}

function affectsSitemap(payload: WebhookPayload, type?: string, slug?: string, previousSlug?: string) {
  if (payload.affectsUrl || payload.slugChanged) return true;
  if (previousSlug && previousSlug !== slug) return true;

  const operation = (payload.operation || payload.transition || payload.action || "").toLowerCase();
  if (["create", "created", "delete", "deleted", "publish", "published", "unpublish", "unpublished"].includes(operation)) {
    return type === "blogPost" || type === "service" || type === "project" || type === "siteSettings";
  }

  return false;
}

export async function POST(req: Request) {
  try {
    const signature = req.headers.get("sanity-webhook-signature");
    if (!signature) {
      return NextResponse.json({ message: "No signature provided" }, { status: 401 });
    }

    const { isValidSignature } = await import("@sanity/webhook");
    const secret = process.env.SANITY_WEBHOOK_SECRET;

    if (!secret) {
      console.error("SANITY_WEBHOOK_SECRET is not set in environment variables");
      return NextResponse.json(
        { message: "Server misconfiguration: missing secret" },
        { status: 500 },
      );
    }

    const body = await req.text();

    if (!isValidSignature(body, signature, secret)) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    const payload = JSON.parse(body) as WebhookPayload;
    const { type, slug, previousSlug, tags } = collectTags(payload);

    console.log(`[Sanity Webhook] Revalidating type: ${type || "unknown"}`);

    for (const tag of tags) {
      revalidateTag(tag, { expire: 0 });
      console.log(`Revalidated tag: ${tag}`);
    }

    const sitemapRevalidated = affectsSitemap(payload, type, slug, previousSlug);
    if (sitemapRevalidated) {
      revalidateTag("sitemap", { expire: 0 });
      revalidatePath("/sitemap.xml");
      console.log("Revalidated sitemap");
    }

    return NextResponse.json({
      revalidated: true,
      type,
      tags: Array.from(tags),
      sitemapRevalidated,
      now: Date.now(),
    });
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Revalidation error:", error.message);
    return NextResponse.json(
      { message: "Error revalidating", error: error.message },
      { status: 500 },
    );
  }
}
