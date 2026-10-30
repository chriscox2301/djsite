"use client";

import { useId, useState, type FormEvent } from "react";
import { artist, bookingPage } from "@/data/site";

type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "date" | "number";
  required?: boolean;
  autoComplete?: string;
  wide?: boolean;
};

const fields: Field[] = [
  { name: "name", label: "Your name", required: true, autoComplete: "name" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  { name: "organisation", label: "Organisation", autoComplete: "organization" },
  { name: "event", label: "Event name", required: true },
  { name: "date", label: "Date", type: "date", required: true },
  { name: "city", label: "City", required: true, autoComplete: "address-level2" },
  { name: "venue", label: "Venue" },
  { name: "capacity", label: "Expected crowd", type: "number" },
];

const inputClass =
  "mt-2 block w-full border border-border-strong bg-bg px-4 py-3 text-base text-text placeholder:text-text-subtle transition-colors hover:border-text-subtle focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 aria-[invalid=true]:border-glitch";

/**
 * Booking request form. There is no backend: on submit it validates the
 * fields and opens the visitor's email app with a pre-filled message.
 */
export default function BookingForm() {
  const id = useId();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const next: Record<string, string> = {};

    for (const f of fields) {
      const value = String(data.get(f.name) ?? "").trim();
      if (f.required && !value) next[f.name] = `Enter ${f.label.toLowerCase()}.`;
      else if (f.type === "email" && value && !/^\S+@\S+\.\S+$/.test(value)) next[f.name] = "Enter an email address like name@example.com.";
    }
    setErrors(next);
    setSent(false);

    const firstInvalid = Object.keys(next)[0];
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const lines = [
      ...fields.map((f) => `${f.label}: ${String(data.get(f.name) ?? "").trim() || "-"}`),
      `Set length: ${data.get("setLength")}`,
      "",
      String(data.get("message") ?? "").trim(),
    ];
    const subject = `Booking request: ${data.get("event")} (${data.get("date")}, ${data.get("city")})`;
    window.location.href = `mailto:${artist.bookingEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    setSent(true);
  }

  const errorCount = Object.keys(errors).length;

  return (
    <form noValidate onSubmit={handleSubmit} aria-describedby={`${id}-note`} className="border border-border bg-surface p-6 md:p-10">
      <h2 className="font-display text-3xl tracking-[0.12em] uppercase">Request a booking</h2>
      <p id={`${id}-note`} className="mt-3 max-w-prose text-sm text-text-muted">
        All fields are required unless marked optional.
      </p>

      <div role="alert" className="empty:hidden">
        {errorCount > 0 && (
          <p className="mt-6 border-l-4 border-glitch bg-bg px-4 py-3 text-sm">
            {errorCount === 1 ? "1 field needs attention." : `${errorCount} fields need attention.`}
          </p>
        )}
      </div>

      <div className="mt-8 grid gap-x-6 gap-y-6 sm:grid-cols-2">
        {fields.map((f) => {
          const err = errors[f.name];
          return (
            <div key={f.name} className={f.wide ? "sm:col-span-2" : ""}>
              <label htmlFor={`${id}-${f.name}`} className="text-sm font-semibold">
                {f.label}
                {!f.required && <span className="font-normal text-text-subtle"> (optional)</span>}
              </label>
              <input
                id={`${id}-${f.name}`}
                name={f.name}
                type={f.type ?? "text"}
                required={f.required}
                autoComplete={f.autoComplete}
                min={f.type === "number" ? 0 : undefined}
                aria-invalid={err ? true : undefined}
                aria-describedby={err ? `${id}-${f.name}-error` : undefined}
                className={`${inputClass} [color-scheme:dark]`}
              />
              {err && (
                <p id={`${id}-${f.name}-error`} className="mt-2 text-sm text-[#ff8da1]">
                  {err}
                </p>
              )}
            </div>
          );
        })}

        <div>
          <label htmlFor={`${id}-setLength`} className="text-sm font-semibold">
            Set length
          </label>
          <select id={`${id}-setLength`} name="setLength" className={`${inputClass} [color-scheme:dark]`}>
            {bookingPage.setLengths.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${id}-message`} className="text-sm font-semibold">
            Anything else we should know <span className="font-normal text-text-subtle">(optional)</span>
          </label>
          <textarea
            id={`${id}-message`}
            name="message"
            rows={5}
            placeholder="Line-up, time slot, budget, travel…"
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="inline-flex items-center justify-center bg-accent px-8 py-4 text-xs font-extrabold tracking-[0.25em] text-accent-ink uppercase transition-colors hover:bg-accent-hover"
        >
          Send booking request
        </button>
        <p className="text-sm text-text-subtle">Opens your email app with the details filled in.</p>
      </div>

      <div aria-live="polite">
        {sent && (
          <p className="mt-6 border-l-4 border-accent bg-bg px-4 py-3 text-sm">
            Your email app should now show the request, ready to send. Nothing opened? Email{" "}
            <a href={`mailto:${artist.bookingEmail}`} className="text-accent underline underline-offset-4">
              {artist.bookingEmail}
            </a>{" "}
            directly.
          </p>
        )}
      </div>
    </form>
  );
}
