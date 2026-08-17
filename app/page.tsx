import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Stats from "@/components/sections/Stats";
import PortfolioPreview from "@/components/sections/PortfolioPreview";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import Testimonials from "@/components/sections/Testimonials";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Stats />
      <PortfolioPreview />
      <ProcessTimeline />
      <Testimonials />
      <CTASection />
    </>
  );
}
