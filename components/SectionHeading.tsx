import type { ReactNode } from "react";

/**
 * The one section heading style: used for card titles on the home page and
 * the section titles on /about and /booking. (Page titles use PageTitle, the
 * artist name uses its own display size.)
 */
export const sectionHeadingClass = "font-display text-2xl tracking-heading text-text uppercase sm:text-3xl";

export default function SectionHeading({
  id,
  as: Tag = "h2",
  className = "",
  children,
}: {
  id?: string;
  as?: "h2" | "h3";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag id={id} className={`${sectionHeadingClass} ${className}`}>
      {children}
    </Tag>
  );
}
