import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { contactPageQuery, layoutQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/ui/FadeIn";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/layout/PageHero";
import { ContactPage as ContactPageType, SiteSettings, Navigation } from "@/types";
import { RiMailLine, RiPhoneLine, RiMapPinLine, RiWhatsappLine } from "react-icons/ri";

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch<ContactPageType>(contactPageQuery, {}, { next: { tags: ["contact"] } });
  return buildMetadata({
    title: data?.heroTitle || data?.pageTitle || "İletişim",
    canonicalPath: "/iletisim",
    pageSeo: data?.seo,
  });
}

export default async function ContactPage() {
  const [data, layoutData] = await Promise.all([
    client.fetch<ContactPageType>(contactPageQuery, {}, { next: { tags: ["contact"] } }),
    client.fetch<{ settings: SiteSettings; navigation: Navigation }>(layoutQuery, {}, { next: { tags: ["layout"] } }),
  ]);

  const settings = layoutData?.settings;
  const contact = settings?.contactInfo;

  return (
    <div className="flex flex-col gap-0 pb-24 bg-background">
      {/* Page Hero */}
      <PageHero
        title={data?.heroTitle || data?.pageTitle || "İletişim"}
        subtitle={data?.heroSubtitle || data?.pageSubtitle}
        backgroundImage={data?.heroImage}
        className="[&_h1]:font-serif [&_h1]:uppercase [&_h1]:tracking-widest"
      />

      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* Left Column: Direct Coordinates & Map (5 Columns) */}
            <div className="lg:col-span-5 space-y-12 lg:sticky lg:top-28">
              <FadeIn direction="up" duration={0.6}>
                <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] text-[#5f5e5e] uppercase block">
                  İletişim
                </span>
                <h2 className="font-serif text-3xl md:text-4xl tracking-tight leading-tight mt-3 text-foreground uppercase">
                  {data?.pageTitle || "Bizimle İletişime Geçin"}
                </h2>
                {data?.pageSubtitle && (
                  <p className="font-sans text-xs tracking-wider text-muted-foreground uppercase leading-relaxed mt-2 max-w-sm">
                    {data.pageSubtitle}
                  </p>
                )}
              </FadeIn>

              {/* Spaced metadata values */}
              <div className="border-l border-[#D6CEC3] pl-6 md:pl-8 space-y-6">
                <FadeIn delay={0.2} duration={0.5} className="space-y-4">
                  {contact?.phone && (
                    <a
                      href={`tel:${contact.phone}`}
                      className="flex items-center gap-4 text-xs sm:text-sm tracking-wider text-foreground/80 hover:text-foreground transition-colors uppercase font-medium"
                    >
                      <RiPhoneLine size={20} className="text-[#5f5e5e]" />
                      <span>{contact.phone}</span>
                    </a>
                  )}

                  {contact?.email && (
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex items-center gap-4 text-xs sm:text-sm tracking-wider text-foreground/80 hover:text-foreground transition-colors font-medium"
                    >
                      <RiMailLine size={20} className="text-[#5f5e5e]" />
                      <span>{contact.email}</span>
                    </a>
                  )}

                  {contact?.whatsappNumber && (
                    <a
                      href={`https://wa.me/${contact.whatsappNumber.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 text-xs sm:text-sm tracking-wider text-foreground/80 hover:text-foreground transition-colors uppercase font-medium"
                    >
                      <RiWhatsappLine size={20} className="text-[#5f5e5e]" />
                      <span>WhatsApp Destek</span>
                    </a>
                  )}

                  {contact?.address && (
                    <div className="flex items-start gap-4 text-xs sm:text-sm tracking-wider text-foreground/80 leading-relaxed uppercase font-medium">
                      <RiMapPinLine size={20} className="text-[#5f5e5e] shrink-0 mt-0.5" />
                      <span>{contact.address}</span>
                    </div>
                  )}
                </FadeIn>
              </div>

            </div>

            {/* Right Column: Contact Form (7 Columns) */}
            <div className="lg:col-span-7">
              <FadeIn delay={0.25} duration={0.6} className="bg-[#efeeeb] p-8 md:p-12 border border-border/20 rounded-none shadow-none">
                <ContactForm
                  formTitle={data?.formTitle || "Mesaj Gönderin"}
                  successMessage={data?.successMessage}
                />
              </FadeIn>
            </div>

          </div>

          {/* Embedded Google Maps Iframing - Full Container Width */}
          {contact?.mapIframe && (
            <FadeIn delay={0.3} duration={0.6} className="mt-16 md:mt-24">
              <div 
                className="w-full aspect-[21/9] min-h-[350px] max-h-[500px] bg-[#efeeeb] border border-border/20 overflow-hidden [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:border-0"
                dangerouslySetInnerHTML={{ __html: contact.mapIframe }}
              />
            </FadeIn>
          )}
        </div>

        {/* Editorial geometric lines */}
        <div className="absolute left-6 md:left-12 top-0 bottom-0 w-[1px] bg-border/20 pointer-events-none z-0" />
        <div className="absolute right-6 md:right-12 top-0 bottom-0 w-[1px] bg-border/20 pointer-events-none z-0" />
      </section>
    </div>
  );
}
