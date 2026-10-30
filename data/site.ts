/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  All site content for MHENNEKE lives in this file.
 *
 *  Everything marked `PLACEHOLDER` is dummy content. It is NOT real information
 *  about MHENNEKE and must be replaced before the site goes live.
 *  Search this file for "PLACEHOLDER" to find every value that still needs
 *  real data.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type SocialPlatform = "instagram" | "soundcloud" | "spotify" | "youtube";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  url: string;
};

export type Gig = {
  id: string;
  /** ISO date, e.g. "2026-11-14" */
  date: string;
  event: string;
  venue: string;
  city: string;
  /** Optional ticket / event page */
  url?: string;
};

export type Mix = {
  label: string;
  title: string;
  artist: string;
  /** Display duration, e.g. "60:00" */
  duration: string;
  cover: string;
  coverAlt: string;
  /** 0–1: how much of the waveform is shown as "played" */
  progress: number;
  url?: string;
};

export type HeroSlide = {
  image: string;
  alt: string;
};

export const artist = {
  // Known facts
  name: "MHENNEKE",
  role: "DJ / Producer",
  genre: "Hardcore",

  // PLACEHOLDER — only "Hardcore" is confirmed; the other tags are examples.
  genreTags: ["Hardcore", "Uptempo", "Industrial", "Raw energy"],

  // PLACEHOLDER — short intro text in the hero.
  intro:
    "Placeholder intro: relentless kicks, distorted leads and full-throttle energy. Replace this text with MHENNEKE's own words.",

  // PLACEHOLDER — booking contact.
  bookingEmail: "booking@example.com",
};

// PLACEHOLDER — replace each url with the real profile link.
export const socials: SocialLink[] = [
  { platform: "instagram", label: "Instagram", url: "https://www.instagram.com/" },
  { platform: "soundcloud", label: "SoundCloud", url: "https://soundcloud.com/" },
  { platform: "spotify", label: "Spotify", url: "https://open.spotify.com/" },
  { platform: "youtube", label: "YouTube", url: "https://www.youtube.com/" },
];

// Hero background slides (driven by the 01/02/03 indicator).
// PLACEHOLDER — procedurally generated images, see scripts/generate-placeholders.mjs.
export const heroSlides: HeroSlide[] = [
  { image: "/images/hero-1.jpg", alt: "View from behind the decks towards a crowd under turquoise lasers (placeholder image)" },
  { image: "/images/hero-2.jpg", alt: "Crowd with raised hands under crossing turquoise laser beams (placeholder image)" },
  { image: "/images/hero-3.jpg", alt: "Stage with a bright white strobe light above the crowd (placeholder image)" },
];

// PLACEHOLDER — dummy mix. No real audio is connected yet.
export const latestMix: Mix = {
  label: "Latest mix",
  title: "Demo Mix #01",
  artist: "MHENNEKE",
  duration: "60:00",
  cover: "/images/mix-cover.jpg",
  coverAlt: "Cover art for the demo mix: crowd under turquoise beams (placeholder image)",
  progress: 0.72,
};

// PLACEHOLDER — dummy gigs. Event names, venues and cities are not real.
export const gigs: Gig[] = [
  { id: "gig-1", date: "2026-11-14", event: "Sample Event One", venue: "Venue TBA", city: "City TBA" },
  { id: "gig-2", date: "2026-11-28", event: "Sample Event Two", venue: "Venue TBA", city: "City TBA" },
  { id: "gig-3", date: "2026-12-12", event: "Sample Event Three", venue: "Venue TBA", city: "City TBA" },
];

export const gigsCta = {
  label: "View all",
  // PLACEHOLDER — link to a full gig list / agenda page.
  url: "#gigs",
};

// Atmosphere card between Gigs and About.
export const atmosphere = {
  // PLACEHOLDER — procedurally generated image.
  image: "/images/crowd.jpg",
  alt: "Black-and-white crowd with raised hands under white stage lights (placeholder image)",
  // Handwritten accent lines (feel free to change).
  accent: ["Louder.", "Faster.", "Harder."],
};

