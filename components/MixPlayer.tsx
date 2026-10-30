"use client";

import Image from "next/image";
import { useState } from "react";
import type { Mix } from "@/data/site";
import Card from "./Card";
import Waveform from "./Waveform";
import { HeartIcon, MoreIcon, PauseIcon, PlayIcon, ShareIcon } from "./icons";

/**
 * Visual-only player. Play / like toggle their own state but no audio is
 * connected yet — wire `mix.url` to an embed or <audio> element later.
 */
export default function MixPlayer({ mix }: { mix: Mix }) {
  const [playing, setPlaying] = useState(false);
  const [liked, setLiked] = useState(false);

  const iconButton =
    "grid size-10 place-items-center text-text-muted transition-colors hover:text-accent";

  return (
    <Card id="music" aria-labelledby="mix-title" className="p-4 sm:p-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-8">
        <div className="flex items-center gap-5 md:w-[38%] md:shrink-0">
          <div className="relative size-24 shrink-0 overflow-hidden border border-border-strong sm:size-28">
            <Image src={mix.cover} alt={mix.coverAlt} fill sizes="112px" className="object-cover" />
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-pressed={playing}
              aria-label={playing ? `Pause ${mix.title}` : `Play ${mix.title}`}
              className="absolute inset-0 m-auto grid size-12 place-items-center rounded-full border-2 border-text bg-bg/70 text-text transition-colors hover:border-accent hover:bg-accent hover:text-accent-ink"
            >
              {playing ? <PauseIcon width={16} height={16} /> : <PlayIcon width={16} height={16} className="translate-x-px" />}
            </button>
          </div>
          <div className="min-w-0">
            <p className="text-[0.7rem] font-bold tracking-[0.45em] text-text-subtle uppercase">{mix.label}</p>
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
          <Waveform progress={mix.progress} />
        </div>

        <div className="flex items-center gap-1 self-end md:self-auto">
          <button
            type="button"
            onClick={() => setLiked((l) => !l)}
            aria-pressed={liked}
            aria-label={`Like ${mix.title}`}
            className={`${iconButton} ${liked ? "text-accent" : ""}`}
          >
            <HeartIcon fill={liked ? "currentColor" : "none"} />
          </button>
          <button type="button" aria-label={`Share ${mix.title}`} className={iconButton}>
            <ShareIcon />
          </button>
          <button type="button" aria-label="More options" className={iconButton}>
            <MoreIcon />
          </button>
        </div>
      </div>
    </Card>
  );
}
