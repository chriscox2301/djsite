import type { ComponentProps, ReactNode } from "react";

/** Dark panel with a hard border, used for the player and the three content cards. */
export default function Card({ className = "", ...props }: ComponentProps<"section">) {
  return <section className={`relative border border-border bg-surface ${className}`} {...props} />;
}

export function CardHeading({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2 id={id} className="font-display text-2xl tracking-[0.18em] sm:text-3xl text-text uppercase">
      {children}
    </h2>
  );
}
