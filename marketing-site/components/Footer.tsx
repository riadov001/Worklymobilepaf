"use client";

import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#1E1E1E] bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Left — copyright */}
        <span className="font-michroma text-[#444] text-[9px] tracking-widest uppercase">
          © {year} MyTools Group
        </span>

        {/* Center — links */}
        <div className="flex items-center gap-6">
          <a
            href="https://saas.mytoolsgroup.eu"
            target="_blank"
            rel="noopener noreferrer"
            className="font-michroma text-[#555] hover:text-white text-[9px] tracking-widest uppercase transition-colors"
          >
            PWA ↗
          </a>
          <Link href="/privacy" className="font-michroma text-[#555] hover:text-white text-[9px] tracking-widest uppercase transition-colors">
            Confidentialité
          </Link>
          <Link href="/support" className="font-michroma text-[#555] hover:text-white text-[9px] tracking-widest uppercase transition-colors">
            Support
          </Link>
          <a
            href="mailto:contact@mytoolsgroup.eu"
            className="font-michroma text-[#555] hover:text-white text-[9px] tracking-widest uppercase transition-colors"
          >
            Contact
          </a>
        </div>

        {/* Right — PWA status */}
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="font-michroma text-green-500 text-[9px] tracking-widest uppercase">PWA Live</span>
        </div>

      </div>
    </footer>
  );
}
