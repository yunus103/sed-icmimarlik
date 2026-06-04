import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { aboutPageQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/seo";
import { FadeIn } from "@/components/ui/FadeIn";
import { SanityImage } from "@/components/ui/SanityImage";
import { RichText } from "@/components/ui/RichText";
import { PageHero } from "@/components/layout/PageHero";
import { AboutPage as AboutPageType } from "@/types";

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch<AboutPageType>(
    aboutPageQuery,
    {},
    { next: { tags: ["about"] } },
  );
  return buildMetadata({
    title: data?.heroTitle || data?.pageTitle || "Hakkımızda",
    canonicalPath: "/hakkimizda",
    pageSeo: data?.seo,
  });
}

export default async function AboutPage() {
  const data = await client.fetch<AboutPageType>(
    aboutPageQuery,
    {},
    { next: { tags: ["about"] } },
  );

  return (
    <div className="flex flex-col gap-0 pb-24 bg-background">
      {/* Page Hero */}
      <PageHero
        title={data?.heroTitle || data?.pageTitle || "Hakkımızda"}
        subtitle={data?.heroSubtitle || data?.pageSubtitle}
        backgroundImage={data?.heroImage}
        className="[&_h1]:font-serif [&_h1]:uppercase [&_h1]:tracking-widest"
      />

      {/* SECTION 1: Brand Story (Marka Hikayesi) */}
      <section className="py-24 md:py-32 relative border-b border-border/30">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            {/* Left Narrative */}
            <div className="lg:col-span-6 space-y-8">
              <FadeIn direction="up" duration={0.6}>
                {" "}
                <h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-tight mt-3 text-foreground uppercase">
                  {data?.pageTitle || "Biz Kimiz?"}
                </h2>
                {data?.pageSubtitle && (
                  <p className="text-sm md:text-base font-semibold tracking-wider text-muted-foreground uppercase leading-relaxed mt-2">
                    {data.pageSubtitle}
                  </p>
                )}
              </FadeIn>

              <div className="border-l border-[#D6CEC3] pl-6 md:pl-8 space-y-6">
                <FadeIn delay={0.2} duration={0.6}>
                  <RichText
                    value={data?.body}
                    className="text-foreground/80 leading-relaxed font-sans text-sm md:text-base"
                  />
                </FadeIn>
              </div>
            </div>

            {/* Right Architectural Image */}
            {data?.mainImage && (
              <div className="lg:col-span-6 relative lg:sticky lg:top-28">
                <FadeIn
                  direction="left"
                  delay={0.35}
                  className="relative w-full"
                >
                  <div className="absolute -bottom-4 -left-4 w-full h-full border border-[#D6CEC3] pointer-events-none z-0" />
                  <div className="relative aspect-[4/3] md:aspect-[3/2] overflow-hidden bg-secondary z-10 rounded-none shadow-none">
                    <SanityImage
                      image={data.mainImage}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                      priority
                    />
                  </div>
                </FadeIn>
              </div>
            )}
          </div>
        </div>
        <div className="absolute left-6 md:left-12 top-0 bottom-0 w-[1px] bg-border/20 pointer-events-none z-0" />
        <div className="absolute right-6 md:right-12 top-0 bottom-0 w-[1px] bg-border/20 pointer-events-none z-0" />
      </section>

      {/* SECTION 2: Our Approach (Yaklaşımımız) */}
      {data?.approachPillars && data.approachPillars.length > 0 && (
        <section className="py-24 md:py-32 bg-[#efeeeb] relative border-b border-border/30">
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            {/* Title */}
            <div className="max-w-4xl mb-20 space-y-4">
              <FadeIn direction="up" duration={0.6}>
                <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] text-[#5f5e5e] uppercase block">
                  Felsefemiz
                </span>
                <h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-tight mt-3 text-foreground uppercase">
                  {data?.approachTitle || "Tasarım Yaklaşımımız"}
                </h2>
              </FadeIn>
            </div>

            {/* Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
              {data.approachPillars.map((pillar, i) => (
                <FadeIn
                  key={i}
                  delay={i * 0.1}
                  duration={0.6}
                  className="space-y-4 group"
                >
                  <span className="font-serif text-4xl md:text-5xl italic tracking-tight text-[#D6CEC3] group-hover:text-foreground transition-colors duration-500 block">
                    {pillar.number || `0${i + 1}`}
                  </span>
                  <div className="h-[1px] w-full bg-[#D6CEC3] group-hover:bg-[#111111] transition-colors duration-500" />
                  <h3 className="font-serif text-lg md:text-xl text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-sm text-foreground/80 leading-relaxed">
                    {pillar.description}
                  </p>
                </FadeIn>
              ))}
            </div>
          </div>
          <div className="absolute left-6 md:left-12 top-0 bottom-0 w-[1px] bg-border/20 pointer-events-none z-0" />
          <div className="absolute right-6 md:right-12 top-0 bottom-0 w-[1px] bg-border/20 pointer-events-none z-0" />
        </section>
      )}

      {/* SECTION 3: Why Us (Neden Biz?) */}
      {data?.whyUsPoints && data.whyUsPoints.length > 0 && (
        <section className="py-24 md:py-32 relative border-b border-border/30">
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              {/* Sidebar Header */}
              <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-28">
                <FadeIn direction="up" duration={0.6}>
                  <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] text-[#5f5e5e] uppercase block">
                    Farkımız
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl tracking-tight leading-tight mt-3 text-foreground uppercase">
                    {data?.whyUsTitle || "Neden Biz?"}
                  </h2>
                  {data?.whyUsSubtitle && (
                    <p className="font-sans text-xs tracking-wider text-muted-foreground uppercase leading-relaxed max-w-sm">
                      {data.whyUsSubtitle}
                    </p>
                  )}
                </FadeIn>
              </div>

              {/* Points List */}
              <div className="lg:col-span-8 space-y-8 border-l border-[#D6CEC3]/50 pl-6 md:pl-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                  {data.whyUsPoints.map((point, i) => (
                    <FadeIn
                      key={i}
                      delay={i * 0.08}
                      duration={0.5}
                      className="space-y-3"
                    >
                      <h3 className="font-serif text-lg text-foreground flex items-center gap-3">
                        <span className="w-1.5 h-1.5 bg-[#111111] rounded-none inline-block shrink-0" />
                        {point.title}
                      </h3>
                      <p className="font-sans text-sm text-foreground/80 leading-relaxed">
                        {point.description}
                      </p>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="absolute left-6 md:left-12 top-0 bottom-0 w-[1px] bg-border/20 pointer-events-none z-0" />
          <div className="absolute right-6 md:right-12 top-0 bottom-0 w-[1px] bg-border/20 pointer-events-none z-0" />
        </section>
      )}

      {/* SECTION 4: Vision & Mission (Vizyon & Misyon) */}
      {(data?.visionText || data?.missionText) && (
        <section className="py-24 md:py-32 bg-[#efeeeb] relative border-b border-border/30">
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 relative">
              {/* Vision Block */}
              {data?.visionText && (
                <FadeIn direction="up" duration={0.6} className="space-y-6">
                  <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] text-[#5f5e5e] uppercase block">
                    {data?.visionTitle || "Vizyonumuz"}
                  </span>
                  <p className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground leading-relaxed italic font-light">
                    “{data.visionText}”
                  </p>
                </FadeIn>
              )}

              {/* Vertical Drafting line in between (Desktop only) */}
              <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#D6CEC3] hidden md:block" />

              {/* Mission Block */}
              {data?.missionText && (
                <FadeIn
                  direction="up"
                  duration={0.6}
                  delay={0.15}
                  className="space-y-6"
                >
                  <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] text-[#5f5e5e] uppercase block">
                    {data?.missionTitle || "Misyonumuz"}
                  </span>
                  <p className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground leading-relaxed italic font-light">
                    “{data.missionText}”
                  </p>
                </FadeIn>
              )}
            </div>
          </div>
          <div className="absolute left-6 md:left-12 top-0 bottom-0 w-[1px] bg-border/20 pointer-events-none z-0" />
          <div className="absolute right-6 md:right-12 top-0 bottom-0 w-[1px] bg-border/20 pointer-events-none z-0" />
        </section>
      )}

      {/* SECTION 5: Team (Ekibimiz) */}
      {data?.teamMembers && data.teamMembers.length > 0 && (
        <section className="py-24 md:py-32 relative">
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            {/* Header */}
            <div className="max-w-4xl mb-20 space-y-4">
              <FadeIn direction="up" duration={0.6}>
                <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] text-[#5f5e5e] uppercase block">
                  İmzalar
                </span>
                <h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-tight mt-3 text-foreground uppercase">
                  {data?.teamTitle || "Profesyonel Kadromuz"}
                </h2>
                {data?.teamSubtitle && (
                  <p className="font-sans text-xs md:text-sm tracking-wider text-muted-foreground uppercase leading-relaxed max-w-xl">
                    {data.teamSubtitle}
                  </p>
                )}
              </FadeIn>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.teamMembers.map((member, i) => {
                const initials = member.name
                  ?.split(" ")
                  .map((w) => w[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2);

                return (
                  <FadeIn
                    key={i}
                    delay={i * 0.08}
                    duration={0.6}
                    className="group"
                  >
                    <div className="border border-[#D6CEC3]/40 p-8 relative bg-[#efeeeb]/20 hover:bg-[#efeeeb]/40 hover:border-foreground transition-all duration-500 min-h-[180px] flex flex-col justify-between">
                      {/* Top Accent: Number and watermark initials */}
                      <div className="flex justify-between items-start">
                        <span className="font-serif text-xs italic text-[#5f5e5e]/80">
                          {i < 9 ? `0${i + 1}` : i + 1}
                        </span>
                        {initials && (
                          <span className="font-serif text-3xl font-light text-[#D6CEC3]/50 group-hover:text-foreground/15 transition-colors duration-500 select-none">
                            {initials}
                          </span>
                        )}
                      </div>

                      {/* Info / Metadata */}
                      <div className="space-y-2 mt-8">
                        <div className="h-[1px] w-8 bg-[#D6CEC3] group-hover:w-16 transition-all duration-500" />
                        <h3 className="font-serif text-lg md:text-xl text-foreground leading-snug tracking-tight">
                          {member.name}
                        </h3>
                        <span className="text-[10px] tracking-[0.25em] font-semibold text-[#5f5e5e] uppercase block">
                          {member.role}
                        </span>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
          <div className="absolute left-6 md:left-12 top-0 bottom-0 w-[1px] bg-border/20 pointer-events-none z-0" />
          <div className="absolute right-6 md:right-12 top-0 bottom-0 w-[1px] bg-border/20 pointer-events-none z-0" />
        </section>
      )}
    </div>
  );
}
