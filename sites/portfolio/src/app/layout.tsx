import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { DevChecklist } from "@/components/layout/DevChecklist";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { profile } from "@/data/profile";
import { allowIndexing, siteUrl } from "@/lib/config";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-pf-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-pf-mono" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-pf-serif" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${profile.name} · ${profile.role}`, template: `%s · ${profile.name}` },
  description: profile.description,
  applicationName: profile.brand,
  authors: [{ name: profile.name }],
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "pt_BR", siteName: profile.brand, title: `${profile.name} · ${profile.role}`, description: profile.description },
  twitter: { card: "summary_large_image" },
  robots: allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#f4f3ef" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${sans.variable} ${mono.variable} ${serif.variable}`}>
      <body className="min-h-dvh">
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <DevChecklist />
      </body>
    </html>
  );
}
