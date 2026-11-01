import { artist } from "@/data/site";
import ButtonLink from "./ButtonLink";
import SocialLinks from "./SocialLinks";

/** Site footer. With `showBooking` it opens with the booking call to action. */
export default function ContactSection({ showBooking = true }: { showBooking?: boolean }) {
  return (
    <footer id="contact" aria-labelledby={showBooking ? "contact-title" : undefined} className="mt-28 border-t border-border md:mt-32">
      {showBooking && (
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-4 py-16 md:flex-row md:py-24 md:items-end md:justify-between md:px-8 lg:px-12">
          <div>
            <h2 id="contact-title" className="font-display text-5xl uppercase sm:text-6xl">
              Book {artist.name}
            </h2>
            <p className="mt-4 max-w-md text-text-muted">
              Club night, festival or warehouse party? Send a request with your date and city.
            </p>
          </div>
          <div className="flex flex-col items-start gap-4 md:items-end">
            <ButtonLink href="/booking">Send a booking request</ButtonLink>
            <a
              href={`mailto:${artist.bookingEmail}`}
              className="text-sm text-text-muted underline decoration-border-strong underline-offset-4 hover:text-accent hover:decoration-accent"
            >
              or email {artist.bookingEmail}
            </a>
          </div>
        </div>
      )}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-4 py-5 md:px-8 lg:px-12">
          <p className="text-xs tracking-label text-text-subtle uppercase">© {artist.name}</p>
          <SocialLinks className="-mr-2" />
        </div>
      </div>
    </footer>
  );
}
