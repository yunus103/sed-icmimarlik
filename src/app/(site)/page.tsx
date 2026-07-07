import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import {
  homePageQuery,
  serviceListQuery,
  projectListQuery,
  blogListQuery,
  layoutQuery,
} from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { TestimonialSection } from "@/components/home/TestimonialSection";
import { BlogSection } from "@/components/home/BlogSection";
import { CtaSection } from "@/components/home/CtaSection";
import { HomePage as HomePageType, Service, Project, BlogPost, SiteSettings, Navigation } from "@/types";

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch<HomePageType>(homePageQuery, {}, { next: { tags: ["home"] } });
  return buildMetadata({
    canonicalPath: "/",
    pageSeo: data?.seo,
  });
}

export default async function HomePage() {
  // Fetch home page data, fallbacks, and layout settings in parallel
  const [data, fallbackServices, fallbackProjects, fallbackPosts, layoutData] = await Promise.all([
    client.fetch<HomePageType>(homePageQuery, {}, { next: { tags: ["home"] } }),
    client.fetch<Service[]>(serviceListQuery, {}, { next: { tags: ["service:list"] } }),
    client.fetch<Project[]>(projectListQuery, {}, { next: { tags: ["project:list"] } }),
    client.fetch<BlogPost[]>(blogListQuery, {}, { next: { tags: ["blog:list"] } }),
    client.fetch<{ settings: SiteSettings; navigation: Navigation }>(layoutQuery, {}, { next: { tags: ["layout"] } }),
  ]);

  // Determine which items to display (Sanity references or dynamic fallbacks)
  const servicesToDisplay = data?.featuredServices && data.featuredServices.length > 0
    ? data.featuredServices
    : fallbackServices;

  const projectsToDisplay = data?.featuredProjects && data.featuredProjects.length > 0
    ? data.featuredProjects
    : fallbackProjects;

  const postsToDisplay = data?.featuredPosts && data.featuredPosts.length > 0
    ? data.featuredPosts
    : fallbackPosts;

  const settings = layoutData?.settings;

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section */}
      <HeroSection data={data} />

      {/* 2. Hakkımızda Bölümü */}
      <AboutSection
        title={data?.aboutTitle}
        subtitle={data?.aboutSubtitle}
        text={data?.aboutText}
        image={data?.aboutImage}
        ctaLabel={data?.aboutCtaLabel}
        ctaLink={data?.aboutCtaLink}
      />

      {/* 3. Öne Çıkan Hizmetler */}
      <ServicesSection
        title={data?.servicesTitle}
        subtitle={data?.servicesSubtitle}
        services={servicesToDisplay}
      />

      {/* 4. Öne Çıkan Projeler */}
      {settings?.enableProjects !== false && (
        <ProjectsSection
          title={data?.projectsTitle}
          subtitle={data?.projectsSubtitle}
          projects={projectsToDisplay}
        />
      )}

      {/* 5. Biz Nasıl Çalışıyoruz (Süreç) */}
      <ProcessSection
        title={data?.processTitle}
        subtitle={data?.processSubtitle}
        steps={data?.processSteps}
      />

      {/* 6. Referanslar / Müşteri Yorumları */}
      <TestimonialSection
        title={data?.testimonialTitle}
        testimonials={data?.testimonials}
      />

      {/* 7. Son Blog Yazıları */}
      <BlogSection
        title={data?.blogTitle}
        subtitle={data?.blogSubtitle}
        posts={postsToDisplay}
      />

      {/* 8. Harekete Geçirici Alan (CTA) */}
      <CtaSection
        title={data?.ctaTitle}
        subtitle={data?.ctaSubtitle}
        buttonLabel={data?.ctaButtonLabel}
        buttonLink={data?.ctaButtonLink}
        settings={settings}
      />
    </div>
  );
}
