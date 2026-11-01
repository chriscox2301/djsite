"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Mix } from "@/data/site";
import Card from "./Card";
import Waveform from "./Waveform";
import { ArrowRightIcon, PauseIcon, PlayIcon, ShareIcon } from "./icons";

type Source =
  | { kind: "none" }
  | { kind: "audio"; src: string }
  | { kind: "embed"; src: string; title: string }
  | { kind: "link"; href: string };

/** Work out how `mix.url` can be played: a direct audio file, a known embed, or just a link out. */
function getSource(mix: Mix): Source {
  const url = mix.url?.trim();
  if (!url) return { kind: "none" };
  if (/\.(mp3|m4a|aac|ogg|oga|opus|wav|flac)(\?.*)?$/i.test(url)) return { kind: "audio", src: url };
  if (/^https:\/\/(www\.|m\.)?soundcloud\.com\//i.test(url)) {
    return {
      kind: "embed",
      title: `${mix.title} on SoundCloud`,
      src: `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%2322e5d8&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&visual=false`,
    };
  }
  if (/^https:\/\/(www\.)?mixcloud\.com\//i.test(url)) {
    const path = new URL(url).pathname;
    return {
      kind: "embed",
      title: `${mix.title} on Mixcloud`,
      src: `https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&dark=1&feed=${encodeURIComponent(path)}`,
    };
  }
  return { kind: "link", href: url };
}

const iconButton = "grid size-11 place-items-center text-text-muted transition-colors hover:text-accent";

/**
 * Latest mix. Without `mix.url` it only shows the cover, title and an idle
 * waveform: no controls that pretend to do something. With a url it plays a
 * direct audio file through <audio>, or shows the SoundCloud / Mixcloud embed,
 * or links out for any other page.
 */
export default function MixPlayer({ mix }: { mix: Mix }) {
  const source = getSource(mix);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [shareNote, setShareNote] = useState("");

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) void audio.play().catch(() => setPlaying(false));
    else audio.pause();
  }

  async function share() {
    if (!mix.url) return;
    const data = { title: `${mix.title} — ${mix.artist}`, url: mix.url };
    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(mix.url);
      setShareNote("Link copied");
    } catch (err) {
      if ((err as DOMException)?.name !== "AbortError") setShareNote("Could not share the link");
    }
    window.setTimeout(() => setShareNote(""), 2500);
  }

  return (
    <Card id="music" aria-labelledby="mix-title" className="p-4 sm:p-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-8">
        <div className="flex items-center gap-5 md:w-[38%] md:shrink-0">
          <div className="relative size-24 shrink-0 overflow-hidden border border-border-strong sm:size-28">
            <Image src={mix.cover} alt={mix.coverAlt} fill sizes="112px" className="object-cover" />
            {source.kind === "audio" && (
              <button
                type="button"
                onClick={togglePlay}
                aria-pressed={playing}
                aria-label={`Play ${mix.title}`}
                className="absolute inset-0 m-auto grid size-12 place-items-center rounded-full border-2 border-text bg-bg/70 text-text transition-colors hover:border-accent hover:bg-accent hover:text-accent-ink"
              >
                {playing ? <PauseIcon width={16} height={16} /> : <PlayIcon width={16} height={16} className="translate-x-px" />}
              </button>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold tracking-eyebrow text-text-subtle uppercase">{mix.label}</p>
            <h2 id="mix-title" className="mt-2 font-display text-2xl leading-tight tracking-wider uppercase sm:text-3xl">
              {mix.title}
            </h2>
            <p className="mt-1.5 text-sm text-text-muted">
              {mix.artist}
              <span aria-hidden="true" className="px-2">
                ·
              </span>
              <span className="sr-only">Duration </span>
              <time dateTime={`PT${mix.duration.replace(":", "M")}S`}>{mix.duration}</time>
            </p>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          {source.kind === "embed" ? (
            <iframe
              src={source.src}
              title={source.title}
              loading="lazy"
              allow="autoplay"
              className="block h-[120px] w-full border-0"
            />
          ) : (
            <Waveform progress={source.kind === "audio" ? progress : 0} />
          )}
          {source.kind === "audio" && (
            <audio
              ref={audioRef}
              src={source.src}
              preload="metadata"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
              onTimeUpdate={(e) => {
                const a = e.currentTarget;
                if (a.duration) setProgress(a.currentTime / a.duration);
              }}
            />
          )}
        </div>

        {source.kind !== "none" && (
          <div className="flex items-center gap-1 self-end md:self-auto">
            {source.kind === "link" && (
              <a
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 px-2 text-xs font-bold tracking-label text-accent uppercase hover:text-accent-hover"
              >
                Listen
                <span className="sr-only"> to {mix.title} (opens in a new tab)</span>
                <ArrowRightIcon width={14} height={14} />
              </a>
            )}
            <button type="button" onClick={share} aria-label={`Share ${mix.title}`} className={iconButton}>
              <ShareIcon />
            </button>
            <span role="status" className="text-xs text-text-muted">
              {shareNote}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}
