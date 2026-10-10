import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { DemoBar } from "@/components/DemoBar";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { business } from "@/data/business";
import { allowIndexing, siteUrl } from "@/lib/config";
import "./globals.css";

const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-casa" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${business.name} · ${business.tagline}`, template: `%s · ${business.name}` },
  description: business.description,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: business.name,
    title: `${business.name} · orçamento grátis para reparos em casa`,
    description: business.description,
  },
  twitter: { card: "summary_large_image" },
  robots: allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#1d4ed8" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={sans.variable}>
      <body className="min-h-dvh">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
        >
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
