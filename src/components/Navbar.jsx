import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu as MenuIcon, ArrowRight } from "lucide-react";
import BrandLogo from "./Logo";
import { cn } from "@/lib/utils";
import { useSiteContent } from "@/hooks/useSiteContent";
import { cataloguePdfHref } from "@/lib/cataloguePdfUrl";

const Navbar = () => {
  const [elevated, setElevated] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const { data: siteContent } = useSiteContent();

  useEffect(() => {
    const handleScroll = () => setElevated(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setElevated(window.scrollY > 24);
  }, [currentPath]);

  const navLinks = useMemo(
    () => [
      { label: "Home", href: "/" },
      { label: "Products", href: "/menu" },
      { label: "Stores", href: "/stores" },
      { label: "Catalogue", href: cataloguePdfHref(siteContent), external: true },
      { label: "Testimonials", href: "/testimonials" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    [siteContent]
  );

  const isActive = (href) => currentPath === href;

  const handleNavClick = () => {
    setMobileOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };
  /** Light page hero (e.g. menu) — dark nav text until user scrolls */
  const lightHero = !elevated && currentPath === "/menu";
  /** Home/video hero — white nav text until user scrolls */
  const overMediaHero = !elevated && (currentPath === "/" || currentPath === "/about");

  const linkClass = (href) =>
    cn(
      "relative min-h-[44px] inline-flex items-center gap-2 py-ds-1 font-primary text-ds-lg transition-colors duration-fast",
      "before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-current before:content-['']",
      isActive(href)
        ? "text-text-secondary"
        : lightHero
          ? "text-surface-base hover:text-text-secondary"
          : overMediaHero
            ? "text-white hover:text-text-secondary"
            : "text-text-primary hover:text-text-secondary"
    );

  const Brand = () => (
    <>
      <BrandLogo size="md" className="transition-opacity duration-fast group-hover:opacity-90" />
      <span
        className={cn(
          "truncate font-primary text-base font-medium tracking-tight transition-colors duration-fast group-hover:text-text-secondary sm:text-ds-xl md:text-ds-2xl",
          lightHero ? "text-surface-base" : overMediaHero ? "text-white" : "text-text-primary"
        )}
      >
        Abhyati Food Pak
      </span>
    </>
  );

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex min-w-0 items-center justify-between gap-2 px-4 py-2 transition-all duration-slow sm:px-ds-3 sm:py-ds-2",
          elevated
            ? "border-b border-white/10 bg-[#000000] shadow-lg"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <Link
          to="/"
          onClick={handleNavClick}
          className="flex min-w-0 max-w-[55%] items-center gap-2 group focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-ring focus-visible:outline-offset-2 sm:max-w-none sm:gap-ds-2"
        >
          <Brand />
        </Link>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="hidden items-center gap-ds-4 md:flex"
        >
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                className={linkClass(link.href)}
              >
                {link.label}
              </a>
            ) : (
              <Link key={link.label} to={link.href} onClick={handleNavClick} className={linkClass(link.href)}>
                {link.label}
              </Link>
            )
          )}
        </motion.div>

        <div className="flex items-center gap-ds-2">
          <motion.div whileTap={{ scale: 0.98 }}>
            <Link
              to="/contact"
              onClick={handleNavClick}
              className="group/contact hidden min-h-[44px] items-center gap-ds-2 rounded-ds-xl bg-surface-raised py-ds-1 pl-ds-1 pr-ds-3 text-ds-sm font-semibold text-text-secondary ring-1 ring-border-muted transition-[background-color,transform] duration-fast hover:bg-surface-base hover:translate-x-1 motion-reduce:hover:translate-x-0 md:inline-flex focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-ring focus-visible:outline-offset-2"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-text-secondary text-surface-base">
                <ArrowRight className="h-4 w-4" strokeWidth={2.25} aria-hidden />
              </span>
              Contact Us
            </Link>
          </motion.div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className={cn(
              "min-h-[44px] min-w-[44px] rounded-ds-xs p-ds-2 transition-colors duration-fast md:hidden",
              "hover:bg-surface-raised focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-ring focus-visible:outline-offset-2",
              lightHero ? "text-surface-base" : overMediaHero ? "text-white" : "text-text-primary"
            )}
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
            className="fixed inset-0 z-[100] flex flex-col bg-surface-base px-ds-4 py-ds-4"
          >
            <div className="mb-ds-6 flex items-center justify-between">
              <Link
                to="/"
                className="flex items-center gap-ds-2"
                onClick={handleNavClick}
              >
                <BrandLogo size="md" />
                <span className="font-primary text-ds-2xl font-medium text-text-primary">
                  Abhyati Food Pak
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="min-h-[44px] min-w-[44px] rounded-ds-xs p-ds-2 text-text-disabled transition-colors duration-fast hover:bg-surface-raised hover:text-text-primary focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-ring"
                aria-label="Close menu"
              >
                <X size={28} />
              </button>
            </div>

            <nav className="flex flex-col gap-ds-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {link.external ? (
                    <a
                      href={link.href}
                      onClick={handleNavClick}
                      className={cn(
                        "inline-flex items-center gap-3 font-primary text-[2.25rem] transition-colors duration-fast",
                        "before:h-2 before:w-2 before:shrink-0 before:rounded-full before:bg-current before:content-['']",
                        "text-text-primary hover:text-text-secondary"
                      )}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      onClick={handleNavClick}
                      className={cn(
                        "inline-flex items-center gap-3 font-primary text-[2.25rem] transition-colors duration-fast",
                        "before:h-2 before:w-2 before:shrink-0 before:rounded-full before:bg-current before:content-['']",
                        isActive(link.href)
                          ? "text-text-secondary"
                          : "text-text-primary hover:text-text-secondary"
                      )}
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto">
              <Link
                to="/contact"
                onClick={handleNavClick}
                className="flex min-h-[44px] w-full items-center justify-center gap-ds-2 rounded-ds-xl bg-surface-raised px-ds-3 py-ds-2 text-ds-lg font-semibold text-text-secondary ring-1 ring-border-muted transition-transform duration-fast hover:translate-x-1 motion-reduce:hover:translate-x-0 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-ring"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-text-secondary text-surface-base">
                  <ArrowRight className="h-5 w-5" strokeWidth={2.25} aria-hidden />
                </span>
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
