import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#f8f6f3] font-sans selection:bg-[#f35e16]/30 selection:text-[#f35e16]">
      <Navbar />
      <main className="pt-28 pb-16 px-6 md:px-12">
        <article className="mx-auto max-w-3xl">
          <h1 className="font-serif text-4xl font-medium text-neutral-900">
            Terms and conditions
          </h1>
          <p className="mt-6 text-sm text-neutral-500">
            Last updated: May 2026. This is a general summary for the website;
            your trade agreements may include additional terms.
          </p>
          <p className="mt-6 text-neutral-700 leading-relaxed">
            By using this site you agree to use it lawfully and not to misuse
            ordering or contact features. Product availability, specifications, and
            pricing for bulk orders are confirmed by our team at the time of
            quotation or purchase order.
          </p>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            Content on this site is provided for information. For binding terms on
            supply, payment, delivery, and returns, refer to your contract or
            invoice with Abhyati Food Pak Solutions Pvt Ltd.
          </p>
        </article>
      </main>
      <Footer />
    </div>
  );
}
