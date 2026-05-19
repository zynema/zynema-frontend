import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import OnboardingModal from "@/components/OnboardingModal";
import RecommendationSection from "@/components/RecommendationSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground pb-10">
      <OnboardingModal />
      <Navbar />
      <Hero />
      <div className="relative z-1 -mt-20 flex flex-col gap-2">
        <RecommendationSection />
      </div>
    </main>
  );
}
