/**
 * Generates the local placeholder images in /public/images.
 *
 * All images are procedurally drawn (SVG → JPG via sharp, which ships with
 * Next.js). No stock or third-party photos are used, so there are no licence
 * restrictions. Replace the files in /public/images with real photos later
 * (keep the same filenames, or update the paths in data/site.ts).
 *
 * Run: node scripts/generate-placeholders.mjs
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outDir = path.join(root, "public", "images");

const TEAL = "#2fe8dc";

function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function beams(r, { w, h, count, originX, originY, spread, color, opacity }) {
  let out = "";
  for (let i = 0; i < count; i++) {
    const ox = originX + (r() - 0.5) * w * 0.15;
    const tx = originX + (r() - 0.5) * spread;
    const width = 6 + r() * 26;
    const o = opacity * (0.4 + r() * 0.6);
    out += `<polygon points="${ox},${originY} ${ox + 3},${originY} ${tx + width},${h} ${tx - width},${h}" fill="${color}" opacity="${o.toFixed(2)}" filter="url(#blur-s)"/>`;
    out += `<line x1="${ox}" y1="${originY}" x2="${tx}" y2="${h}" stroke="${color}" stroke-width="1.5" opacity="${(o * 1.6).toFixed(2)}"/>`;
  }
  return out;
}

function crowd(r, { w, h, top, rows, fill, rim, armChance }) {
  let out = "";
  for (let row = 0; row < rows; row++) {
    const t = row / Math.max(1, rows - 1);
    const rowGap = ((h - top) * 0.85) / Math.max(1, rows - 1);
    const y = top + t * (h - top) * 0.85;
    const scale = 0.45 + t * 1.25;
    const step = 26 * scale;
    const shade = mix(fill, "#0b2826", (1 - t) * 0.25);
    for (let x = -step + r() * step; x < w + step; x += step * (0.7 + r() * 0.6)) {
      const hy = y + (r() - 0.5) * rowGap * 0.7;
      const hr = 11 * scale * (0.85 + r() * 0.3);
      // shoulders + body
      const bottom = row >= rows - 2 ? h : y + rowGap * 1.8;
      out += `<path d="M${x - hr * 2.4},${bottom} L${x - hr * 2.2},${hy + hr * 1.9} Q${x},${hy + hr * 0.9} ${x + hr * 2.2},${hy + hr * 1.9} L${x + hr * 2.4},${bottom} Z" fill="${shade}"/>`;
      out += `<ellipse cx="${x}" cy="${hy}" rx="${hr * 0.9}" ry="${hr}" fill="${shade}" stroke="${rim}" stroke-opacity="${row === 0 ? 0.35 : 0}" stroke-width="1.5"/>`;
      if (r() < armChance) {
        const side = r() < 0.5 ? -1 : 1;
        const sx = x + side * hr * 1.6;
        const sy = hy + hr * 1.6;
        const len = hr * (4 + r() * 2.5);
        const ang = (-90 + side * (5 + r() * 30)) * (Math.PI / 180);
        const ex = sx + Math.cos(ang) * len;
        const ey = sy + Math.sin(ang) * len;
        out += `<line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="${rim}" stroke-opacity="${row === 0 ? 0.3 : 0}" stroke-width="${hr * 0.55 + 3}" stroke-linecap="round"/>`;
        out += `<line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="${shade}" stroke-width="${hr * 0.55}" stroke-linecap="round"/>`;
        out += `<circle cx="${ex}" cy="${ey}" r="${hr * 0.5}" fill="${shade}"/>`;
        if (r() < 0.35) {
          // second arm
          const ex2 = x - side * hr * 1.6 + Math.cos(ang + side * 0.5) * len * 0.9;
          out += `<line x1="${x - side * hr * 1.6}" y1="${sy}" x2="${ex2}" y2="${ey + 8}" stroke="${shade}" stroke-width="${hr * 0.55}" stroke-linecap="round"/>`;
        }
      }
    }
  }
  return out;
}

function mix(a, b, t) {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return (
    "#" +
    pa
      .map((v, i) => Math.round(v + (pb[i] - v) * t).toString(16).padStart(2, "0"))
      .join("")
  );
}

function djBooth({ cx, top, w, h, r }) {
  let out = `<polygon points="${cx - w * 0.42},${top} ${cx + w * 0.42},${top} ${cx + w * 0.5},${top + 70} ${cx - w * 0.5},${top + 70}" fill="#05100f" stroke="${TEAL}" stroke-opacity=".35"/>`;
  out += `<rect x="${cx - w * 0.5}" y="${top + 70}" width="${w}" height="${h - top}" fill="#020505"/>`;
  // jog wheels
  out += `<ellipse cx="${cx - w * 0.28}" cy="${top + 36}" rx="${w * 0.1}" ry="18" fill="none" stroke="${TEAL}" stroke-opacity=".7" stroke-width="2"/>`;
  out += `<ellipse cx="${cx + w * 0.28}" cy="${top + 36}" rx="${w * 0.1}" ry="18" fill="none" stroke="${TEAL}" stroke-opacity=".7" stroke-width="2"/>`;
  for (let i = 0; i < 40; i++) {
    const x = cx - w * 0.12 + r() * w * 0.24;
    const y = top + 12 + r() * 50;
    out += `<rect x="${x}" y="${y}" width="5" height="3" fill="${r() < 0.7 ? TEAL : "#ffffff"}" opacity="${(0.4 + r() * 0.6).toFixed(2)}"/>`;
  }
  return out;
}

function defs(seed) {
  return `<defs>
    <filter id="blur-s" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="6"/></filter>
    <filter id="blur-l" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="60"/></filter>
    <filter id="rim" x="-10%" y="-10%" width="120%" height="120%">
      <feMorphology in="SourceAlpha" operator="dilate" radius="2" result="d"/>
      <feFlood flood-color="${TEAL}" flood-opacity=".55"/>
      <feComposite in2="d" operator="in" result="edge"/>
      <feGaussianBlur in="edge" stdDeviation="3" result="glow"/>
      <feMerge><feMergeNode in="glow"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="${seed}"/><feColorMatrix type="saturate" values="0"/></filter>
    <radialGradient id="vignette" cx="50%" cy="45%" r="75%">
      <stop offset="55%" stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000" stop-opacity=".85"/>
    </radialGradient>
  </defs>`;
}

function scene({ w, h, seed, glow, beamSets, crowdOpts, extras = "", fg = "" }) {
  const r = rng(seed);
  let body = `<rect width="${w}" height="${h}" fill="#020607"/>`;
  for (const g of glow) {
    body += `<ellipse cx="${g.x}" cy="${g.y}" rx="${g.rx}" ry="${g.ry}" fill="${g.color}" opacity="${g.o}" filter="url(#blur-l)"/>`;
  }
  for (const b of beamSets) body += beams(r, { w, h, ...b });
  if (crowdOpts) {
    body += `<ellipse cx="${w / 2}" cy="${crowdOpts.top}" rx="${w * 0.6}" ry="${h * 0.12}" fill="${crowdOpts.rim}" opacity=".28" filter="url(#blur-l)"/>`;
    body += `<linearGradient id="haze" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${crowdOpts.rim}" stop-opacity=".22"/><stop offset="1" stop-color="${crowdOpts.rim}" stop-opacity=".04"/></linearGradient>`;
    body += `<rect x="0" y="${crowdOpts.top}" width="${w}" height="${h - crowdOpts.top}" fill="url(#haze)"/>`;
  }
  body += extras;
  if (crowdOpts) body += crowd(r, { w, h, ...crowdOpts });
  body += fg;
  body += `<rect width="${w}" height="${h}" fill="url(#vignette)"/>`;
  body += `<rect width="${w}" height="${h}" filter="url(#grain)" opacity=".13"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${defs(seed)}${body}</svg>`;
}

const crowdDefaults = { fill: "#010303", rim: TEAL, armChance: 0.35 };

const images = {
  // Hero slide 1: view from behind the decks, crowd + teal beams
  "hero-1.jpg": (() => {
    const w = 1920, h = 1080, r = rng(11);
    return scene({
      w, h, seed: 11,
      glow: [
        { x: 1250, y: 260, rx: 520, ry: 300, color: TEAL, o: 0.35 },
        { x: 700, y: 120, rx: 380, ry: 160, color: "#1aa39b", o: 0.25 },
      ],
      beamSets: [
        { count: 14, originX: 1150, originY: -40, spread: 1900, color: TEAL, opacity: 0.22 },
        { count: 6, originX: 650, originY: -20, spread: 1200, color: "#bffcf8", opacity: 0.1 },
      ],
      extras: `<rect x="1720" y="80" width="200" height="520" fill="#030909" stroke="${TEAL}" stroke-opacity=".15"/><rect x="560" y="60" width="150" height="280" fill="#030909" opacity=".8"/>`,
      crowdOpts: { ...crowdDefaults, top: 470, rows: 6 },
      fg: djBooth({ cx: 1250, top: 830, w: 1300, h, r }),
    });
  })(),
  // Hero slide 2: wide crowd + crossing beams
  "hero-2.jpg": scene({
    w: 1920, h: 1080, seed: 23,
    glow: [
      { x: 1000, y: 200, rx: 700, ry: 260, color: TEAL, o: 0.3 },
      { x: 1500, y: 600, rx: 300, ry: 200, color: "#0d6d68", o: 0.4 },
    ],
    beamSets: [
      { count: 10, originX: 600, originY: -30, spread: 2600, color: TEAL, opacity: 0.25 },
      { count: 10, originX: 1500, originY: -30, spread: 2600, color: TEAL, opacity: 0.25 },
    ],
    crowdOpts: { ...crowdDefaults, top: 520, rows: 7, armChance: 0.5 },
  }),
  // Hero slide 3: white strobe + stage
  "hero-3.jpg": scene({
    w: 1920, h: 1080, seed: 37,
    glow: [
      { x: 1200, y: 380, rx: 420, ry: 420, color: "#e8fffd", o: 0.22 },
      { x: 1200, y: 380, rx: 700, ry: 500, color: TEAL, o: 0.22 },
    ],
    beamSets: [{ count: 18, originX: 1200, originY: 360, spread: 3400, color: "#d9fffb", opacity: 0.12 }],
    extras: `<rect x="900" y="560" width="600" height="40" fill="#030909"/><rect x="200" y="140" width="180" height="600" fill="#030909"/><rect x="1580" y="140" width="180" height="600" fill="#030909"/>`,
    crowdOpts: { ...crowdDefaults, top: 600, rows: 6, armChance: 0.55 },
  }),
  // Mix cover (square)
  "mix-cover.jpg": scene({
    w: 600, h: 600, seed: 5,
    glow: [{ x: 300, y: 120, rx: 260, ry: 160, color: TEAL, o: 0.5 }],
    beamSets: [{ count: 12, originX: 300, originY: -20, spread: 1100, color: TEAL, opacity: 0.35 }],
    crowdOpts: { ...crowdDefaults, top: 380, rows: 4, armChance: 0.55 },
  }),
  // Atmosphere card (rendered grayscale in CSS)
  "crowd.jpg": scene({
    w: 1000, h: 760, seed: 71,
    glow: [{ x: 500, y: 80, rx: 400, ry: 200, color: "#ffffff", o: 0.28 }],
    beamSets: [
      { count: 9, originX: 380, originY: -20, spread: 1600, color: "#ffffff", opacity: 0.22 },
      { count: 9, originX: 640, originY: -20, spread: 1600, color: "#ffffff", opacity: 0.22 },
    ],
    crowdOpts: { fill: "#030303", rim: "#ffffff", top: 420, rows: 5, armChance: 0.6 },
  }),
  // About card side image (portrait)
  "about.jpg": scene({
    w: 500, h: 860, seed: 91,
    glow: [
      { x: 250, y: 300, rx: 260, ry: 340, color: TEAL, o: 0.42 },
      { x: 250, y: 120, rx: 140, ry: 120, color: "#e8fffd", o: 0.25 },
    ],
    beamSets: [{ count: 8, originX: 250, originY: 100, spread: 1400, color: TEAL, opacity: 0.25 }],
    extras: `<rect x="0" y="180" width="110" height="520" fill="#030909"/><rect x="390" y="180" width="110" height="520" fill="#030909"/>`,
    crowdOpts: { ...crowdDefaults, top: 560, rows: 4, armChance: 0.6 },
  }),
};

await mkdir(outDir, { recursive: true });
for (const [name, svg] of Object.entries(images)) {
  await sharp(Buffer.from(svg)).jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(outDir, name));
  console.log("wrote", name);
}
