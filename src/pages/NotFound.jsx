import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#101810] font-sans selection:bg-[#f35e16]/30 selection:text-[#f35e16]">
      <Navbar />
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-28 pb-16 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#f35e16]">
          404
        </p>
        <h1 className="mt-3 max-w-lg font-serif text-4xl font-medium text-white md:text-5xl">
          This page isn&apos;t on the menu
        </h1>
        <p className="mt-4 max-w-md text-white/60">
          The link may be outdated or the address was mistyped. Head back home or
          open our product catalog.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="inline-flex rounded-full bg-[#f35e16] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#d85212]"
          >
            Back to home
          </Link>
          <Link
            to="/menu"
            className="inline-flex rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Browse products
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
