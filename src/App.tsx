import React, { useState } from 'react';
import { ScrollCanvas } from './components/ScrollCanvas';
import { FadeInSection } from './components/FadeInSection';
import { NavbarMlluiz } from './components/NavbarMlluiz';
import { HeroCinematic } from './components/HeroCinematic';
import { TrustMetrics } from './components/TrustMetrics';
import { ServicesGrid } from './components/ServicesGrid';
import { CinematicTransition } from './components/CinematicTransition';
import { PortfolioCaseStudies } from './components/PortfolioCaseStudies';
import { AICoreSection } from './components/AICoreSection';
import { ProcessTimeline } from './components/ProcessTimeline';
import { AboutEditorial } from './components/AboutEditorial';
import { FinalVortexCTA } from './components/FinalVortexCTA';
import { FooterMlluiz } from './components/FooterMlluiz';
import { ProjectModal } from './components/ProjectModal';

export default function App() {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-transparent text-white selection:bg-amber-500/30 selection:text-amber-200">
      {/* 300-Frame Cinematic Scroll Animation in Fixed Background */}
      <ScrollCanvas />

      {/* Top Navbar */}
      <NavbarMlluiz
        onOpenInquiry={() => setInquiryOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Content Sections - Revealed smoothly as user scrolls */}
      <main className="relative z-10">
        {/* 1. HERO */}
        <HeroCinematic
          onOpenInquiry={() => setInquiryOpen(true)}
          onNavigatePortfolio={() => handleNavigate('portfolio')}
        />

        {/* 2. TRUST / METRICS */}
        <FadeInSection>
          <TrustMetrics />
        </FadeInSection>

        {/* 3. SERVICES: "Do conceito ao produto." */}
        <FadeInSection>
          <ServicesGrid onOpenInquiry={() => setInquiryOpen(true)} />
        </FadeInSection>

        {/* 4. CINEMATIC TRANSITION */}
        <FadeInSection>
          <CinematicTransition />
        </FadeInSection>

        {/* 5. PORTFOLIO: Case Studies */}
        <FadeInSection>
          <PortfolioCaseStudies onOpenInquiry={() => setInquiryOpen(true)} />
        </FadeInSection>

        {/* 6. AI SECTION: "IA não é o produto. É o multiplicador." */}
        <FadeInSection>
          <AICoreSection onOpenInquiry={() => setInquiryOpen(true)} />
        </FadeInSection>

        {/* 7. PROCESS */}
        <FadeInSection>
          <ProcessTimeline onOpenInquiry={() => setInquiryOpen(true)} />
        </FadeInSection>

        {/* 8. ABOUT */}
        <FadeInSection>
          <AboutEditorial onOpenInquiry={() => setInquiryOpen(true)} />
        </FadeInSection>

        {/* 9. FINAL CTA */}
        <FadeInSection>
          <FinalVortexCTA onOpenInquiry={() => setInquiryOpen(true)} />
        </FadeInSection>
      </main>

      {/* 10. FOOTER */}
      <FadeInSection>
        <FooterMlluiz
          onOpenInquiry={() => setInquiryOpen(true)}
          onNavigate={handleNavigate}
        />
      </FadeInSection>

      {/* Interactive Project Inquiry Modal */}
      <ProjectModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
      />
    </div>
  );
}
