import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { projectsPageQuery, projectListQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { SanityImage } from "@/components/ui/SanityImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { AnimateGroup } from "@/components/ui/AnimateGroup";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ProjectsPage as ProjectsPageType, Project, SiteSettings } from "@/types";

export async function generateMetadata(): Promise<Metadata> {
  const result = await client.fetch<{ page: ProjectsPageType; settings: SiteSettings }>(
    projectsPageQuery,
    {},
    { next: { tags: ["projectsPage", "layout"] } }
  );
  const pageData = result?.page;
  return buildMetadata({
    title: pageData?.heroTitle || pageData?.pageTitle || "Projelerimiz",
    canonicalPath: "/projeler",
    pageSeo: pageData?.seo,
  });
}

export default async function ProjectsHubPage() {
  const [projects, result] = await Promise.all([
    client.fetch<Project[]>(projectListQuery, {}, { next: { tags: ["projects"] } }),
    client.fetch<{ page: ProjectsPageType; settings: SiteSettings }>(
      projectsPageQuery,
      {},
      { next: { tags: ["projectsPage", "layout"] } }
    ),
  ]);

  const pageData = result?.page;
  const settings = result?.settings;

  if (settings?.enableProjects === false) {
    redirect("/");
  }

  return (
    <div className="flex flex-col gap-0 pb-24 bg-background">
      {/* Page Hero */}
      <PageHero
        title={pageData?.heroTitle || pageData?.pageTitle || "Projelerimiz"}
        subtitle={pageData?.heroSubtitle || pageData?.pageSubtitle || "Bugüne kadar başarıyla tamamladığımız çalışmalar."}
        backgroundImage={pageData?.heroImage}
        className="[&_h1]:font-serif [&_h1]:uppercase [&_h1]:tracking-widest"
      />

      <div className="container mx-auto px-6 md:px-12 py-24 relative z-10 space-y-24">
        
        {projects && projects.length > 0 ? (
          <AnimateGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {projects.map((project: Project, index: number) => {
              // Apply staggered asymmetric offset flow to break grid rigidity
              const isMiddle = index % 3 === 1;
              const isLast = index % 3 === 2;

              return (
                <div 
                  key={project.slug?.current} 
                  className={isMiddle ? "md:translate-y-8 lg:translate-y-12" : isLast ? "lg:translate-y-6" : ""}
                >
                  <Link href={`/projeler/${project.slug?.current}`} className="group block">
                    <article className="space-y-5 transition-all duration-300">
                      
                      {project.mainImage && (
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#efeeeb] border border-border/10">
                          <div className="absolute inset-0 border border-transparent group-hover:border-[#F7F5F2]/40 z-20 transition-colors duration-500 pointer-events-none" />
                          <SanityImage
                            image={project.mainImage}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                          />
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 z-10 transition-all duration-500" />
                        </div>
                      )}
                      
                      <div className="space-y-1 pt-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] tracking-[0.25em] font-semibold text-[#5f5e5e] uppercase">
                            Sed Portfolio
                          </span>
                          <span className="text-[10px] tracking-wider font-mono text-muted-foreground">
                            {index < 9 ? `0${index + 1}` : index + 1}
                          </span>
                        </div>
                        
                        <h2 className="font-serif text-lg text-foreground group-hover:text-[#5f5e5e] transition-colors duration-300 leading-snug">
                          {project.title}
                        </h2>

                        <div className="pt-2 flex items-center gap-2">
                          <span className="text-[9px] font-semibold tracking-[0.2em] text-[#111111] uppercase block group-hover:opacity-85 transition-opacity">
                            Projeyi İncele
                          </span>
                          <span className="text-[#111111] text-xs group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </div>
              );
            })}
          </AnimateGroup>
        ) : (
          <FadeIn>
            <p className="text-muted-foreground font-sans text-sm text-center py-16">Henüz eklenmiş bir proje bulunmuyor.</p>
          </FadeIn>
        )}

        {/* Dynamic High-Contrast Editorial CTA Section */}
        {pageData?.ctaLabel && pageData?.ctaLink && (
          <FadeIn className="bg-[#2B2B2B] text-[#F7F5F2] p-12 md:p-20 border border-[#D6CEC3]/10 text-center max-w-4xl mx-auto rounded-none shadow-none space-y-8 !mt-36">
            <div className="space-y-4">
              <span className="text-[10px] font-semibold tracking-[0.25em] text-[#D6CEC3]/70 uppercase block">
                Projelerimiz
              </span>
              <h3 className="font-serif text-2xl md:text-4xl text-white uppercase tracking-tight">
                Hayalinizdeki Mekanı Birlikte Tasarlayalım
              </h3>
              <p className="font-sans text-xs md:text-sm tracking-wider text-[#F7F5F2]/70 leading-relaxed uppercase max-w-xl mx-auto">
                Birlikte eşsiz mimari ve tasarım hikayeleri yazmak için ekibimizle konuşun.
              </p>
            </div>
            
            <div className="pt-2">
              <Button 
                size="lg" 
                render={<Link href={pageData.ctaLink} />}
                className="bg-[#F7F5F2] hover:bg-white text-black hover:text-black rounded-none border border-transparent px-8 py-4 h-auto text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300"
              >
                {pageData.ctaLabel}
              </Button>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
}
