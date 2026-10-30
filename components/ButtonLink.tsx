import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "solid" | "outline" | "ghost";

const base =
  "inline-flex items-center justify-center gap-3 px-6 py-3.5 text-xs font-extrabold uppercase tracking-[0.25em] transition-colors duration-150";

const variants: Record<Variant, string> = {
  solid: "bg-accent text-accent-ink hover:bg-accent-hover",
  outline: "border-2 border-text text-text hover:border-accent hover:text-accent",
  ghost: "border-2 border-accent text-accent hover:bg-accent hover:text-accent-ink",
};

type Props = ComponentProps<"a"> & { href: string; variant?: Variant; children: ReactNode };

/** Button-styled link. Internal routes ("/…") go through next/link. */
export default function ButtonLink({ variant = "solid", className = "", href, children, ...props }: Props) {
  const classes = `${base} ${variants[variant]} ${className}`;
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={classes} {...props}>
      {children}
    </a>
  );
}
