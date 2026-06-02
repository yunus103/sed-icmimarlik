import { FadeIn } from "@/components/ui/FadeIn";
import { AnimateGroup } from "@/components/ui/AnimateGroup";
import { motion } from "framer-motion";

interface ProcessStep {
  stepNumber?: string;
  stepTitle?: string;
  stepDescription?: string;
}

interface ProcessSectionProps {
  title?: string;
  subtitle?: string;
  steps?: ProcessStep[];
}

export function ProcessSection({
  title,
  subtitle,
  steps = [],
}: ProcessSectionProps) {
  const displayTitle = title || "Sürecimiz";
  const displaySubtitle = subtitle || "Biz Nasıl Çalışıyoruz?";

  // Fallback default steps if not populated in CMS
  const defaultSteps: ProcessStep[] = [
    {
      stepNumber: "01",
      stepTitle: "Keşif & Analiz",
      stepDescription: "Mekanın potansiyelini inceliyor, ihtiyaçlarınızı ve bütçenizi analiz ederek mimari vizyonun temelini atıyoruz.",
    },
    {
      stepNumber: "02",
      stepTitle: "Konsept Tasarımı",
      stepDescription: "Ruh katılmış özgün fikirler üretiyor, malzeme panoları, 3D görselleştirmeler ve planlar ile tasarımı somutlaştırıyoruz.",
    },
    {
      stepNumber: "03",
      stepTitle: "Detaylandırma & Projelendirme",
      stepDescription: "Uygulama aşaması için tüm teknik çizimleri hazırlıyor, mobilya, aydınlatma ve dekorasyon detaylarını projelendiriyoruz.",
    },
    {
      stepNumber: "04",
      stepTitle: "Uygulama & Teslimat",
      stepDescription: "Şantiyeyi yüksek kalite standartlarında yönetiyor, kusursuz işçilik ve zamanında planlama ile anahtar teslim yapıyoruz.",
    },
  ];

  const stepsToDisplay = steps && steps.length > 0 ? steps : defaultSteps;

  return (
    <section className="py-24 md:py-36 bg-[#efeeeb] overflow-hidden relative border-b border-border/30">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="max-w-4xl mb-24 space-y-4">
          <FadeIn direction="up" duration={0.6}>
            <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] text-[#5f5e5e] uppercase block">
              Sürecimiz
            </span>
            <h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-tight mt-3 text-foreground uppercase">
              {displayTitle}
            </h2>
            {displaySubtitle && (
              <p className="font-sans text-xs md:text-sm tracking-wider text-muted-foreground uppercase leading-relaxed mt-2 max-w-xl">
                {displaySubtitle}
              </p>
            )}
          </FadeIn>
        </div>

        {/* Steps Grid */}
        <AnimateGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stepsToDisplay.map((step, index) => (
            <div key={index} className="relative space-y-6 flex flex-col justify-between group h-full">
              
              {/* Giant Serif Step Number */}
              <div className="space-y-4">
                <span className="font-serif text-5xl md:text-7xl italic tracking-tight text-[#D6CEC3]/70 group-hover:text-[#111111] transition-colors duration-500 block">
                  {step.stepNumber || `0${index + 1}`}
                </span>
                
                {/* Thin Drafting Divider */}
                <div className="h-[1px] w-full bg-[#D6CEC3] group-hover:bg-[#111111] transition-colors duration-500" />
                
                {/* Step Content */}
                <h3 className="font-serif text-lg md:text-xl text-foreground leading-snug">
                  {step.stepTitle}
                </h3>
                <p className="font-sans text-sm text-foreground/80 leading-relaxed">
                  {step.stepDescription}
                </p>
              </div>

              {/* Decorative side accent on large screen */}
              {index < stepsToDisplay.length - 1 && (
                <div className="absolute top-1/2 -right-4 w-[1px] h-12 bg-[#D6CEC3]/20 hidden lg:block" />
              )}
            </div>
          ))}
        </AnimateGroup>

      </div>

      {/* Editorial geometric lines */}
      <div className="absolute left-6 md:left-12 top-0 bottom-0 w-[1px] bg-border/20 pointer-events-none z-0" />
      <div className="absolute right-6 md:right-12 top-0 bottom-0 w-[1px] bg-border/20 pointer-events-none z-0" />
    </section>
  );
}
