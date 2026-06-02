import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import { AnimateGroup } from "@/components/ui/AnimateGroup";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Service } from "@/types";

interface ServicesSectionProps {
  title?: string;
  subtitle?: string;
  services?: Service[];
}

export function ServicesSection({
  title,
  subtitle,
  services = [],
}: ServicesSectionProps) {
  const displayTitle = title || "Hizmetlerimiz";
  const displaySubtitle = subtitle || "Öne Çıkan Hizmetlerimiz";

  return (
    <section className="py-24 md:py-36 bg-[#efeeeb] overflow-hidden relative border-b border-border/30">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="max-w-4xl mb-20 space-y-4">
          <FadeIn direction="up" duration={0.6}>
            <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] text-[#5f5e5e] uppercase block">
              {displayTitle}
            </span>
            <h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-tight mt-3 text-foreground uppercase">
              {displaySubtitle}
            </h2>
          </FadeIn>
        </div>

        {/* Services Grid */}
        {services && services.length > 0 ? (
          <div className="space-y-16">
            <AnimateGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {services.slice(0, 3).map((service: Service) => (
                <Link 
                  key={service.slug?.current} 
                  href={`/hizmetler/${service.slug?.current}`} 
                  className="group block relative"
                >
                  <article className="bg-transparent overflow-hidden h-full flex flex-col justify-between rounded-none shadow-none border-0 group-hover:-translate-y-1 transition-all duration-300">
                    
                    {/* Architectural Portrait / Cinematic Aspect Image */}
                    {service.mainImage && (
                      <div className="relative aspect-[3/2] overflow-hidden bg-background border-b border-border/30">
                        <SanityImage
                          image={service.mainImage}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      </div>
                    )}

                    {/* Metadata & Title Block */}
                    <div className="pt-6 flex-grow flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[8px] tracking-[0.3em] font-semibold text-[#5f5e5e] uppercase">
                            Hizmet
                          </span>
                          <div className="w-1.5 h-1.5 bg-[#D6CEC3] rounded-none" />
                          <span className="text-[8px] tracking-[0.3em] font-semibold text-[#5f5e5e] uppercase">
                            Sed
                          </span>
                        </div>
                        
                        <h3 className="font-serif text-xl text-foreground group-hover:text-[#5f5e5e] transition-colors duration-300 leading-snug">
                          {service.title}
                        </h3>
                      </div>

                      {/* Editorial underwriting line */}
                      <div className="pt-2 flex items-center gap-2.5">
                        <span className="text-[10px] font-semibold tracking-[0.2em] text-[#111111] uppercase block relative group-hover:opacity-80 transition-opacity">
                          Detayları İncele
                        </span>
                        <span className="text-[#111111] group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </AnimateGroup>
            
            {/* Minimal Underlined Trigger Button */}
            <FadeIn delay={0.2} className="text-center pt-4">
              <Button 
                variant="outline" 
                size="lg" 
                render={<Link href="/hizmetler" />}
                className="bg-transparent border-black hover:bg-black hover:text-white text-black rounded-none px-8 py-4 h-auto text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300"
              >
                Tüm Hizmet Alanlarını Gör
              </Button>
            </FadeIn>
          </div>
        ) : (
          <FadeIn>
            <p className="text-muted-foreground font-sans text-sm text-center py-12">Henüz öne çıkarılmış bir hizmet bulunmuyor.</p>
          </FadeIn>
        )}

      </div>

      {/* Editorial geometric lines */}
      <div className="absolute left-6 md:left-12 top-0 bottom-0 w-[1px] bg-border/20 pointer-events-none z-0" />
      <div className="absolute right-6 md:right-12 top-0 bottom-0 w-[1px] bg-border/20 pointer-events-none z-0" />
    </section>
  );
}
