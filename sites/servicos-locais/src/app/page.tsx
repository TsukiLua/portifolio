import { Benefits } from "@/components/home/Benefits";
import { Faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Regions } from "@/components/home/Regions";
import { Services } from "@/components/home/Services";
import { Testimonials } from "@/components/home/Testimonials";
import { Works } from "@/components/home/Works";
import { QuoteSection } from "@/components/quote/QuoteSection";
import { business } from "@/data/business";
import { homeServices } from "@/data/services";
import { siteUrl } from "@/lib/config";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: business.name,
  description: business.description,
  url: siteUrl,
  email: business.email,
  makesOffer: homeServices.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.name } })),
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <Services />
      <Benefits />
      <HowItWorks />
      <Works />
      <Regions />
      <Testimonials />
      <Faq />
      <QuoteSection />
    </>
  );
}
