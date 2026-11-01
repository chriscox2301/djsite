import type { ComponentProps } from "react";

/** Dark panel with a hard border, used for the player and the three content cards. */
export default function Card({ className = "", ...props }: ComponentProps<"section">) {
  return <section className={`relative border border-border bg-surface ${className}`} {...props} />;
}
