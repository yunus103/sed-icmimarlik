import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SiteSettings } from "@/types";
import { RiMailLine, RiPhoneLine, RiMapPinLine } from "react-icons/ri";

interface CtaSectionProps {
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
  buttonLink?: string;
  settings?: SiteSettings;
}

export function CtaSection({
  title,
  subtitle,
  buttonLabel,
  buttonLink,
  settings,
}: CtaSectionProps) {
  const displayTitle = title || "Birlikte Çalışalım";
  const displaySubtitle = subtitle || "Projeleriniz ve iş birlikleri için iletişime geçin.";
  const displayButtonLabel = buttonLabel || "İletişime Geçin";
  const displayButtonLink = buttonLink || "/iletisim";

  const contact = settings?.contactInfo;

  return (
    <section className="bg-[#2B2B2B] text-[#F7F5F2] py-24 md:py-36 overflow-hidden relative border-t border-[#D6CEC3]/10">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: CTA Title & Button (7 Columns) */}
          <div className="lg:col-span-7 space-y-8">
            <FadeIn direction="up" duration={0.6}>
              <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] text-[#D6CEC3]/70 uppercase block">
                Bize Ulaşın
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight mt-3 uppercase text-white">
                {displayTitle}
              </h2>
              <p className="font-sans text-xs sm:text-sm tracking-wider text-[#F7F5F2]/70 leading-relaxed uppercase mt-4 max-w-xl">
                {displaySubtitle}
              </p>
            </FadeIn>

            <FadeIn delay={0.25} className="pt-2">
              <Button 
                size="lg" 
                render={<Link href={displayButtonLink} />}
                className="bg-[#F7F5F2] hover:bg-white text-black rounded-none border border-transparent px-8 py-5 h-auto text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 active:translate-y-px"
              >
                {displayButtonLabel}
              </Button>
            </FadeIn>
          </div>

          {/* Right Column: Direct Contact & Social Metadata (5 Columns) */}
          <div className="lg:col-span-5 relative border-l border-[#D6CEC3]/20 pl-8 lg:pl-16 py-4 space-y-8">
            <FadeIn direction="left" delay={0.3} className="space-y-6">
              <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D6CEC3]">
                Stüdyo Koordinatları
              </h3>
              
              <div className="space-y-4 pt-2">
                {contact?.phone && (
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-center gap-4 text-xs sm:text-sm tracking-wider text-[#F7F5F2]/80 hover:text-[#F7F5F2] transition-colors"
                  >
                    <RiPhoneLine size={18} className="text-[#D6CEC3]" />
                    <span>{contact.phone}</span>
                  </a>
                )}
                
                {contact?.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-4 text-xs sm:text-sm tracking-wider text-[#F7F5F2]/80 hover:text-[#F7F5F2] transition-colors"
                  >
                    <RiMailLine size={18} className="text-[#D6CEC3]" />
                    <span>{contact.email}</span>
                  </a>
                )}

                {contact?.address && (
                  <div className="flex items-start gap-4 text-xs sm:text-sm tracking-wider text-[#F7F5F2]/80 leading-relaxed">
                    <RiMapPinLine size={18} className="text-[#D6CEC3] shrink-0 mt-0.5" />
                    <span>{contact.address}</span>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>

        </div>
      </div>

      {/* Decorative background grid line */}
      <div className="absolute left-6 md:left-12 top-0 bottom-0 w-[1px] bg-white/5 pointer-events-none z-0" />
      <div className="absolute right-6 md:right-12 top-0 bottom-0 w-[1px] bg-white/5 pointer-events-none z-0" />
    </section>
  );
}
