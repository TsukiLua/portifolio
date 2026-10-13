import { HeroSection } from "@/components/home/HeroSection";
import { CallToAction, CategorySection, Differentials, FeaturedVehicles } from "@/components/home/HomeSections";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedVehicles />
      <CategorySection />
      <Differentials />
      <CallToAction />
    </>
  );
}
