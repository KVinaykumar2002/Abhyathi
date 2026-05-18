import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  UtensilsCrossed,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#101810] text-white pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Logo Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <UtensilsCrossed size={32} className="text-[#f35e16] rotate-45" />
              <span className="text-3xl font-serif font-medium tracking-tight">
                Craving
              </span>
            </div>
            <p className="text-white/50 leading-relaxed max-w-xs">
              Exceptional culinary experiences delivered to your doorstep.
              Crafted with passion, served with love.
            </p>
            <div className="flex gap-4">
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
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-serif mb-8 text-[#f35e16]">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {[
                { label: "Home", href: "/" },
                { label: "About Our Story", href: "#" },
                { label: "Menu", href: "/menu" },
                { label: "Blog", href: "#" },
                { label: "Contact", href: "#" },
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

          {/* Services */}
          <div>
            <h4 className="text-xl font-serif mb-8 text-[#f35e16]">Services</h4>
            <ul className="space-y-4">
              {[
                "Dining Experience",
                "Catering",
                "Private Events",
                "Delivery",
                "Reservations",
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

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-serif mb-8 text-[#f35e16]">
              Contact Us
            </h4>
            <ul className="space-y-4 text-white/50">
              <li>123 Gourmet Street,</li>
              <li>Foodie District, NY 10001</li>
              <li className="pt-2">hello@craving.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/30 text-sm">
          <p>© 2026 Craving. All Rights Reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
