import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { servicesPageQuery, serviceListQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { SanityImage } from "@/components/ui/SanityImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { AnimateGroup } from "@/components/ui/AnimateGroup";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ServicesPage as ServicesPageType, Service } from "@/types";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await client.fetch<ServicesPageType>(servicesPageQuery, {}, { next: { tags: ["servicesPage"] } });
  return buildMetadata({
    title: pageData?.heroTitle || pageData?.pageTitle || "Hizmetlerimiz",
    canonicalPath: "/hizmetler",
    pageSeo: pageData?.seo,
  });
}

export default async function ServicesHubPage() {
  const [services, pageData] = await Promise.all([
    client.fetch<Service[]>(serviceListQuery, {}, { next: { tags: ["services"] } }),
    client.fetch<ServicesPageType>(servicesPageQuery, {}, { next: { tags: ["servicesPage"] } }),
  ]);

  return (
    <div className="flex flex-col gap-0 pb-24 bg-background">
      {/* Page Hero */}
      <PageHero
        title={pageData?.heroTitle || pageData?.pageTitle || "Hizmetlerimiz"}
        subtitle={pageData?.heroSubtitle || pageData?.pageSubtitle || "Size özel sunduğumuz profesyonel çözümler."}
        backgroundImage={pageData?.heroImage}
        className="[&_h1]:font-serif [&_h1]:uppercase [&_h1]:tracking-widest"
      />

      <div className="container mx-auto px-6 md:px-12 py-24 relative z-10 space-y-32">
        {/* Tasarım & Projelendirme Section */}
        <section className="space-y-12">
          <div className="space-y-4 text-center md:text-left">
            <span className="text-[10px] font-semibold tracking-[0.25em] text-[#5f5e5e] uppercase block">
              Konsept & Görselleştirme
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground uppercase tracking-widest relative inline-block pb-3">
              Tasarım ve Projelendirme
              <span className="absolute bottom-0 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 w-24 h-0.5 bg-[#D6CEC3]" />
            </h2>
            <p className="text-muted-foreground font-sans text-sm tracking-wider max-w-xl">
              Hayalinizdeki mekanları estetik, ergonomi ve özgünlük ilkeleri doğrultusunda projelendiriyor, hayata geçiriyoruz.
            </p>
          </div>

          {services && services.filter((s) => !s.category || s.category === "design").length > 0 ? (
            <AnimateGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
              {services
                .filter((s) => !s.category || s.category === "design")
                .map((service: Service, index: number) => (
                  <Link key={service.slug?.current} href={`/hizmetler/${service.slug?.current}`} className="group block">
                    <article className="bg-transparent overflow-hidden h-full flex flex-col justify-between rounded-none shadow-none border-0 transition-all duration-300 group-hover:-translate-y-1">
                      {service.mainImage && (
                        <div className="relative aspect-[3/2] overflow-hidden bg-[#efeeeb] border-b border-border/30">
                          <SanityImage
                            image={service.mainImage}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          />
                        </div>
                      )}
                      
                      <div className="pt-6 flex-grow flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[8px] tracking-[0.3em] font-semibold text-[#5f5e5e] uppercase">
                              Tasarım
                            </span>
                            <div className="w-1.5 h-1.5 bg-[#D6CEC3] rounded-none" />
                            <span className="text-[8px] tracking-[0.3em] font-semibold text-[#5f5e5e] uppercase">
                              {(index + 1).toString().padStart(2, "0")}
                            </span>
                          </div>
                          
                          <h2 className="font-serif text-xl text-foreground group-hover:text-[#5f5e5e] transition-colors duration-300 leading-snug">
                            {service.title}
                          </h2>
                        </div>
                        
                        <div className="pt-2 flex items-center gap-2.5">
                          <span className="text-[10px] font-semibold tracking-[0.2em] text-[#111111] uppercase block group-hover:opacity-80 transition-opacity">
                            Detayları İncele
                          </span>
                          <span className="text-[#111111] group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
            </AnimateGroup>
          ) : (
            <FadeIn>
              <p className="text-muted-foreground font-sans text-sm py-8">Henüz bu kategoride eklenmiş bir hizmet bulunmuyor.</p>
            </FadeIn>
          )}
        </section>

        {/* Uygulama & İnce İşler Section */}
        <section className="space-y-12 pt-8 border-t border-border/20">
          <div className="space-y-4 text-center md:text-left">
            <span className="text-[10px] font-semibold tracking-[0.25em] text-[#5f5e5e] uppercase block">
              Uygulama & Detay Çözümleri
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground uppercase tracking-widest relative inline-block pb-3">
              Uygulama ve İnce İşler
              <span className="absolute bottom-0 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 w-24 h-0.5 bg-[#D6CEC3]" />
            </h2>
            <p className="text-muted-foreground font-sans text-sm tracking-wider max-w-xl">
              Projelerimizin inşaat, imalat ve uygulama aşamalarını en ince detayına kadar büyük bir titizlikle yürütüyoruz.
            </p>
          </div>

          {services && services.filter((s) => s.category === "execution").length > 0 ? (
            <AnimateGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
              {services
                .filter((s) => s.category === "execution")
                .map((service: Service, index: number) => (
                  <Link key={service.slug?.current} href={`/hizmetler/${service.slug?.current}`} className="group block">
                    <article className="bg-transparent overflow-hidden h-full flex flex-col justify-between rounded-none shadow-none border-0 transition-all duration-300 group-hover:-translate-y-1">
                      {service.mainImage && (
                        <div className="relative aspect-[3/2] overflow-hidden bg-[#efeeeb] border-b border-border/30">
                          <SanityImage
                            image={service.mainImage}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          />
                        </div>
                      )}
                      
                      <div className="pt-6 flex-grow flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[8px] tracking-[0.3em] font-semibold text-[#5f5e5e] uppercase">
                              Uygulama
                            </span>
                            <div className="w-1.5 h-1.5 bg-[#D6CEC3] rounded-none" />
                            <span className="text-[8px] tracking-[0.3em] font-semibold text-[#5f5e5e] uppercase">
                              {(index + 1).toString().padStart(2, "0")}
                            </span>
                          </div>
                          
                          <h2 className="font-serif text-xl text-foreground group-hover:text-[#5f5e5e] transition-colors duration-300 leading-snug">
                            {service.title}
                          </h2>
                        </div>
                        
                        <div className="pt-2 flex items-center gap-2.5">
                          <span className="text-[10px] font-semibold tracking-[0.2em] text-[#111111] uppercase block group-hover:opacity-80 transition-opacity">
                            Detayları İncele
                          </span>
                          <span className="text-[#111111] group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
            </AnimateGroup>
          ) : (
            <FadeIn>
              <p className="text-muted-foreground font-sans text-sm py-8">Henüz bu kategoride eklenmiş bir hizmet bulunmuyor.</p>
            </FadeIn>
          )}
        </section>

        {/* Dynamic High-Contrast Editorial CTA Section */}
        {pageData?.ctaLabel && pageData?.ctaLink && (
          <FadeIn className="bg-[#2B2B2B] text-[#F7F5F2] p-12 md:p-20 border border-[#D6CEC3]/10 text-center max-w-4xl mx-auto rounded-none shadow-none space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] font-semibold tracking-[0.25em] text-[#D6CEC3]/70 uppercase block">
                Bize Ulaşın
              </span>
              <h3 className="font-serif text-2xl md:text-4xl text-white uppercase tracking-tight">
                Daha Fazla Bilgi mi İstiyorsunuz?
              </h3>
              <p className="font-sans text-xs md:text-sm tracking-wider text-[#F7F5F2]/70 leading-relaxed uppercase max-w-xl mx-auto">
                Size en uygun mimari çözümleri sunmak ve profesyonel destek almak için ekibimizle hemen iletişime geçin.
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
