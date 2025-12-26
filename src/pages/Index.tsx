import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { SectorsPreview } from "@/components/home/SectorsPreview";
import { CompetitionsSection } from "@/components/home/CompetitionsSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <SectorsPreview />
      <CompetitionsSection />
    </Layout>
  );
};

export default Index;
