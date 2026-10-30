import { artist, heroSlides } from "@/data/site";
import ButtonLink from "./ButtonLink";
import HeroSlides from "./HeroSlides";
import { PlayIcon } from "./icons";

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[640px] items-center overflow-hidden pt-18 pb-28 md:min-h-[86svh] md:pb-36"
    >
      <HeroSlides slides={heroSlides} />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 md:px-8 lg:px-12">
        <div className="max-w-2xl">
          <p className="text-xs font-bold tracking-[0.5em] text-text uppercase sm:text-sm">
            {artist.role.split("/").map((part, i, arr) => (
              <span key={part}>
                {part.trim()}
                {i < arr.length - 1 && <span className="px-3 text-accent">/</span>}
              </span>
            ))}
          </p>

          <h1
            id="hero-title"
            data-text={artist.name}
            className="glitch mt-4 font-display text-[clamp(3.6rem,15vw,10.5rem)] leading-[0.85] tracking-tight text-text uppercase"
          >
            {artist.name}
          </h1>

          <ul
            aria-label="Genres"
            className="mt-6 flex flex-wrap items-center gap-y-2 text-[0.7rem] font-extrabold tracking-[0.35em] uppercase sm:text-xs"
          >
            {artist.genreTags.map((tag, i) => (
              <li key={tag} className="flex items-center">
                {i > 0 && (
                  <span aria-hidden="true" className="px-3 text-accent">
                    /
                  </span>
                )}
                {tag}
              </li>
            ))}
          </ul>

          <p className="mt-6 max-w-md text-base leading-relaxed text-text-muted sm:text-lg">{artist.intro}</p>

          <div className="mt-9 flex flex-wrap gap-4">
            <ButtonLink href="#music">
              <PlayIcon width={14} height={14} />
              Listen now
            </ButtonLink>
            <ButtonLink href="#gigs" variant="outline">
              Upcoming gigs
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
