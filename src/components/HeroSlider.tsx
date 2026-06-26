//src/components/HeroSlider.tsx
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = ["/banner1.png", "/banner2.png", "/banner3.png"];

export function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden h-[70vh] min-h-[480px] max-h-[720px]">
      {slides.map((image, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <img
            src={image}
            alt={`Banner ${i + 1}`}
            className="w-full h-full object-cover"
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      {/* Previous Button */}
      <button
        onClick={() => setIndex((prev) => (prev - 1 + slides.length) % slides.length)}
        aria-label="Previous slide"
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* Next Button */}
      <button
        onClick={() => setIndex((prev) => (prev + 1) % slides.length)}
        aria-label="Next slide"
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-8 bg-white" : "w-2 bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
