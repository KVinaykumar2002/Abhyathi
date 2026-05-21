import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu as MenuIcon, ArrowRight } from "lucide-react";
import BrandLogo from "./Logo";

const Navbar = () => {
  const [elevated, setElevated] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setElevated(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/menu" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const isActive = (href) => currentPath === href;

  const Brand = () => (
    <>
      <BrandLogo size="md" className="group-hover:opacity-90 transition-opacity" />
      <span className="text-2xl font-serif font-medium tracking-tight text-neutral-900 transition-colors duration-300 group-hover:text-[#f35e16]">
        Abhyati Food Pak
      </span>
    </>
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between transition-all duration-500 ${
          elevated
            ? "border-b border-black/10 bg-white/95 shadow-md shadow-black/10 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <Link to="/" className="flex items-center gap-3 group">
          <Brand />
        </Link>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="hidden md:flex items-center gap-8 font-sans text-sm font-medium text-neutral-900"
        >
          {navLinks.map((link) =>
            link.href.startsWith("#") ? (
              <a
                key={link.label}
                href={link.href}
                className={`relative transition-colors duration-300 py-1 group ${
                  isActive(link.href)
                    ? "text-[#f35e16]"
                    : "text-neutral-800 hover:text-neutral-950"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-[#f35e16] rounded-full transition-transform duration-300 origin-left ${
                    isActive(link.href)
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className={`relative transition-colors duration-300 py-1 group ${
                  isActive(link.href)
                    ? "text-[#f35e16]"
                    : "text-neutral-800 hover:text-neutral-950"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-[#f35e16] rounded-full transition-transform duration-300 origin-left ${
                    isActive(link.href)
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            )
          )}
        </motion.div>

        <div className="flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center gap-2.5 rounded-full bg-neutral-950 py-1.5 pl-1.5 pr-6 text-sm font-semibold text-[#f35e16] shadow-sm ring-1 ring-white/15 transition-colors hover:bg-neutral-900"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f35e16] text-white">
                <ArrowRight className="h-4 w-4" strokeWidth={2.25} aria-hidden />
              </span>
              Contact Us
            </Link>
          </motion.div>

          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 rounded-lg text-neutral-900 transition-colors hover:bg-black/10"
            aria-label="Open menu"
          >
            <MenuIcon size={24} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col px-8 py-8"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-between items-center mb-16"
            >
              <Link
                to="/"
                className="flex items-center gap-3"
                onClick={() => setMobileOpen(false)}
              >
                <BrandLogo size="md" />
                <span className="text-2xl font-serif text-neutral-900 font-medium">
                  Abhyati Food Pak
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-neutral-600 hover:text-neutral-900 transition-colors p-2 rounded-lg hover:bg-black/5"
                aria-label="Close menu"
              >
                <X size={28} />
              </button>
            </motion.div>

            <nav className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {link.href.startsWith("#") ? (
                    <a
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`text-4xl font-serif transition-colors duration-300 ${
                        isActive(link.href)
                          ? "text-[#f35e16]"
                          : "text-neutral-900 hover:text-[#f35e16]"
                      }`}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`text-4xl font-serif transition-colors duration-300 ${
                        isActive(link.href)
                          ? "text-[#f35e16]"
                          : "text-neutral-900 hover:text-[#f35e16]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-neutral-950 px-6 py-4 text-lg font-semibold text-[#f35e16] ring-1 ring-white/15"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f35e16] text-white">
                    <ArrowRight className="h-5 w-5" strokeWidth={2.25} aria-hidden />
                  </span>
                  Contact Us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
