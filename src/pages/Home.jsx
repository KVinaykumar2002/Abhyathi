import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Menu from '../components/Menu';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen font-sans selection:bg-[#f35e16]/30 selection:text-[#f35e16]">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Menu />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
