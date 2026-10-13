import { ContactSection } from "@/components/home/ContactSection";
import { Hero } from "@/components/home/Hero";
import { AboutSection, ProcessSection, ServicesSection } from "@/components/home/InfoSections";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/config";

// Dados estruturados mínimos e verdadeiros: só o que está configurado no perfil.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  description: profile.description,
  url: siteUrl,
  ...(profile.social.length ? { sameAs: profile.social.map((s) => s.url) } : {}),
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Hero />
      <ProjectsSection />
      <ServicesSection />
      <ProcessSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
