import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Manrope } from "next/font/google";
import { DemoBar } from "@/components/DemoBar";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { business } from "@/data/business";
import { allowIndexing, siteUrl } from "@/lib/config";
import "./globals.css";

// O Google não fornece métricas de fallback para Big Shoulders; usamos uma fonte condensada do sistema.
const display = Big_Shoulders({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-brasa-display",
  adjustFontFallback: false,
  fallback: ["Arial Narrow", "sans-serif"],
});
const sans = Manrope({ subsets: ["latin"], variable: "--font-brasa-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${business.name} · Pinheiros, São Paulo`,
    template: `%s · ${business.name}`,
  },
  description: business.description,
  applicationName: business.name,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: business.name,
    title: `${business.name} · corte, barba e hora marcada`,
    description: business.description,
  },
  twitter: { card: "summary_large_image" },
  robots: allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0e0d0c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-dvh">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-ember focus:px-4 focus:py-2 focus:text-coal"
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
