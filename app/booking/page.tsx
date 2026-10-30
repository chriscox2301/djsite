import type { Metadata } from "next";
import BookingForm from "@/components/BookingForm";
import ContactSection from "@/components/ContactSection";
import PageTitle from "@/components/PageTitle";
import { artist, bookingPage } from "@/data/site";

export const metadata: Metadata = {
  title: "Booking",
  description: `Book hardcore DJ ${artist.name} for your club night, festival or party.`,
};

export default function BookingPage() {
  return (
    <>
      <main id="main">
        <PageTitle intro={bookingPage.intro}>Booking</PageTitle>

        <div className="mx-auto grid max-w-[1440px] gap-10 px-4 md:px-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16 lg:px-12 xl:grid-cols-[minmax(0,1fr)_26rem]">
          <BookingForm />

          <aside aria-labelledby="booking-info-title" className="lg:pt-10">
            <h2 id="booking-info-title" className="sr-only">
              Before you book
            </h2>
            <dl className="divide-y divide-border border-y border-border">
              {bookingPage.info.map((item) => (
                <div key={item.title} className="py-6">
                  <dt className="font-display text-2xl tracking-[0.12em] uppercase">{item.title}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-text-muted">{item.body}</dd>
                </div>
              ))}
              <div className="py-6">
                <dt className="font-display text-2xl tracking-[0.12em] uppercase">Direct</dt>
                <dd className="mt-2 text-sm leading-relaxed text-text-muted">
                  Prefer your own email?{" "}
                  <a
                    href={`mailto:${artist.bookingEmail}`}
                    className="text-accent underline decoration-accent-dim underline-offset-4 hover:decoration-accent"
                  >
                    {artist.bookingEmail}
                  </a>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </main>
      <ContactSection showBooking={false} />
    </>
  );
}
