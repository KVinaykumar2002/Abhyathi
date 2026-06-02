import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Clock, Send } from "lucide-react";
import PageShell from "../components/PageShell";
import { Input, Button } from "@/components/ui";
import { useSiteContent } from "@/hooks/useSiteContent";

const ContactHero = () => (
  <section className="relative overflow-hidden border-b border-border-muted bg-surface-raised pt-24">
    <motion.div
      aria-hidden
      className="pointer-events-none absolute -left-16 -top-10 h-56 w-56 rounded-full bg-text-secondary/20 blur-3xl"
      animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.55, 0.35] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      aria-hidden
      className="pointer-events-none absolute -right-12 top-0 h-64 w-64 rounded-full bg-text-secondary/15 blur-3xl"
      animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
    />

    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 mx-auto flex min-h-[280px] max-w-4xl flex-col items-center justify-center px-ds-3 pb-ds-6 pt-ds-3 text-center md:min-h-[320px]"
    >
      <h1 className="font-primary text-ds-3xl font-bold tracking-tight text-text-primary md:text-ds-4xl">
        Contact
      </h1>
      <p className="mt-ds-2 text-ds-md text-text-disabled">
        <Link to="/" className="transition-colors duration-fast hover:text-text-secondary">
          Home
        </Link>
        <span className="mx-2">:</span>
        <span>Contact</span>
      </p>
    </motion.div>
  </section>
);

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-ds-3">
      <div className="grid gap-ds-3 sm:grid-cols-2">
        <Input id="name" name="name" label="Your Name" required placeholder="John Doe" />
        <Input
          id="email"
          name="email"
          type="email"
          label="Email Address"
          required
          placeholder="you@example.com"
        />
      </div>
      <Input id="subject" name="subject" label="Subject" placeholder="Bulk order inquiry" />
      <div>
        <label htmlFor="message" className="mb-ds-1 block text-ds-sm text-text-primary">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full min-h-[44px] resize-y rounded-ds-sm border border-border-muted bg-surface-raised px-ds-2 py-ds-2 text-ds-md text-text-primary placeholder:text-text-disabled focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-ring focus-visible:outline-offset-2 focus-visible:border-text-secondary"
          placeholder="Tell us about your packaging needs..."
        />
      </div>
      <Button type="submit" variant="primary" className="inline-flex gap-ds-2">
        <Send size={16} aria-hidden />
        {submitted ? "Message Sent!" : "Send Message"}
      </Button>
    </form>
  );
};

export default function Contact() {
  const { data: siteContent } = useSiteContent();
  const contact = siteContent?.contact ?? {};
  const contactDetails = [
    {
      icon: MapPin,
      title: "Location",
      lines: [contact.companyName || "Abhyati Food Pak Solutions Pvt Ltd", contact.addressLine1 || "India"].filter(Boolean),
    },
    { icon: Phone, title: "Phone", lines: [contact.phone || "+91 (000) 000-0000"] },
    { icon: Mail, title: "Email", lines: [contact.email || "info@abhyatifoodpak.com"] },
    {
      icon: Clock,
      title: "Business Hours",
      lines: [contact.businessHoursLine1 || "Mon – Sat: 9:00 AM – 6:00 PM", contact.businessHoursLine2 || "Sunday: Closed"].filter(Boolean),
    },
  ];

  return (
    <PageShell mainClassName="">
      <ContactHero />

      <section className="section-pad px-ds-3">
        <p className="mb-ds-4 text-center font-primary text-ds-2xl text-text-secondary">
          Get In Touch
        </p>

        <div className="mx-auto grid max-w-7xl gap-ds-4 lg:grid-cols-2 lg:gap-ds-5">
          <div className="space-y-ds-4">
            <div>
              <h2 className="font-primary text-ds-2xl font-semibold text-text-primary md:text-ds-3xl">
                We&apos;d love to hear from you
              </h2>
              <p className="mt-ds-2 max-w-md text-ds-md leading-relaxed text-text-disabled">
                Reach out for bulk orders, custom branding, eco-friendly packaging
                solutions, or any questions about our food service products.
              </p>
            </div>

            <ul className="space-y-ds-3">
              {contactDetails.map(({ icon: Icon, title, lines }) => (
                <li key={title} className="flex gap-ds-2">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-ds-sm bg-text-secondary text-surface-base">
                    <Icon size={18} aria-hidden />
                  </span>
                  <div>
                    <p className="font-semibold text-ds-md text-text-primary">{title}</p>
                    {lines.map((line) => (
                      <p key={line} className="text-ds-sm text-text-disabled">
                        {line}
                      </p>
                    ))}
                  </div>
                </li>
              ))}
            </ul>

            <ContactForm />
          </div>

          <div className="space-y-ds-2">
            <h3 className="font-primary text-ds-xl font-semibold text-text-primary">
              Find Us on the Map
            </h3>
            <p className="text-ds-sm text-text-disabled">
              Visit our office or get directions — we serve clients across India.
            </p>
            <div className="overflow-hidden rounded-ds-md border border-border-muted shadow-lg">
              <iframe
                title="Abhyati Food Pak location on Google Maps"
                src={contact.mapEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15282225.511792574!2d73.7250243!3d20.7503013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDQ1JzAxLjEiTiA3M8KwNDMnMzAuMSJF!5e0!3m2!1sen!2sin!4v1716153600000!5m2!1sen!2sin"}
                width="100%"
                height="480"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block min-h-[360px] w-full bg-surface-raised md:min-h-[480px]"
              />
            </div>
            <a
              href={contact.googleMapsUrl || "https://www.google.com/maps"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-ds-1 text-ds-sm font-medium text-text-secondary transition-colors duration-fast hover:text-text-primary hover:underline focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-ring"
            >
              <MapPin size={14} aria-hidden />
              Open in Google Maps
              <span className="sr-only"> (opens in new window)</span>
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
