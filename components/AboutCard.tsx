import Image from "next/image";
import { about } from "@/data/site";
import ButtonLink from "./ButtonLink";
import Card, { CardHeading } from "./Card";
import { ArrowRightIcon } from "./icons";

export default function AboutCard() {
  return (
    <Card id="about" aria-labelledby="about-title" className="grid grid-cols-1 sm:grid-cols-[1fr_38%]">
      <div className="flex flex-col p-6">
        <CardHeading id="about-title">{about.title}</CardHeading>
        <p className="mt-5 text-sm leading-relaxed text-text-muted">{about.bio}</p>
        <div className="mt-auto pt-6">
          <ButtonLink href={about.ctaUrl} variant="ghost" className="px-5 py-3">
            {about.ctaLabel}
            <ArrowRightIcon width={16} height={16} />
          </ButtonLink>
        </div>
      </div>
      <div className="relative min-h-64 overflow-hidden border-t border-border sm:border-t-0 sm:border-l">
        <Image src={about.image} alt={about.imageAlt} fill sizes="(min-width: 1024px) 15vw, 40vw" className="object-cover" />
        <p className="absolute top-4 right-3 rotate-6 text-right font-hand text-xl leading-tight text-accent drop-shadow-[0_2px_6px_rgb(0_0_0/0.9)]">
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
