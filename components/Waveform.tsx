/** Static waveform: deterministic pseudo-random bars, the played part in turquoise. */
function bars(count: number, seed = 7) {
  let s = seed;
  const rand = () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
  return Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1);
    // Louder in the middle, with "drops" every so often
    const envelope = 0.35 + 0.65 * Math.sin(Math.PI * t) ** 0.6;
    const drop = i % 23 < 2 ? 0.35 : 1;
    return Math.max(0.08, envelope * drop * (0.35 + 0.65 * rand()));
  });
}

export default function Waveform({ progress, count = 120 }: { progress: number; count?: number }) {
  const heights = bars(count);
  const played = Math.round(progress * count);

  return (
    <div aria-hidden="true" className="flex h-16 w-full items-center gap-px overflow-hidden sm:gap-[2px]">
      {heights.map((h, i) => (
        <span
          key={i}
          className={`min-w-0 flex-1 ${i < played ? "bg-accent" : "bg-border-strong"}`}
          style={{ height: `${Math.round(h * 100)}%` }}
        />
      ))}
    </div>
  );
}
