import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SanityImage as SanityImageType, CtaLink } from "@/types";

interface HeroSectionProps {
  data: {
    heroImage?: SanityImageType;
    heroTitle?: string;
    heroSubtitle?: string;
    heroCtaLabel?: string;
    heroCtaLink?: CtaLink;
  };
}

export function resolveLink(linkData?: CtaLink) {
  if (!linkData) return "/";
  if (linkData.linkType === "manual") return linkData.manual || "/";
  
  const ref = linkData.internal;
  if (!ref || !ref._type) return "/";
  
  switch (ref._type) {
    case "service": return `/hizmetler/${ref.slug}`;
    case "project": return `/projeler/${ref.slug}`;
    case "blogPost": return `/${ref.slug}`;
    case "aboutPage": return `/hakkimizda`;
    case "contactPage": return `/iletisim`;
    default: return "/";
  }
}

export function HeroSection({ data }: HeroSectionProps) {
  return (
    <section className="relative h-screen min-h-[650px] w-full flex items-center bg-black overflow-hidden">
      {/* Background Image & Overlay */}
      {data?.heroImage && (
        <div className="absolute inset-0 z-0 select-none">
          <SanityImage
            image={data.heroImage}
            fill
            sizes="100vw"
            quality={95}
            className="object-cover opacity-80 scale-[1.02] filter contrast-[1.05] brightness-95 transition-all duration-700"
            priority
          />
          {/* Subtle warm desaturated overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
        </div>
      )}

      {/* Main Structural Editorial Grid */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 w-full h-full flex flex-col justify-end pb-24 md:pb-32">
        <div className="max-w-4xl space-y-8">
          
          {/* Subtle drafting line overline */}
          <FadeIn direction="up" duration={0.6} delay={0.1}>
            <div className="flex items-center gap-4">
              <span className="text-[10px] md:text-xs font-semibold tracking-[0.3em] text-[#D6CEC3] uppercase">
                Sed İç Mimarlık
              </span>
              <div className="h-[1px] w-12 bg-[#D6CEC3]/30" />
              <span className="text-[10px] md:text-xs font-semibold tracking-[0.3em] text-[#D6CEC3] uppercase">
                Studio
              </span>
            </div>
          </FadeIn>

          {/* giant Bodoni Moda headline */}
          <FadeIn direction="up" duration={0.8} delay={0.25}>
            {data?.heroTitle && (
              <h1 className="font-serif text-4xl sm:text-6xl md:text-8xl tracking-tight leading-[1.02] text-white uppercase">
                {data.heroTitle}
              </h1>
            )}
          </FadeIn>

          {/* Technical airy subtitle */}
          <FadeIn direction="up" duration={0.8} delay={0.4}>
            {data?.heroSubtitle && (
              <p className="font-sans text-xs sm:text-sm md:text-base tracking-[0.18em] leading-relaxed text-white/70 uppercase max-w-xl">
                {data.heroSubtitle}
              </p>
            )}
          </FadeIn>

          {/* Understated solid sharp button */}
          <FadeIn direction="up" duration={0.8} delay={0.55} className="pt-4">
            {data?.heroCtaLabel && data?.heroCtaLink && (
              <Button 
                size="lg"
                render={<Link href={resolveLink(data.heroCtaLink)} />}
                className="bg-white text-black hover:bg-white/90 border border-transparent rounded-none px-8 py-5 h-auto text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 active:translate-y-px"
              >
                {data.heroCtaLabel}
              </Button>
            )}
          </FadeIn>
        </div>
      </div>

      {/* Decorative vertical drafting lines on left & right margins for editorial grid weight */}
      <div className="absolute left-6 md:left-12 top-0 bottom-0 w-[1px] bg-white/5 hidden sm:block z-0 pointer-events-none" />
      <div className="absolute right-6 md:right-12 top-0 bottom-0 w-[1px] bg-white/5 hidden sm:block z-0 pointer-events-none" />
    </section>
  );
}
