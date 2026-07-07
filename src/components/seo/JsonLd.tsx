import { getSiteUrl } from "@/lib/utils";
import { SiteSettings, BlogPost, SocialLink, Service, Project } from "@/types";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationJsonLd(settings?: SiteSettings) {
  const siteUrl = getSiteUrl();
  const name = settings?.siteName || "Sed İç Mimarlık";
  const phone = settings?.contactInfo?.phone || "05325673836";
  const email = settings?.contactInfo?.email || "info@sedicmimarlik.com";
  const addressText = settings?.contactInfo?.address || "Abdurrahman Nafiz Gürman Mah. Mete Sokak No:57 Güngören, İstanbul 34173 Türkiye";
  const logoUrl = settings?.logo?.asset?.url || `${siteUrl}/logo.png`;

  return {
    "@context": "https://schema.org",
    "@type": ["HomeAndConstructionBusiness", "Organization"],
    "@id": `${siteUrl}/#organization`,
    name: name,
    url: siteUrl,
    logo: logoUrl,
    image: logoUrl,
    telephone: phone,
    email: email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: addressText,
      addressLocality: "Güngören",
      addressRegion: "İstanbul",
      postalCode: "34173",
      addressCountry: "TR",
    },
    sameAs: settings?.socialLinks?.map((s: SocialLink) => s.url).filter(Boolean) || [],
  };
}

export function websiteJsonLd(settings?: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: settings?.siteName || "Sed İç Mimarlık",
    url: getSiteUrl(),
    ...(settings?.siteTagline && { alternateName: settings.siteTagline }),
  };
}

export function articleJsonLd(post?: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post?.title,
    datePublished: post?.publishedAt,
    url: `${getSiteUrl()}/blog/${post?.slug?.current}`,
    ...(post?.mainImage?.asset?.url && { image: [post.mainImage.asset.url] }),
    description: post?.excerpt,
  };
}

export function faqPageJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbListJsonLd(items: { label: string; href: string }[]) {
  const siteUrl = getSiteUrl();
  const hasHome = items.some((item) => item.href === "/" || item.href === siteUrl);
  const formattedItems = hasHome
    ? items
    : [{ label: "Ana Sayfa", href: "/" }, ...items];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: formattedItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href.startsWith("http") ? item.href : `${siteUrl}${item.href}`,
    })),
  };
}

export function serviceJsonLd(service?: Service) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service?.title,
    url: `${siteUrl}/hizmetler/${service?.slug?.current}`,
    ...(service?.mainImage?.asset?.url && { image: service.mainImage.asset.url }),
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: "Sed İç Mimarlık",
      url: siteUrl,
    },
  };
}

export function projectJsonLd(project?: Project) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project?.title,
    url: `${siteUrl}/projeler/${project?.slug?.current}`,
    ...(project?.mainImage?.asset?.url && { image: project.mainImage.asset.url }),
    creator: {
      "@type": "HomeAndConstructionBusiness",
      name: "Sed İç Mimarlık",
      url: siteUrl,
    },
  };
}
