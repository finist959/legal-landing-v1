import HeroSection from "@/components/HeroSection";
import ServicesGrid from "@/components/ServicesGrid";
import TrustStrip from "@/components/TrustStrip";
import Benefits from "@/components/Benefits";
import Process from "@/components/Process";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <ServicesGrid />
      <TrustStrip />
      <Benefits />
      <Process />
      <FinalCTA />
    </main>
  );
}
