import { About } from "@/components/home/About";
import { CtaBand } from "@/components/home/CtaBand";
import { Faq } from "@/components/home/Faq";
import { Gallery } from "@/components/home/Gallery";
import { Hero } from "@/components/home/Hero";
import { Location } from "@/components/home/Location";
import { Reviews } from "@/components/home/Reviews";
import { Services } from "@/components/home/Services";
import { Team } from "@/components/home/Team";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { HOURS, business } from "@/data/business";
import { siteUrl } from "@/lib/config";

const DAY_SCHEMA = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Dados estruturados (schema.org) para buscadores e assistentes.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BarberShop",
  name: business.name,
  description: business.description,
  url: siteUrl,
  email: business.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address.street,
    addressLocality: business.address.city,
    addressRegion: business.address.state,
    addressCountry: "BR",
  },
  openingHoursSpecification: HOURS.flatMap((ranges, day) =>
    ranges.map((r) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: DAY_SCHEMA[day], opens: r.start, closes: r.end })),
  ),
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <About />
      <Services />
      <Team />
      <Gallery />
      <Reviews />
      <Location />
      <Faq />
      <CtaBand />
      <WhatsAppFloat />
    </>
  );
}
