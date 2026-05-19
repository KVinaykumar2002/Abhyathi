import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TestimonialV2 from '@/components/ui/testimonial-v2';

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-[#f8f6f3] font-sans selection:bg-[#f35e16]/30 selection:text-[#f35e16]">
      <Navbar />
      <main className="pt-24">
        <TestimonialV2 />
      </main>
      <Footer />
    </div>
  );
}
