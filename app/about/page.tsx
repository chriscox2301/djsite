import type { Metadata } from "next";
import Image from "next/image";
import ButtonLink from "@/components/ButtonLink";
import ContactSection from "@/components/ContactSection";
import PageTitle from "@/components/PageTitle";
import { about, aboutPage, artist } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: `The story and sound of hardcore DJ and producer ${artist.name}.`,
};

export default function AboutPage() {
  return (
    <>
      <main id="main">
        <PageTitle>About</PageTitle>

        <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-12">
          <section aria-labelledby="bio-title" className="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
            <div className="relative aspect-[4/5] overflow-hidden border border-border lg:aspect-auto lg:min-h-[36rem]">
              <Image
                src={about.image}
                alt={about.imageAlt}
                fill
                preload
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col">
              <h2 id="bio-title" className="font-display text-5xl uppercase sm:text-6xl">
                {artist.name}
              </h2>
              <p className="mt-3 text-sm font-semibold text-text-muted">
                {artist.role}, {artist.genre.toLowerCase()}
              </p>
              <div className="mt-8 max-w-[62ch] space-y-5 text-lg leading-relaxed text-text-muted">
                {aboutPage.bio.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <figure className="mt-12 border-l-4 border-accent pl-6">
                <blockquote className="font-hand text-3xl leading-snug text-accent sm:text-4xl">
                  {aboutPage.quote}
                </blockquote>
                <figcaption className="mt-3 text-sm text-text-subtle">{artist.name}</figcaption>
              </figure>
            </div>
          </section>

          <section aria-labelledby="facts-title" className="mt-24 grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
            <div>
              <h2 id="facts-title" className="font-display text-3xl tracking-[0.12em] uppercase">
                Fact sheet
              </h2>
              <dl className="mt-6 border-t border-border">
                {aboutPage.facts.map((fact) => (
                  <div key={fact.label} className="grid grid-cols-[9rem_1fr] gap-4 border-b border-border py-4">
                    <dt className="text-sm text-text-subtle">{fact.label}</dt>
                    <dd className="text-sm font-semibold">{fact.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                {aboutPage.pressKitUrl ? (
                  <ButtonLink href={aboutPage.pressKitUrl} variant="ghost">
                    Download press kit
                  </ButtonLink>
                ) : (
                  <p className="text-sm text-text-subtle">Press kit available on request.</p>
                )}
              </div>
            </div>

            <div>
              <h2 className="font-display text-3xl tracking-[0.12em] uppercase">Photos</h2>
              <ul className="mt-6 grid grid-cols-2 gap-4">
                {aboutPage.photos.map((photo, i) => (
                  <li
                    key={photo.src}
                    className={`relative overflow-hidden border border-border ${i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"}`}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes={i === 0 ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 27vw, 50vw"}
                      className="object-cover"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </main>
      <ContactSection />
    </>
  );
}