export const about = {
  title: "About",
  // PLACEHOLDER — dummy bio. Replace with MHENNEKE's real story.
  bio: "Placeholder bio. This is where MHENNEKE's story goes: background, sound, influences and what a set feels like. Keep it to three or four sentences so the card stays compact.",
  ctaLabel: "More about me",
  ctaUrl: "/about",
  // PLACEHOLDER — procedurally generated image.
  image: "/images/about.jpg",
  imageAlt: "Lone figure in turquoise smoke between two speaker stacks (placeholder image)",
  sideNote: ["No sleep", "Full speed"],
};

/**
 * Main navigation. Links with a `section` scroll to that section on the home
 * page (and highlight while it is in view); the others are separate pages.
 */
export const navLinks: { label: string; href: string; section?: string }[] = [
  { label: "Home", href: "/", section: "home" },
  { label: "Music", href: "/#music", section: "music" },
  { label: "Gigs", href: "/#gigs", section: "gigs" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact", section: "contact" },
];

// ─── /about page ────────────────────────────────────────────────────────────

export const aboutPage = {
  // PLACEHOLDER — long bio, one string per paragraph.
  bio: [
    "Placeholder paragraph. Start with who MHENNEKE is and where the story began: the first party, the first record, the moment hardcore clicked.",
    "Placeholder paragraph. Describe the sound in plain words: tempo, kicks, the records that always make the bag, and what sets a MHENNEKE set apart from the rest of the line-up.",
    "Placeholder paragraph. Close with what is happening now: residencies, releases, collaborations or the next big stage.",
  ],
  // PLACEHOLDER — a line in MHENNEKE's own words, shown handwritten.
  quote: "Placeholder quote in MHENNEKE's own words.",
  // PLACEHOLDER — every value below is unknown and must be filled in.
  facts: [
    { label: "Based in", value: "TBA" },
    { label: "Sound", value: "Hardcore" },
    { label: "Plays", value: "TBA (e.g. club, festival, warehouse)" },
    { label: "Active since", value: "TBA" },
    { label: "Set length", value: "TBA" },
  ],
  // PLACEHOLDER — procedurally generated images; swap for press photos.
  photos: [
    { src: "/images/hero-2.jpg", alt: "Crowd under crossing turquoise lasers (placeholder image)" },
    { src: "/images/crowd.jpg", alt: "Black-and-white crowd with raised hands (placeholder image)" },
    { src: "/images/hero-3.jpg", alt: "Stage with a white strobe above the crowd (placeholder image)" },
  ],
  // PLACEHOLDER — leave empty until there is a real press kit (zip/pdf/drive link).
  pressKitUrl: "",
};

// ─── /booking page ──────────────────────────────────────────────────────────

export const bookingPage = {
  // PLACEHOLDER — intro copy.
  intro:
    "Tell us about your event and we will get back to you with availability and a quote. The form opens a pre-filled email, so nothing is stored on this site.",
  // PLACEHOLDER — set lengths offered.
  setLengths: ["60 minutes", "90 minutes", "120 minutes", "Other"],
  // PLACEHOLDER — practical info shown next to the form. Not confirmed by MHENNEKE.
  info: [
    {
      title: "Sets",
      body: "Placeholder: which set lengths and formats are available, and whether closing or b2b sets are an option.",
    },
    {
      title: "Tech rider",
      body: "Placeholder: required players, mixer and booth monitoring. Send the full rider on request.",
    },
    {
      title: "Response time",
      body: "Placeholder: how quickly booking requests are answered.",
    },
  ],
};

/** Format an ISO date as { day: "14", month: "NOV" } without timezone drift. */
export function splitDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return {
    day: String(d).padStart(2, "0"),
    month: date.toLocaleString("en-GB", { month: "short", timeZone: "UTC" }).toUpperCase(),
  };
}
