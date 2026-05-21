import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Account() {
  return (
    <div className="min-h-screen bg-[#f8f6f3] font-sans selection:bg-[#f35e16]/30 selection:text-[#f35e16]">
      <Navbar />
      <main className="pt-28 pb-16 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-serif text-4xl font-medium tracking-tight text-neutral-900 md:text-5xl">
            Trade accounts
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-neutral-600">
            Login and registration for ordering are handled by our sales team so we
            can set up correct pricing, delivery, and GST details for your business.
          </p>
          <ul className="mt-8 list-disc space-y-2 pl-5 text-neutral-700">
            <li>New customers: request an account when you first place an enquiry.</li>
            <li>Existing customers: use the email we have on file or mention your company name.</li>
          </ul>
          <div className="mt-10">
            <Link
              to="/contact"
              className="inline-flex rounded-full bg-[#f35e16] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#d85212]"
            >
              Contact us to get access
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
