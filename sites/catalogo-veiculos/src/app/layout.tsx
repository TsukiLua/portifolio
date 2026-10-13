import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { DemoBar, Header } from "@/components/layout/Header";
import { dealership } from "@/data/dealership";
import { allowIndexing, siteUrl } from "@/lib/config";
import "./globals.css";

const display = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-prime-display" });
const sans = Inter({ subsets: ["latin"], variable: "--font-prime-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${dealership.name} · Seminovos selecionados`, template: `%s · ${dealership.name}` },
  description: dealership.description,
  applicationName: dealership.name,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: dealership.name,
    title: `${dealership.name} · Encontre seu próximo carro`,
    description: dealership.description,
  },
  twitter: { card: "summary_large_image" },
  robots: allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#121418" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-dvh">
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-wine focus:px-4 focus:py-2 focus:text-white">
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
