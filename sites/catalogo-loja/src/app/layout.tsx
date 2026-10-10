import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { DemoBar } from "@/components/layout/Brand";
import { Header } from "@/components/layout/Header";
import { store } from "@/data/store";
import { allowIndexing, siteUrl } from "@/lib/config";
import "./globals.css";

const serif = Bodoni_Moda({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-mare-serif" });
const sans = Jost({ subsets: ["latin"], variable: "--font-mare-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${store.name} · ${store.tagline}`, template: `%s · ${store.name}` },
  description: store.description,
  openGraph: { type: "website", locale: "pt_BR", siteName: store.fullName, title: `${store.name} · ${store.tagline}`, description: store.description },
  twitter: { card: "summary_large_image" },
  robots: allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#f6f2ec" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${serif.variable} ${sans.variable}`}>
      <body className="min-h-dvh">
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-shell">
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
