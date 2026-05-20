import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import BrandLogo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-[#101810] text-white pt-24 pb-12 border-t border-white/5">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20"
        >
          <div className="space-y-6">
            <motion.div className="flex items-center gap-3">
              <BrandLogo size="lg" />
              <span className="text-2xl font-serif font-medium tracking-tight">
                Abhyati Food Pak
              </span>
            </motion.div>
            <p className="text-white/50 leading-relaxed max-w-xs">
              Abhyati Food Pak Solutions Pvt Ltd — your trusted partner for
              high-quality, eco-friendly food service packaging across
              restaurants, cafés, catering, and institutional food service.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex gap-4"
            >
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, color: "#f35e16" }}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-colors text-white/70"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          <div>
            <h4 className="text-xl font-serif mb-8 text-[#f35e16]">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "#" },
                { label: "Products", href: "/menu" },
                { label: "Testimonials", href: "/testimonials" },
                { label: "Sustainability", href: "#" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("/") ? (
                    <Link
                      to={link.href}
                      className="text-white/50 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-white/50 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-serif mb-8 text-[#f35e16]">Services</h4>
            <ul className="space-y-4">
              {[
                "Bulk Distribution",
                "Custom Branding",
                "Eco-Friendly Solutions",
                "Nationwide Delivery",
                "B2B Account Support",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/50 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-serif mb-8 text-[#f35e16]">
              Contact Us
            </h4>
            <ul className="space-y-4 text-white/50">
              <li>Abhyati Food Pak Solutions Pvt Ltd</li>
              <li>India</li>
              <li className="pt-2">info@abhyatifoodpak.com</li>
              <li>+91 (000) 000-0000</li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/30 text-sm"
        >
          <p>© 2026 Abhyati Food Pak Solutions Pvt Ltd. All Rights Reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
