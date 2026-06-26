//src/components/HeroSlider.tsx
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { getHeroSlides, type HeroSlide } from "@/lib/data";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function HeroSlider() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => { getHeroSlides().then(setSlides).catch(() => {}); }, []);
  useEffect(() => {
    if (slides.length === 0) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [slides.length]);

  if (slides.length === 0) {
    return <div className="h-[60vh] bg-accent animate-pulse" />;
  }

  const slide = slides[index];

  return (
    <section className="relative overflow-hidden h-[70vh] min-h-[480px] max-h-[720px]">
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === index ? "opacity-100" : "opacity-0"}`}
          aria-hidden={i !== index}
        >
          <img src={s.image} alt={s.title} className="absolute inset-0 w-full h-full object-cover" loading={i === 0 ? "eager" : "lazy"} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/20" />
        </div>
      ))}

      <div className="relative h-full container-px mx-auto max-w-7xl flex items-center">
        <div className="max-w-2xl text-white">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-gold/95 text-gold-foreground text-xs font-semibold tracking-wide uppercase">
            {slide.subtitle}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight" style={{ fontFamily: "var(--font-display)" }}>
            {slide.title}
          </h1>
          <p className="text-base md:text-lg opacity-90 mb-8 max-w-xl">{slide.description}</p>
          <Link to={slide.buttonUrl} className="btn-gold">{slide.buttonText}</Link>
        </div>
      </div>

      <button
        onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
        aria-label="Previous slide"
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur"
      ><ChevronLeft className="h-6 w-6" /></button>
      <button
        onClick={() => setIndex((i) => (i + 1) % slides.length)}
        aria-label="Next slide"
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur"
      ><ChevronRight className="h-6 w-6" /></button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all ${i === index ? "w-8 bg-gold" : "w-2 bg-white/60"}`}
          />
        ))}
      </div>
    </section>
  );
}
