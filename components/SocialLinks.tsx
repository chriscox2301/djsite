import { socials } from "@/data/site";
import { socialIcons } from "./icons";

export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-1 ${className}`}>
      {socials.map(({ platform, label, url }) => {
        const Icon = socialIcons[platform];
        return (
          <li key={platform}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`MHENNEKE on ${label} (opens in a new tab)`}
              className="grid size-10 place-items-center text-text transition-colors hover:text-accent"
            >
              <Icon />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
