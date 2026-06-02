import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import { AnimateGroup } from "@/components/ui/AnimateGroup";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Project } from "@/types";

interface ProjectsSectionProps {
  title?: string;
  subtitle?: string;
  projects?: Project[];
}

export function ProjectsSection({
  title,
  subtitle,
  projects = [],
}: ProjectsSectionProps) {
  const displayTitle = title || "Projelerimiz";
  const displaySubtitle = subtitle || "Öne Çıkan Projelerimiz";

  return (
    <section className="py-24 md:py-36 bg-background overflow-hidden relative border-b border-border/30">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="max-w-4xl mb-24 space-y-4">
          <FadeIn direction="up" duration={0.6}>
            <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] text-[#5f5e5e] uppercase block">
              {displayTitle}
            </span>
            <h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-tight mt-3 text-foreground uppercase">
              {displaySubtitle}
            </h2>
          </FadeIn>
        </div>

        {/* Asymmetrical Portfolio Grid */}
        {projects && projects.length > 0 ? (
          <div className="space-y-20">
            <AnimateGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
              {projects.slice(0, 3).map((project: Project, index: number) => {
                // Apply staggered offsets to break vertical grid rigidity (Asymmetric flow)
                const isMiddle = index === 1;
                const isLast = index === 2;

                return (
                  <div 
                    key={project.slug?.current}
                    className={isMiddle ? "md:translate-y-8 lg:translate-y-12" : isLast ? "lg:translate-y-6" : ""}
                  >
                    <Link 
                      href={`/projeler/${project.slug?.current}`} 
                      className="group block relative"
                    >
                      <article className="space-y-5">
                        {/* Image Canvas with 0px border-radius and offset layout */}
                        {project.mainImage ? (
                          <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary border border-border/10">
                            {/* Delicate thin drafting line border that appears on hover */}
                            <div className="absolute inset-0 border border-transparent group-hover:border-[#F7F5F2]/40 z-20 transition-colors duration-500 pointer-events-none" />
                            
                            <SanityImage
                              image={project.mainImage}
                              fill
                              sizes="(max-width: 768px) 100vw, 33vw"
                              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                            />
                            
                            {/* Luxury, subtle desaturated overlay on hover */}
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 z-10 transition-all duration-500" />
                          </div>
                        ) : (
                          <div className="aspect-[4/3] w-full bg-[#efeeeb] flex items-center justify-center p-6 text-center border">
                            <h3 className="font-serif text-lg text-foreground line-clamp-2">{project.title}</h3>
                          </div>
                        )}

                        {/* Text Metadata Details Block below the image */}
                        <div className="space-y-1 pt-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] tracking-[0.25em] font-semibold text-[#5f5e5e] uppercase">
                              Sed Portfolio
                            </span>
                            <span className="text-[10px] tracking-wider font-mono text-muted-foreground">
                              0{index + 1}
                            </span>
                          </div>
                          
                          <h3 className="font-serif text-lg text-foreground group-hover:text-[#5f5e5e] transition-colors duration-300 leading-snug">
                            {project.title}
                          </h3>

                          {/* Technical Underline link indicator */}
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
            
            {/* Minimal Borderless Outline Button */}
            <FadeIn delay={0.2} className="text-center pt-16">
              <Button 
                variant="outline" 
                size="lg" 
                render={<Link href="/projeler" />}
                className="bg-[#111111] hover:bg-black text-white border-transparent rounded-none px-8 py-4 h-auto text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300"
              >
                Tüm Projeleri İncele
              </Button>
            </FadeIn>
          </div>
        ) : (
          <FadeIn>
            <p className="text-muted-foreground font-sans text-sm text-center py-12">Henüz öne çıkarılmış bir proje bulunmuyor.</p>
          </FadeIn>
        )}

      </div>

      {/* Editorial geometric lines */}
      <div className="absolute left-6 md:left-12 top-0 bottom-0 w-[1px] bg-border/20 pointer-events-none z-0" />
      <div className="absolute right-6 md:right-12 top-0 bottom-0 w-[1px] bg-border/20 pointer-events-none z-0" />
    </section>
  );
}
