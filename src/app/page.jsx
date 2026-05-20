import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Menu from "../components/Menu";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans selection:bg-[#f35e16]/30 selection:text-[#f35e16]">
      <header className="relative z-[100] shrink-0 isolate overflow-hidden bg-[#101810]">
        <Navbar />
      </header>
      <main className="relative flex-1">
        <Hero />
        <Stats />
        <Menu />
        <Testimonials />
        <CTA />
      </main>
      <Footer />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
        
        body {
          margin: 0;
          padding: 0;
          background-color: #101810;
        }

        .font-serif {
          font-family: 'Playfair Display', serif;
        }

        .font-sans {
          font-family: 'Outfit', sans-serif;
        }

        /* Smooth Scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #101810;
        }
        ::-webkit-scrollbar-thumb {
          background: #1a2e1a;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #f35e16;
        }
      `}</style>
    </div>
  );
}
