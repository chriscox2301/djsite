import { artist } from "@/data/site";
import ButtonLink from "./ButtonLink";
import SocialLinks from "./SocialLinks";

export default function ContactSection() {
  return (
    <footer id="contact" aria-labelledby="contact-title" className="mt-16 border-t border-border">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-4 py-14 md:flex-row md:items-end md:justify-between md:px-8 lg:px-12">
        <div>
          <p className="text-xs font-bold tracking-[0.45em] text-text-subtle uppercase">Contact &amp; bookings</p>
          <h2 id="contact-title" className="mt-3 font-display text-5xl uppercase sm:text-6xl">
            Book <span className="text-accent">{artist.name}</span>
          </h2>
          <p className="mt-4 max-w-md text-text-muted">
            For bookings, press and collaborations, send an email. {/* PLACEHOLDER copy */}
          </p>
        </div>
        <div className="flex flex-col items-start gap-5 md:items-end">
          <ButtonLink href={`mailto:${artist.bookingEmail}`}>{artist.bookingEmail}</ButtonLink>
          <SocialLinks className="-ml-2 md:mr-[-0.5rem] md:ml-0" />
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-[1440px] px-4 py-6 text-xs tracking-[0.2em] text-text-subtle uppercase md:px-8 lg:px-12">
          © {artist.name}
        </p>
      </div>
    </footer>
  );
}
