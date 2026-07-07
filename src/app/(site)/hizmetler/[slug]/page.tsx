import { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { serviceBySlugQuery, serviceListQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { RichText } from "@/components/ui/RichText";
import { SanityImage } from "@/components/ui/SanityImage";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/layout/PageHero";
import Link from "next/link";

import { Service, SubService } from "@/types";
import { JsonLd, serviceJsonLd } from "@/components/seo/JsonLd";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const services = await client.fetch(serviceListQuery, {}, { next: { tags: ["service:list"] } });
  return (services || []).map((s: Service) => ({ slug: s.slug?.current }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await client.fetch(serviceBySlugQuery, { slug }, { next: { tags: [`service:detail:${slug}`] } });
  if (!service) return {};
  return buildMetadata({
    title: service.title,
    canonicalPath: `/hizmetler/${slug}`,
    pageSeo: service.seo,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = await client.fetch(
    serviceBySlugQuery,
    { slug },
    { next: { tags: [`service:detail:${slug}`] } }
  );

  if (!service) notFound();

  return (
    <>
      <JsonLd data={serviceJsonLd(service)} />
      
      {/* Page Hero */}
      <PageHero
        title={service.title}
        subtitle={
          service.category === "design"
            ? "Tasarım ve Projelendirme"
            : "Uygulama ve İnce İşler"
        }
        backgroundImage={service.mainImage}
        className="[&_h1]:font-serif [&_h1]:uppercase [&_h1]:tracking-widest"
        breadcrumbs={[
          { label: "Hizmetler", href: "/hizmetler" },
          { label: service.title, href: `/hizmetler/${slug}`, active: true }
        ]}
      />

      <div className="container mx-auto px-6 md:px-12 py-20 relative z-10 space-y-24">
        {/* Back Button */}
        <FadeIn direction="up">
          <Button variant="ghost" className="mb-4 -ml-2 text-xs font-semibold tracking-widest uppercase hover:bg-muted" render={<Link href="/hizmetler" />}>
            ← Hizmetlere Dön
          </Button>
        </FadeIn>

        {/* Intro Section */}
        {service.body && service.body.length > 0 && (
          <FadeIn delay={0.1} className="max-w-4xl mx-auto border-l-2 border-[#D6CEC3] pl-6 md:pl-10 py-2">
            <div className="prose prose-neutral max-w-none text-[#5f5e5e] font-sans text-sm md:text-base leading-relaxed tracking-wide">
              <RichText value={service.body} />
            </div>
          </FadeIn>
        )}

        {/* Sub-services / Alt Bölümler (Alternating Layout) */}
        {service.subServices && service.subServices.length > 0 && (
          <div className="space-y-24 md:space-y-36 pt-16">
            {service.subServices.map((sub: SubService, index: number) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={sub.title || index} 
                  className={`flex flex-col md:flex-row items-center gap-12 lg:gap-20 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Image Column */}
                  {sub.image && (
                    <FadeIn delay={0.15} className="w-full md:w-1/2">
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#efeeeb] border border-border/30">
                        <SanityImage
                          image={sub.image}
                          fill
                          sizes="(max-width: 768px) 100vw, 600px"
                          className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                        />
                      </div>
                    </FadeIn>
                  )}

                  {/* Content Column */}
                  <FadeIn delay={0.2} className="w-full md:w-1/2 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-4xl md:text-5xl font-light text-[#D6CEC3] tracking-widest leading-none">
                        {(index + 1).toString().padStart(2, "0")}
                      </span>
                      <div className="h-[1px] w-8 bg-[#D6CEC3]" />
                    </div>
                    <h2 className="font-serif text-2xl md:text-3xl text-foreground uppercase tracking-wider">
                      {sub.title}
                    </h2>
                    {sub.description && (
                      <p className="text-muted-foreground font-sans text-sm md:text-base leading-relaxed tracking-wide whitespace-pre-line">
                        {sub.description}
                      </p>
                    )}
                  </FadeIn>
                </div>
              );
            })}
          </div>
        )}

        {/* Dynamic CTA at detail page too */}
        <FadeIn className="bg-[#2B2B2B] text-[#F7F5F2] p-12 md:p-20 border border-[#D6CEC3]/10 text-center max-w-4xl mx-auto rounded-none shadow-none space-y-8 pt-16 mt-16">
          <div className="space-y-4">
            <span className="text-[10px] font-semibold tracking-[0.25em] text-[#D6CEC3]/70 uppercase block">
              Bize Ulaşın
            </span>
            <h3 className="font-serif text-2xl md:text-4xl text-white uppercase tracking-tight">
              Projeniz İçin Fikir Alın
            </h3>
            <p className="font-sans text-xs md:text-sm tracking-wider text-[#F7F5F2]/70 leading-relaxed uppercase max-w-xl mx-auto">
              {service.title} alanında profesyonel ekibimizle çalışmak veya detaylı bilgi almak için hemen bizimle iletişime geçin.
            </p>
          </div>
          
          <div className="pt-2">
            <Button 
              size="lg" 
              render={<Link href="/iletisim" />}
              className="bg-[#F7F5F2] hover:bg-white text-black hover:text-black rounded-none border border-transparent px-8 py-4 h-auto text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300"
            >
              İLETİŞİME GEÇİN
            </Button>
          </div>
        </FadeIn>
      </div>
    </>
  );
}
