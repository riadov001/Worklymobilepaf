"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/#features",     label: "Fonctionnalités" },
  { href: "/#architecture", label: "Architecture" },
  { href: "/#how-it-works", label: "Comment ça marche" },
  { href: "/#contact",      label: "Accès" },
  { href: "/support",       label: "Support" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("/#")) return;
    e.preventDefault();
    setMenuOpen(false);
    const id = href.replace("/#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0A0A0A]/96 backdrop-blur-xl border-b border-[#1E1E1E]" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-18 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 hover:opacity-80 transition-opacity">
          <div className="relative w-10 h-10 md:w-12 md:h-12 shrink-0">
            <Image src="/logo.png" alt="MyTools" fill className="object-contain" />
          </div>
          <span className="font-michroma text-white text-[10px] md:text-xs tracking-[0.25em] uppercase hidden sm:inline">
            MYTOOLS
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-7 flex-1 justify-center">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => handleClick(e, l.href)}
              className="font-michroma text-[#888] hover:text-white text-[9px] xl:text-[10px] tracking-widest uppercase transition-colors duration-200 whitespace-nowrap"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <a
            href="https://saas.mytoolsgroup.eu"
            target="_blank"
            rel="noopener noreferrer"
            className="font-michroma text-[9px] tracking-widest uppercase text-[#888] hover:text-white border border-[#2A2A2A] hover:border-[#DC2626]/40 px-3 py-2 rounded-lg transition-all"
          >
            PWA
          </a>
          <a
            href="/#contact"
            onClick={(e) => handleClick(e, "/#contact")}
            className="font-michroma text-[9px] tracking-widest uppercase text-white bg-[#DC2626] hover:bg-[#B91C1C] px-4 py-2 rounded-lg transition-all"
          >
            Accès Admin
          </a>
        </div>

        {/* Tablet */}
        <div className="hidden md:flex lg:hidden items-center gap-4 flex-1 justify-center">
          {navLinks.slice(0, 3).map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => handleClick(e, l.href)}
              className="font-michroma text-[#888] hover:text-white text-[9px] tracking-widest uppercase transition-colors whitespace-nowrap"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="hidden md:flex lg:hidden items-center gap-2 shrink-0">
          <a
            href="/#contact"
            onClick={(e) => handleClick(e, "/#contact")}
            className="font-michroma text-[9px] tracking-widest uppercase text-white bg-[#DC2626] px-3 py-2 rounded-lg"
          >
            Accès
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-[#888] hover:text-white ml-auto"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 w-5 bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#111] border-b border-[#1E1E1E] overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={(e) => { handleClick(e, l.href); setMenuOpen(false); }}
                  className="font-michroma text-[#888] hover:text-white text-[9px] tracking-widest uppercase transition-colors py-3 border-b border-[#1E1E1E] last:border-0"
                >
                  {l.label}
                </a>
              ))}
            </div>
            <div className="px-4 pb-4 flex gap-2">
              <a
                href="https://saas.mytoolsgroup.eu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 font-michroma text-[9px] tracking-widest uppercase text-center text-[#888] border border-[#2A2A2A] px-3 py-3 rounded-lg"
                onClick={() => setMenuOpen(false)}
              >
                PWA →
              </a>
              <a
                href="/#contact"
                className="flex-1 font-michroma text-[9px] tracking-widest uppercase text-center text-white bg-[#DC2626] px-3 py-3 rounded-lg"
                onClick={(e) => { handleClick(e, "/#contact"); setMenuOpen(false); }}
              >
                Accès Admin
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
