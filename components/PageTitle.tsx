import type { ReactNode } from "react";

/** Oversized sub-page title in the "misprint" outline style, with an optional intro. */
export default function PageTitle({ children, intro }: { children: ReactNode; intro?: ReactNode }) {
  return (
    <header className="mx-auto max-w-[1440px] px-4 pt-32 pb-12 md:px-8 md:pt-40 lg:px-12">
      <h1 className="misprint font-display text-[clamp(4.5rem,17vw,13rem)] leading-[0.82] tracking-tight uppercase">
        {children}
      </h1>
      {intro && <p className="mt-8 max-w-xl text-lg leading-relaxed text-text-muted">{intro}</p>}
    </header>
  );
}
