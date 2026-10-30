import Link from "next/link";
import { artist } from "@/data/site";

export default function Logo() {
  return (
    <Link href="/" className="group relative inline-flex items-center" aria-label={`${artist.name}, home`}>
      <span className="font-display text-[1.7rem] leading-none tracking-wide text-text uppercase italic transition-colors group-hover:text-accent">
        {artist.name}
      </span>
      <span aria-hidden="true" className="absolute -bottom-1.5 left-0 h-[3px] w-2/3 -skew-x-[30deg] bg-accent" />
    </Link>
  );
}
