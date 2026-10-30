"use client";

import { useEffect, useRef, useState } from "react";
import { navLinks } from "@/data/site";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";
import ButtonLink from "./ButtonLink";
import { CloseIcon, MenuIcon } from "./icons";

type SectionId = (typeof navLinks)[number]["id"];

const OFFSET = 140;

/** Pick the section whose top has most recently scrolled past the navbar. */
function findActive(current: SectionId): SectionId {
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
    return navLinks[navLinks.length - 1].id;
  }
  let best: { id: SectionId; top: number }[] = [];
  for (const { id } of navLinks) {
    const el = document.getElementById(id);
    if (!el) continue;
    const top = Math.round(el.getBoundingClientRect().top);
    if (top > OFFSET) continue;
    if (!best.length || top > best[0].top) best = [{ id, top }];
    else if (top === best[0].top) best.push({ id, top });
  }
  if (!best.length) return navLinks[0].id;
  // Sections side by side (Gigs + About on desktop) share a top: keep the current one.
  return best.find((b) => b.id === current)?.id ?? best[0].id;
}

export default function Navbar() {
  const [active, setActive] = useState<SectionId>("home");
  const [open, setOpen] = useState(false);
  // After a nav click, ignore scroll-spy until the smooth scroll has settled.
  const locked = useRef(false);
  const unlockTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (locked.current) return;
        setActive((current) => findActive(current));
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
  }, []);

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

  const select = (id: SectionId) => {
    locked.current = true;
    window.clearTimeout(unlockTimer.current);
    unlockTimer.current = window.setTimeout(() => (locked.current = false), 1200);
    setActive(id);
    setOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-[1440px] items-center justify-between gap-6 px-4 md:px-8 lg:px-12">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-10">
            {navLinks.map(({ id, label }) => {
              const isActive = active === id;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={() => select(id)}
                    aria-current={isActive ? "location" : undefined}
                    className={`relative py-2 text-xs font-bold uppercase tracking-[0.22em] transition-colors hover:text-accent ${
                      isActive ? "text-accent" : "text-text"
                    }`}
                  >
                    {label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 -bottom-1 h-[3px] bg-accent transition-transform duration-200 ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <SocialLinks />
          <ButtonLink href="#contact" variant="ghost" className="px-6 py-3" onClick={() => select("contact")}>
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

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-border bg-bg px-4 pt-4 pb-8 md:px-8 lg:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col">
            {navLinks.map(({ id, label }) => {
              const isActive = active === id;
              return (
                <li key={id} className="border-b border-border">
                  <a
                    href={`#${id}`}
                    onClick={() => select(id)}
                    aria-current={isActive ? "location" : undefined}
                    className={`flex items-center gap-4 py-4 font-display text-3xl uppercase tracking-wider ${
                      isActive ? "text-accent" : "text-text"
                    }`}
                  >
                    <span aria-hidden="true" className={`h-[3px] bg-accent transition-all ${isActive ? "w-6" : "w-0"}`} />
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <SocialLinks className="-ml-2" />
          <ButtonLink href="#contact" variant="ghost" onClick={() => select("contact")}>
            Book now
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
