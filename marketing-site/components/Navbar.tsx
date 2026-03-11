"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-dark-base/90 backdrop-blur-xl border-b border-dark-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-red rounded-lg flex items-center justify-center">
            <span className="font-michroma text-white text-xs font-bold">MT</span>
          </div>
          <span className="font-michroma text-text-primary text-sm tracking-widest uppercase">
            MyTools
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-text-secondary hover:text-text-primary text-sm font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="mailto:contact@mytoolsgroup.eu?subject=Demande accès MyTools Admin"
            className="text-sm font-semibold text-white bg-brand-red hover:bg-brand-red-dark px-4 py-2 rounded-lg transition-colors"
          >
            Demander l'accès
          </a>
        </div>

        <button
          className="md:hidden p-2 text-text-secondary hover:text-text-primary"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span className={`block h-0.5 bg-current transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 bg-current transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 bg-current transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-surface border-b border-dark-border"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-text-secondary hover:text-text-primary text-sm font-medium transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="mailto:contact@mytoolsgroup.eu?subject=Demande accès MyTools Admin"
                className="text-sm font-semibold text-white bg-brand-red px-4 py-2 rounded-lg text-center mt-2"
              >
                Demander l'accès
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

const navLinks = [
  { href: "#features", label: "Fonctionnalités" },
  { href: "#how-it-works", label: "Comment ça marche" },
  { href: "/support", label: "Support" },
  { href: "/privacy", label: "Confidentialité" },
];
