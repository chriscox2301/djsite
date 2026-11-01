import Image from "next/image";
import { about } from "@/data/site";
import ButtonLink from "./ButtonLink";
import Card, { CardHeading } from "./Card";
import { ArrowRightIcon } from "./icons";

export default function AboutCard() {
  return (
    <Card id="about" aria-labelledby="about-title" className="grid grid-cols-1 sm:grid-cols-[1fr_40%] xl:grid-cols-[1fr_34%]">
      <div className="flex flex-col p-6 sm:p-8 lg:p-10 xl:p-8 2xl:p-10">
        <CardHeading id="about-title">{about.title}</CardHeading>
        <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-text-muted">{about.bio}</p>
        <div className="mt-auto pt-10">
          <ButtonLink href={about.ctaUrl} variant="ghost" className="px-5 py-3">
            {about.ctaLabel}
            <ArrowRightIcon width={16} height={16} />
          </ButtonLink>
        </div>
      </div>
      <div className="relative min-h-80 overflow-hidden border-t border-border sm:border-t-0 sm:border-l">
        <Image src={about.image} alt={about.imageAlt} fill sizes="(min-width: 1280px) 15vw, (min-width: 640px) 40vw, 100vw" className="object-cover" />
        <p className="absolute top-5 right-4 rotate-6 text-right font-hand text-2xl leading-tight text-accent drop-shadow-[0_2px_6px_rgb(0_0_0/0.9)]">
          {about.sideNote.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      </div>
    </Card>
  );
}
