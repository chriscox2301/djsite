import Image from "next/image";
import { atmosphere } from "@/data/site";

/** Black-and-white mood photo with a handwritten turquoise accent. Desktop only (lg+), to keep the mobile home page short. */
export default function AtmosphereCard() {
  return (
    <figure className="relative hidden min-h-72 overflow-hidden border border-border bg-surface lg:col-span-2 lg:order-last lg:block lg:min-h-[22rem] xl:order-none xl:col-span-1 xl:min-h-[30rem]">
      <Image
        src={atmosphere.image}
        alt={atmosphere.alt}
        fill
        sizes="(min-width: 1280px) 28vw, 100vw"
        className="object-cover contrast-125 grayscale"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
      <figcaption className="absolute right-8 bottom-8 -rotate-12 text-right font-hand text-3xl leading-tight text-accent drop-shadow-[0_2px_6px_rgb(0_0_0/0.9)]">
        {atmosphere.accent.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
        <svg aria-hidden="true" viewBox="0 0 160 40" className="absolute -bottom-5 -left-10 w-40 text-accent" fill="none">
          <ellipse cx="80" cy="20" rx="76" ry="14" stroke="currentColor" strokeWidth="1.5" transform="rotate(-8 80 20)" />
        </svg>
      </figcaption>
    </figure>
  );
}
