import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu as MenuIcon } from "lucide-react";
import BrandLogo from "./Logo";

const Navbar = () => {
  const [elevated, setElevated] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y <= 20) {
        setElevated(false);
      } else if (y < lastScrollY.current) {
        setElevated(true);
      } else if (y > lastScrollY.current) {
        setElevated(false);
      }
      lastScrollY.current = y;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/menu" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "About", href: "#" },
    { label: "Contact", href: "/contact" },
  ];

  const isActive = (href) => currentPath === href;

  const Brand = () => (
    <>
      <BrandLogo size="md" className="group-hover:opacity-90 transition-opacity" />
      <span className="text-2xl font-serif text-white font-medium tracking-tight group-hover:text-[#f35e16] transition-colors duration-300">
        Abhyati Food Pak
      </span>
    </>
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between transition-all duration-500 ${
          elevated
            ? "border-b border-white/10 bg-[#101810]/95 shadow-lg shadow-black/20 backdrop-blur-md"
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
          className="hidden md:flex items-center gap-8 text-white/90 font-sans text-sm font-medium"
        >
          {navLinks.map((link) =>
            link.href.startsWith("#") ? (
              <a
                key={link.label}
                href={link.href}
                className={`relative transition-colors duration-300 py-1 group ${
                  isActive(link.href)
                    ? "text-[#f35e16]"
                    : "text-white/80 hover:text-white"
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
                    : "text-white/80 hover:text-white"
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
              className="hidden md:block px-6 py-2.5 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white hover:text-[#101810] transition-all duration-300"
            >
              Contact Us
            </Link>
          </motion.div>

          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-white p-2"
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
            className="fixed inset-0 z-[100] bg-[#101810] flex flex-col px-8 py-8"
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
                <span className="text-2xl font-serif text-white font-medium">
                  Abhyati Food Pak
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-white/70 hover:text-white transition-colors"
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
                          : "text-white hover:text-[#f35e16]"
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
                          : "text-white hover:text-[#f35e16]"
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
                  className="block w-full px-8 py-4 rounded-full bg-[#f35e16] text-white text-lg font-medium text-center"
                >
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
