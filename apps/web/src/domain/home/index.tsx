import React from "react";
import HeroSection from "./components/hero-section";
import FeatureSection from "./components/feature-section";
import TestimonialSection from "./components/testimonial-section";
import HowItWorksSection from "./components/how-it-works-section";
import CTASection from "./components/cta-section";

const Home: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <FeatureSection />
      <TestimonialSection />
      <HowItWorksSection />
      <CTASection />
    </div>
  );
};

export default Home;
