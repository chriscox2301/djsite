import { gigs, gigsCta, splitDate, type Gig } from "@/data/site";
import Card from "./Card";
import SectionHeading from "./SectionHeading";
import { ArrowRightIcon } from "./icons";

/** A real destination, not a placeholder anchor back to this section. */
const isRealLink = (url?: string): url is string => !!url && url !== "#" && !url.startsWith("#gigs");

function GigRow({ gig }: { gig: Gig }) {
  const { day, month } = splitDate(gig.date);
  const hasLink = isRealLink(gig.url);
  const external = hasLink && /^https?:\/\//.test(gig.url!);

  return (
    <li
      className={`group relative grid items-center gap-4 border-t border-border py-4 ${
        hasLink
          ? // With a Tickets link the city moves under the venue, so the event name keeps its room
            "grid-cols-[3.5rem_1fr_auto] transition-colors hover:bg-surface-raised"
          : "grid-cols-[3.5rem_1fr] sm:grid-cols-[3.5rem_1fr_auto]"
      }`}
    >
      <time dateTime={gig.date} className="flex flex-col items-center border-r border-border pr-4 leading-none">
        <span className="font-display text-3xl">{day}</span>
        <span className="mt-1 text-xs font-bold tracking-label text-text-muted">{month}</span>
      </time>
      <div className="min-w-0">
        <h3 className="truncate text-base font-bold">{gig.event}</h3>
        <p className="truncate text-sm text-text-muted">
          {gig.venue}
          <span className={hasLink ? "" : "sm:hidden"}>, {gig.city}</span>
        </p>
      </div>
      {!hasLink && <p className="hidden text-sm whitespace-nowrap text-text-muted sm:block">{gig.city}</p>}
      {hasLink && (
        // The ::after stretches the link over the whole row, so the full row is clickable.
        <a
          href={gig.url}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="inline-flex min-h-11 items-center gap-2 border border-border-control px-3 text-xs font-bold tracking-label text-text uppercase transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink after:absolute after:inset-0 after:content-['']"
        >
          Tickets
          <span className="sr-only">
            {" "}
            for {gig.event}
            {external ? " (opens in a new tab)" : ""}
          </span>
          <ArrowRightIcon width={14} height={14} />
        </a>
      )}
    </li>
  );
}

export default function GigsList() {
  return (
    <Card id="gigs" aria-labelledby="gigs-title" className="flex flex-col p-6">
      <div className="flex items-center justify-between gap-4 pb-4">
        <SectionHeading id="gigs-title">Upcoming gigs</SectionHeading>
        {/* Hidden until there is a real gig list to link to */}
        {isRealLink(gigsCta.url) && (
          <a
            href={gigsCta.url}
            className="group inline-flex min-h-11 items-center gap-2 text-xs font-bold tracking-label text-accent uppercase hover:text-accent-hover"
          >
            {gigsCta.label}
            <span className="sr-only"> gigs</span>
            <ArrowRightIcon width={14} height={14} className="transition-transform group-hover:translate-x-1" />
          </a>
        )}
      </div>
      {gigs.length ? (
        <ul>
          {gigs.map((gig) => (
            <GigRow key={gig.id} gig={gig} />
          ))}
        </ul>
      ) : (
        <p className="border-t border-border pt-4 text-sm text-text-muted">No gigs announced yet.</p>
      )}
    </Card>
  );
}
