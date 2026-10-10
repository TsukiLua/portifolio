import type { Metadata, Viewport } from "next";
import { Figtree, Fraunces } from "next/font/google";
import { DemoBar, Footer, Header } from "@/components/layout";
import { studio } from "@/data/studio";
import { allowIndexing, siteUrl } from "@/lib/config";
import "./globals.css";

const serif = Fraunces({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-salvia-serif" });
const sans = Figtree({ subsets: ["latin"], variable: "--font-salvia-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${studio.name} · Jardins, São Paulo`, template: `%s · ${studio.shortName}` },
  description: studio.description,
  openGraph: { type: "website", locale: "pt_BR", siteName: studio.name, title: `${studio.name} · ${studio.tagline}`, description: studio.description },
  twitter: { card: "summary_large_image" },
  robots: allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#f6f1ea" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${serif.variable} ${sans.variable}`}>
      <body className="min-h-dvh">
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-moss focus:px-4 focus:py-2 focus:text-cream">
          Pular para o conteúdo
        </a>
        <DemoBar />
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
