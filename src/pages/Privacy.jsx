import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#f8f6f3] font-sans selection:bg-[#f35e16]/30 selection:text-[#f35e16]">
      <Navbar />
      <main className="pt-28 pb-16 px-6 md:px-12">
        <article className="mx-auto max-w-3xl">
          <h1 className="font-serif text-4xl font-medium text-neutral-900">
            Privacy policy
          </h1>
          <p className="mt-6 text-sm text-neutral-500">
            Last updated: May 2026.
          </p>
          <p className="mt-6 text-neutral-700 leading-relaxed">
            We collect information you submit through forms (such as name, email,
            phone, and message) to respond to enquiries and support orders. We do
            not sell your personal data.
          </p>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            Technical data (for example basic logs or cookies required for the
            site to function) may be processed by our hosting or analytics
            providers as configured for this deployment.
          </p>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            To request access, correction, or deletion of your data where
            applicable, contact us via the details on the{" "}
            <Link
              to="/contact"
              className="text-[#f35e16] underline underline-offset-2 hover:text-[#d85212]"
            >
              contact page
            </Link>
            .
          </p>
        </article>
      </main>
      <Footer />
    </div>
  );
}
