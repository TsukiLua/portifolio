import { About, Hero } from "@/components/home/Intro";
import { Gallery, Team } from "@/components/home/People";
import { Faq, Process, Visit } from "@/components/home/Practical";
import { Treatments } from "@/components/home/Treatments";
import { HOURS, studio } from "@/data/studio";
import { siteUrl } from "@/lib/config";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: studio.name,
  description: studio.description,
  url: siteUrl,
  email: studio.email,
  address: { "@type": "PostalAddress", streetAddress: studio.address.street, addressLocality: "São Paulo", addressRegion: "SP", addressCountry: "BR" },
  openingHoursSpecification: HOURS.flatMap((ranges, d) => ranges.map((r) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: DAYS[d], opens: r.start, closes: r.end }))),
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <About />
      <Treatments />
      <Team />
      <Process />
      <Gallery />
      <Faq />
      <Visit />
    </>
  );
}
