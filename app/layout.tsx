import type { Metadata, Viewport } from "next";
import { Anton, Archivo, Permanent_Marker } from "next/font/google";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

const marker = Permanent_Marker({
  variable: "--font-marker",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MHENNEKE — Hardcore DJ / Producer",
  description: "Official website of hardcore DJ and producer MHENNEKE: latest mixes, upcoming gigs and bookings.",
};

export const viewport: Viewport = {
  themeColor: "#050708",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${archivo.variable} ${marker.variable} h-full antialiased`}
    >
      <body className="grain min-h-full bg-bg font-sans text-text">{children}</body>
    </html>
  );
}
