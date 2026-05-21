import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Clock, Send } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MINT = "#57C58D";
const PINK_BLOB = "#F9B7C2";

const OCEAN = {
  border: "#7DD3E8",
  borderDeep: "#2A9D8F",
  focus: "#0891B2",
  ring: "#22D3EE",
  foam: "#90E0EF",
  deep: "#0077B6",
};

const inputClass =
  "w-full rounded-xl border-2 border-[#7DD3E8] bg-white/90 px-4 py-3 text-sm text-[#101810] outline-none transition-all placeholder:text-[#94a3b8] focus:border-[#0891B2] focus:bg-white focus:ring-2 focus:ring-[#22D3EE]/30 hover:border-[#5EC2D0]";

const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15282225.511792574!2d73.7250243!3d20.7503013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDQ1JzAxLjEiTiA3M8KwNDMnMzAuMSJF!5e0!3m2!1sen!2sin!4v1716153600000!5m2!1sen!2sin";

const ContactHero = () => (
  <section
    className="relative overflow-hidden pt-24"
    style={{ backgroundColor: MINT }}
  >
    {/* Pink accent blobs */}
    <motion.div
      aria-hidden
      className="pointer-events-none absolute -left-16 -top-10 h-56 w-56 rounded-full opacity-70 blur-3xl"
      style={{ backgroundColor: PINK_BLOB }}
      animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.7, 0.5] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      aria-hidden
      className="pointer-events-none absolute -right-12 top-0 h-64 w-64 rounded-full opacity-60 blur-3xl"
      style={{ backgroundColor: PINK_BLOB }}
      animate={{ scale: [1, 1.1, 1], opacity: [0.45, 0.65, 0.45] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
    />

    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 mx-auto flex min-h-[280px] max-w-4xl flex-col items-center justify-center px-6 pb-32 pt-8 text-center md:min-h-[320px] md:pb-36"
    >
      <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
        Contact
      </h1>
      <p className="mt-3 text-sm font-medium text-white/90 md:text-base">
        <Link to="/" className="transition-colors hover:text-white">
          Home
        </Link>
        <span className="mx-2">:</span>
        <span>Contact</span>
      </p>
    </motion.div>

    {/* Paint-splatter / watercolor edge into white */}
    <svg
      className="absolute bottom-0 left-0 w-full text-white"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M0,80 C120,40 200,100 360,70 C520,40 580,95 720,75 C860,55 920,110 1080,85 C1200,68 1320,45 1440,90 L1440,120 L0,120 Z"
      />
      <path
        fill="currentColor"
        opacity="0.85"
        d="M0,95 C180,60 320,115 480,88 C640,62 800,105 960,82 C1120,60 1280,88 1440,72 L1440,120 L0,120 Z"
      />
    </svg>
  </section>
);

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid gap-5 sm:grid-cols-2"
      >
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[#3d3d3d]">
            Your Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-xl border border-[#e5e5e5] bg-white px-4 py-3 text-sm text-[#101810] outline-none transition-shadow focus:border-[#57C58D] focus:ring-2 focus:ring-[#57C58D]/25"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#3d3d3d]">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-[#e5e5e5] bg-white px-4 py-3 text-sm text-[#101810] outline-none transition-shadow focus:border-[#57C58D] focus:ring-2 focus:ring-[#57C58D]/25"
            placeholder="you@example.com"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
      >
        <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-[#3d3d3d]">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          className="w-full rounded-xl border border-[#e5e5e5] bg-white px-4 py-3 text-sm text-[#101810] outline-none transition-shadow focus:border-[#57C58D] focus:ring-2 focus:ring-[#57C58D]/25"
          placeholder="Bulk order inquiry"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-[#3d3d3d]">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full resize-y rounded-xl border border-[#e5e5e5] bg-white px-4 py-3 text-sm text-[#101810] outline-none transition-shadow focus:border-[#57C58D] focus:ring-2 focus:ring-[#57C58D]/25"
          placeholder="Tell us about your packaging needs..."
        />
      </motion.div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-colors"
        style={{ backgroundColor: MINT, boxShadow: `0 10px 30px ${MINT}40` }}
      >
        <Send size={16} />
        {submitted ? "Message Sent!" : "Send Message"}
      </motion.button>
    </form>
  );
};

const contactDetails = [
  {
    icon: MapPin,
    title: "Location",
    lines: ["Abhyati Food Pak Solutions Pvt Ltd", "India"],
  },
  {
    icon: Phone,
    title: "Phone",
    lines: ["+91 (000) 000-0000"],
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["info@abhyatifoodpak.com"],
  },
  {
    icon: Clock,
    title: "Business Hours",
    lines: ["Mon – Sat: 9:00 AM – 6:00 PM", "Sunday: Closed"],
  },
];

export default function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-white font-sans selection:bg-[#57C58D]/30 selection:text-[#2d8a5e]"
    >
      <Navbar />
      <main>
        <ContactHero />

        <section className="relative -mt-4 bg-white px-6 pb-20 pt-4">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-great-vibes mb-14 text-center text-4xl text-[#a08b6e] md:text-5xl"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Get In Touch
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-16"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-serif text-3xl font-semibold text-[#101810] md:text-4xl">
                  We&apos;d love to hear from you
                </h2>
                <p className="mt-3 max-w-md text-[#6b6b6b] leading-relaxed">
                  Reach out for bulk orders, custom branding, eco-friendly packaging
                  solutions, or any questions about our food service products.
                </p>
              </div>

              <ul className="space-y-5">
                {contactDetails.map(({ icon: Icon, title, lines }) => (
                  <li key={title} className="flex gap-4">
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white"
                      style={{ backgroundColor: MINT }}
                    >
                      <Icon size={18} />
                    </span>
                    <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                      <p className="font-semibold text-[#101810]">{title}</p>
                      {lines.map((line) => (
                        <p key={line} className="text-sm text-[#6b6b6b]">
                          {line}
                        </p>
                      ))}
                    </motion.div>
                  </li>
                ))}
              </ul>

              <ContactForm />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="font-serif text-2xl font-semibold text-[#101810]">
                Find Us on the Map
              </h3>
              <p className="text-sm text-[#6b6b6b]">
                Visit our office or get directions — we serve clients across India.
              </p>
              <motion.div
                whileHover={{ scale: 1.005 }}
                className="overflow-hidden rounded-2xl border border-[#e8e8e8] shadow-lg shadow-black/5"
              >
                <iframe
                  title="Abhyati Food Pak location on Google Maps"
                  src={MAP_EMBED_URL}
                  width="100%"
                  height="480"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block w-full min-h-[360px] md:min-h-[480px]"
                />
              </motion.div>
              <a
                href="https://www.google.com/maps"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:underline"
                style={{ color: MINT }}
              >
                <MapPin size={14} />
                Open in Google Maps
              </a>
            </motion.div>
          </motion.div>
        </section>
      </main>
      <Footer />

      <link
        href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap"
        rel="stylesheet"
      />
    </motion.div>
  );
}
