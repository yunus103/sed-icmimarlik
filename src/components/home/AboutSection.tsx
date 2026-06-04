/* eslint-disable @typescript-eslint/no-explicit-any */
import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import { RichText } from "@/components/ui/RichText";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SanityImage as SanityImageType } from "@/types";

interface AboutSectionProps {
  title?: string;
  subtitle?: string;
  text?: any[];
  image?: SanityImageType;
  ctaLabel?: string;
  ctaLink?: string;
}

export function AboutSection({
  title,
  subtitle,
  text,
  image,
  ctaLabel,
  ctaLink,
}: AboutSectionProps) {
  const displayTitle = title || "Hakkımızda";
  const displayCtaLabel = ctaLabel || "Daha Fazla Keşfet";
  const displayCtaLink = ctaLink || "/hakkimizda";

  return (
    <section className="py-24 md:py-36 bg-background overflow-hidden relative border-b border-border/30">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Typography (6 Columns) */}
          <div className="lg:col-span-6 space-y-8">
            <FadeIn direction="up" duration={0.6}>
              <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] text-[#5f5e5e] uppercase block">
                {displayTitle}
              </span>
              {subtitle && (
                <h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-tight mt-3 text-foreground uppercase">
                  {subtitle}
                </h2>
              )}
            </FadeIn>

            {/* Content body wrapped in thin drafting divider */}
            <div className="border-l border-[#D6CEC3] pl-6 md:pl-8 space-y-6">
              {text && text.length > 0 && (
                <FadeIn delay={0.2} duration={0.6}>
                  <RichText value={text} className="text-foreground/80 leading-relaxed font-sans text-sm md:text-base max-w-2xl" />
                </FadeIn>
              )}

              <FadeIn delay={0.35} className="pt-2">
                <Button 
                  size="lg" 
                  render={<Link href={displayCtaLink} />}
                  className="bg-[#111111] hover:bg-black text-white rounded-none border border-transparent px-8 py-4 h-auto text-[10px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 active:translate-y-px"
                >
                  {displayCtaLabel}
                </Button>
              </FadeIn>
            </div>
          </div>

          {/* Right Column: Architectural Image (6 Columns) */}
          {image && (
            <div className="lg:col-span-6 relative">
              <FadeIn direction="left" delay={0.4} className="relative w-full">
                {/* Asymmetric offset framing border */}
                <div className="absolute -bottom-4 -left-4 w-full h-full border border-[#D6CEC3] pointer-events-none z-0" />
                <div className="relative aspect-[4/3] sm:aspect-[3/2] lg:aspect-[3/2] overflow-hidden bg-secondary z-10 rounded-none shadow-none">
                  <SanityImage
                    image={image}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                </div>
              </FadeIn>
            </div>
          )}

        </div>
      </div>
      
      {/* Editorial geometric lines on background */}
      <div className="absolute left-6 md:left-12 top-0 bottom-0 w-[1px] bg-border/20 pointer-events-none z-0" />
      <div className="absolute right-6 md:right-12 top-0 bottom-0 w-[1px] bg-border/20 pointer-events-none z-0" />
    </section>
  );
}
