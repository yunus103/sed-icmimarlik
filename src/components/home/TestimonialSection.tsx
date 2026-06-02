"use client";

import { useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { motion, AnimatePresence } from "framer-motion";
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";

interface Testimonial {
  quote?: string;
  author?: string;
  authorRole?: string;
}

interface TestimonialSectionProps {
  title?: string;
  testimonials?: Testimonial[];
}

export function TestimonialSection({
  title,
  testimonials = [],
}: TestimonialSectionProps) {
  const displayTitle = title || "Referanslarımız";
  const [index, setIndex] = useState(0);

  // High-end fallback quotes reflecting premium architecture reviews
  const defaultTestimonials: Testimonial[] = [
    {
      quote: "Sed İç Mimarlık ile çalışmak şantiyeden teslime kadar kusursuz bir deneyimdi. Detaylara verdikleri önem, malzeme kalitesi ve mekana kazandırdıkları derinlik sayesinde hayalimizin ötesinde bir ofis alanına kavuştuk.",
      author: "Hakan Yılmaz",
      authorRole: "Kurucu, Veritas Holding",
    },
    {
      quote: "Sadelik ve gösterişi bu kadar dengeli harmanlayan başka bir stüdyo ile karşılaşmadım. Tasarladıkları villa, modern brutalist hatları ve sıcak minimal dokularıyla her gün bize huzur veren bir mimari sanat eseri.",
      author: "Aylin Şen",
      authorRole: "Koleksiyoner & Ev Sahibi",
    },
  ];

  const list = testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials;

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % list.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + list.length) % list.length);
  };

  const active = list[index];

  return (
    <section className="py-28 md:py-40 bg-background overflow-hidden relative border-b border-border/30">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Subtle Overline Title */}
        <div className="text-center mb-16">
          <FadeIn direction="up" duration={0.6}>
            <span className="text-[10px] md:text-xs font-semibold tracking-[0.25em] text-[#5f5e5e] uppercase">
              {displayTitle}
            </span>
          </FadeIn>
        </div>

        {/* Highlight Quote Canvas */}
        {active && (
          <div className="max-w-4xl mx-auto relative min-h-[220px]">
            {/* giant architectural quote decoration */}
            <div className="absolute -top-12 -left-4 md:-left-12 font-serif text-8xl md:text-9xl text-[#D6CEC3]/30 pointer-events-none select-none">
              “
            </div>

            <div className="space-y-8 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  className="space-y-6 text-center"
                >
                  <p className="font-serif text-xl sm:text-2xl md:text-3xl italic text-foreground leading-[1.65] font-light max-w-3xl mx-auto">
                    {active.quote}
                  </p>
                  
                  {/* Author credit in spaced sans-serif */}
                  <div className="pt-2">
                    <span className="text-[11px] font-semibold tracking-[0.25em] text-[#111111] uppercase block">
                      {active.author}
                    </span>
                    {active.authorRole && (
                      <span className="text-[9px] tracking-[0.2em] text-[#5f5e5e] uppercase block mt-1">
                        {active.authorRole}
                      </span>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Carousel Slide Controls */}
        {list.length > 1 && (
          <FadeIn delay={0.3} className="flex justify-center items-center gap-6 mt-16">
            <button 
              onClick={handlePrev}
              aria-label="Önceki referans"
              className="flex h-10 w-10 items-center justify-center border border-border bg-transparent text-[#111111] hover:bg-[#111111] hover:text-white hover:border-[#111111] rounded-none transition-all duration-300 active:translate-y-px"
            >
              <RiArrowLeftLine size={16} />
            </button>
            <span className="text-[10px] tracking-widest font-mono text-[#5f5e5e] select-none">
              {index + 1} / {list.length}
            </span>
            <button 
              onClick={handleNext}
              aria-label="Sonraki referans"
              className="flex h-10 w-10 items-center justify-center border border-border bg-transparent text-[#111111] hover:bg-[#111111] hover:text-white hover:border-[#111111] rounded-none transition-all duration-300 active:translate-y-px"
            >
              <RiArrowRightLine size={16} />
            </button>
          </FadeIn>
        )}

      </div>

      {/* Editorial geometric lines */}
      <div className="absolute left-6 md:left-12 top-0 bottom-0 w-[1px] bg-border/20 pointer-events-none z-0" />
      <div className="absolute right-6 md:right-12 top-0 bottom-0 w-[1px] bg-border/20 pointer-events-none z-0" />
    </section>
  );
}
