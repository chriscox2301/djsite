import { gigs, gigsCta, splitDate, type Gig } from "@/data/site";
import Card, { CardHeading } from "./Card";
import { ArrowRightIcon, PlusIcon } from "./icons";

function GigRow({ gig }: { gig: Gig }) {
  const { day, month } = splitDate(gig.date);
  return (
    <li className="grid grid-cols-[3.5rem_1fr_auto] items-center gap-4 border-t border-border py-4 sm:grid-cols-[3.5rem_1fr_auto_auto]">
      <time dateTime={gig.date} className="flex flex-col items-center border-r border-border pr-4 leading-none">
        <span className="font-display text-3xl">{day}</span>
        <span className="mt-1 text-[0.7rem] font-bold tracking-[0.2em] text-text-muted">{month}</span>
      </time>
      <div className="min-w-0">
        <h3 className="truncate text-base font-bold">{gig.event}</h3>
        <p className="truncate text-sm text-text-muted">
          {gig.venue}
          <span className="sm:hidden">, {gig.city}</span>
        </p>
      </div>
      <p className="hidden text-sm whitespace-nowrap text-text-muted sm:block">{gig.city}</p>
      <a
        href={gig.url ?? "#gigs"}
        aria-label={`More info about ${gig.event}`}
        className="grid size-9 place-items-center border border-border-strong text-text transition-colors hover:border-accent hover:bg-accent hover:text-accent-ink"
      >
        <PlusIcon width={16} height={16} />
      </a>
    </li>
  );
}

export default function GigsList() {
  return (
    <Card id="gigs" aria-labelledby="gigs-title" className="flex flex-col p-6">
      <div className="flex items-center justify-between gap-4 pb-4">
        <CardHeading id="gigs-title">Upcoming gigs</CardHeading>
        <a
          href={gigsCta.url}
          className="group inline-flex items-center gap-2 text-[0.7rem] font-bold tracking-[0.2em] text-accent uppercase hover:text-accent-hover"
        >
          {gigsCta.label}
          <span className="sr-only"> gigs</span>
          <ArrowRightIcon width={14} height={14} className="transition-transform group-hover:translate-x-1" />
        </a>
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
