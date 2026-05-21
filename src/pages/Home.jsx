import { useRef } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Menu from '../components/Menu';
import WorksHero from '../components/WorksHero';
import ServiceShowcase from '../components/ServiceShowcase';
import ServiceCardsSection from '../components/ServiceCardsSection';
import CTA from '../components/CTA';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import Footer from '../components/Footer';

export default function Home() {
  /** Scroll track: sticky WORKS pins only while the two 2-column grids scroll over it, then scrolls away normally. */
  const worksTrackRef = useRef(null);

  return (
    <div className="min-h-screen min-w-0 bg-surface-base font-primary selection:bg-text-secondary/30 selection:text-text-secondary">
      <Navbar />
      <main>
        <Hero />
        <Menu />
        <div
          ref={worksTrackRef}
          className="relative isolate"
          style={{ "--works-hero-h": "min(825px, max(72vh, 520px))" }}
        >
          <div
            className="sticky top-0 z-[1] w-full pointer-events-none"
            style={{ height: "var(--works-hero-h)" }}
          >
            <WorksHero pinScrollTargetRef={worksTrackRef} />
          </div>
          <div
            className="relative z-[2] shadow-[0_-32px_64px_rgba(0,0,0,0.35)]"
            style={{
              marginTop: "calc(-1 * var(--works-hero-h))",
              paddingTop: "var(--works-hero-h)",
            }}
          >
            <ServiceShowcase />
            <ServiceCardsSection />
          </div>
        </div>
        <CTA />
        <TestimonialsCarousel />
      </main>
      <Footer />
    </div>
  );
}
