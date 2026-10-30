"use client";

import Image from "next/image";
import { useState } from "react";
import type { HeroSlide } from "@/data/site";

/** Background images of the hero plus the vertical 01/02/03 slide indicator. */
export default function HeroSlides({ slides }: { slides: HeroSlide[] }) {
  const [current, setCurrent] = useState(0);

  return (
    <>
      <div className="absolute inset-0 overflow-hidden">
        {slides.map((slide, i) => (
          <Image
            key={slide.image}
            src={slide.image}
            alt={i === current ? slide.alt : ""}
            aria-hidden={i === current ? undefined : true}
            fill
            sizes="100vw"
            preload={i === 0}
            className={`object-cover object-[70%_center] transition-opacity duration-700 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {/* Darken the left side for text contrast, fade into the page at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-bg/10 md:via-bg/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/40" />
      </div>

      <div
        role="group"
        aria-label="Hero slides"
        className="absolute top-1/2 right-4 z-20 hidden -translate-y-1/2 md:right-8 md:block lg:right-12"
      >
        <ol className="flex flex-col">
          {slides.map((slide, i) => {
            const isCurrent = i === current;
            return (
              <li key={slide.image}>
                <button
                  type="button"
                  onClick={() => setCurrent(i)}
                  aria-label={`Show slide ${i + 1} of ${slides.length}`}
                  aria-current={isCurrent ? "true" : undefined}
                  className={`flex items-center gap-3 py-3 pr-4 text-xs font-bold tracking-[0.2em] tabular-nums transition-colors hover:text-accent ${
                    isCurrent ? "text-text" : "text-text-subtle"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </button>
              </li>
            );
          })}
        </ol>
        {/* Track + active segment */}
        <span aria-hidden="true" className="absolute top-0 right-0 h-full w-0.5 bg-border-strong" />
        <span
          aria-hidden="true"
          className="absolute right-0 w-0.5 bg-accent transition-all duration-300"
          style={{ top: `${(current / slides.length) * 100}%`, height: `${100 / slides.length}%` }}
        />
      </div>
    </>
  );
}
