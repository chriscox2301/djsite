"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navLinks } from "@/data/site";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";
import ButtonLink from "./ButtonLink";
import { CloseIcon, MenuIcon } from "./icons";

const OFFSET = 140;
const sections = navLinks.flatMap((link) => (link.section ? [link.section] : []));

/** Pick the home-page section whose top has most recently scrolled past the navbar. */
function findActiveSection(): string {
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
    return sections[sections.length - 1];
  }
  let best = { id: sections[0], top: -Infinity };
  for (const id of sections) {
    const top = document.getElementById(id)?.getBoundingClientRect().top;
    if (top !== undefined && top <= OFFSET && top > best.top) best = { id, top };
  }
  return best.id;
}

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [section, setSection] = useState(sections[0]);
  const [open, setOpen] = useState(false);
  // After a nav click, ignore scroll-spy until the smooth scroll has settled.
  const locked = useRef(false);
  const unlockTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!isHome) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!locked.current) setSection(findActiveSection());
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.matchMedia("(min-width: 1024px)").matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const isActive = (link: (typeof navLinks)[number]) =>
    link.section ? isHome && section === link.section : pathname === link.href;

  const select = (link: (typeof navLinks)[number]) => {
    setOpen(false);
    if (!link.section || !isHome) return;
    locked.current = true;
    window.clearTimeout(unlockTimer.current);
    unlockTimer.current = window.setTimeout(() => (locked.current = false), 1200);
    setSection(link.section);
  };

  const bookingCurrent = pathname === "/booking";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-[1440px] items-center justify-between gap-6 px-4 md:px-8 lg:px-12">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-10">
            {navLinks.map((link) => {
              const active = isActive(link);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => select(link)}
                    aria-current={active ? (link.section ? "location" : "page") : undefined}
                    className={`relative py-2 text-xs font-bold uppercase tracking-[0.22em] transition-colors hover:text-accent ${
                      active ? "text-accent" : "text-text"
                    }`}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 -bottom-1 h-[3px] bg-accent transition-transform duration-200 ${
                        active ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <SocialLinks />
          <ButtonLink
            href="/booking"
            variant={bookingCurrent ? "solid" : "ghost"}
            aria-current={bookingCurrent ? "page" : undefined}
            className={bookingCurrent ? "border-2 border-accent px-6 py-3" : "px-6 py-3"}
          >
            Book now
          </ButtonLink>
        </div>

        <button
          type="button"
          className="grid size-11 place-items-center border border-border-strong text-text transition-colors hover:border-accent hover:text-accent lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      <div id="mobile-menu" hidden={!open} className="border-t border-border bg-bg px-4 pt-4 pb-8 md:px-8 lg:hidden">
        <nav aria-label="Mobile">
          <ul className="flex flex-col">
            {navLinks.map((link) => {
              const active = isActive(link);
              return (
                <li key={link.href} className="border-b border-border">
                  <Link
                    href={link.href}
                    onClick={() => select(link)}
                    aria-current={active ? (link.section ? "location" : "page") : undefined}
                    className={`flex items-center gap-4 py-4 font-display text-3xl uppercase tracking-wider ${
                      active ? "text-accent" : "text-text"
                    }`}
                  >
                    <span aria-hidden="true" className={`h-[3px] bg-accent transition-all ${active ? "w-6" : "w-0"}`} />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <SocialLinks className="-ml-2" />
          <ButtonLink href="/booking" variant="ghost" onClick={() => setOpen(false)}>
            Book now
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
