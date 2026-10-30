import type { SVGProps } from "react";
import type { SocialPlatform } from "@/data/site";

type IconProps = SVGProps<SVGSVGElement>;

// Simple, self-drawn glyphs. They are decorative: the surrounding link/button
// always carries the accessible name, so every icon is aria-hidden.
function Svg({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </Svg>
  );
}

export function SoundCloudIcon(props: IconProps) {
  return (
    <Svg {...props} strokeWidth="1.6">
      <path d="M10 17V9.5a5 5 0 0 1 9.4 2.3A3 3 0 0 1 19 17Z" fill="currentColor" stroke="none" />
      <path d="M8 17v-6M6 17v-5M4 17v-3M2 17v-1.5" />
    </Svg>
  );
}

export function SpotifyIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9.5" fill="currentColor" stroke="none" />
      <g stroke="var(--color-bg)" strokeWidth="1.8">
        <path d="M7 9.3c3.4-1 7.3-.7 10 .9" />
        <path d="M7.6 12.4c2.8-.8 5.8-.5 8.1.8" />
        <path d="M8.2 15.3c2.2-.6 4.4-.4 6.2.6" />
      </g>
    </Svg>
  );
}

export function YouTubeIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="2" y="5" width="20" height="14" rx="4" fill="currentColor" stroke="none" />
      <path d="M10 9v6l5-3Z" fill="var(--color-bg)" stroke="none" />
    </Svg>
  );
}

export const socialIcons: Record<SocialPlatform, (props: IconProps) => React.JSX.Element> = {
  instagram: InstagramIcon,
  soundcloud: SoundCloudIcon,
  spotify: SpotifyIcon,
  youtube: YouTubeIcon,
};

export function PlayIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M7 4.5v15l12-7.5Z" fill="currentColor" />
    </Svg>
  );
}

export function PauseIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M7 5v14M17 5v14" strokeWidth="3.5" strokeLinecap="square" />
    </Svg>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.2 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z" />
    </Svg>
  );
}

export function ShareIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="18" cy="5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <path d="m8.2 10.8 7.6-4.5M8.2 13.2l7.6 4.5" />
    </Svg>
  );
}

export function MoreIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="5" cy="12" r="1" fill="currentColor" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <circle cx="19" cy="12" r="1" fill="currentColor" />
    </Svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 5v14M5 12h14" />
    </Svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </Svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="square" />
    </Svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 5l14 14M19 5 5 19" strokeLinecap="square" />
    </Svg>
  );
}
