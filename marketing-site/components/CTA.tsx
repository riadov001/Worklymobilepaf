"use client";

import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="relative py-20 md:py-32 px-4 md:px-8 overflow-hidden">
      <div className="absolute inset-0 hero-glow opacity-60" />
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Animated speed lines */}
      {[15, 35, 55, 75, 90].map((top, i) => (
        <motion.div
          key={i}
          className="absolute left-0 h-px bg-gradient-to-r from-transparent via-[#DC2626]/40 to-transparent"
          style={{ top: `${top}%`, width: "200px" }}
          animate={{ x: ["-200px", "120vw"], opacity: [0, 1, 1, 0] }}
          transition={{ repeat: Infinity, duration: 3, delay: i * 0.6, ease: "easeInOut" }}
        />
      ))}

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2.5 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="font-michroma text-green-400 text-[10px] tracking-widest uppercase">PWA disponible dès maintenant</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-michroma text-2xl md:text-4xl lg:text-5xl text-white tracking-widest uppercase mb-6 leading-tight text-center"
        >
          Prêt à passer<br />
          <span className="text-[#DC2626]">à la vitesse supérieure ?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-michroma text-[#A8A8A8] text-xs md:text-sm tracking-widest leading-relaxed max-w-2xl mx-auto mb-12"
        >
          Zéro paperasse. Zéro double saisie. Zéro rendez-vous manqué.<br />
          Rejoignez les garages qui pilotent leur activité en temps réel.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          {/* PWA — live */}
          <a
            href="https://saas.mytoolsgroup.eu"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-michroma text-xs tracking-widest uppercase px-8 py-4 rounded-lg transition-all hover:shadow-[0_0_40px_rgba(220,38,38,0.5)] overflow-hidden"
          >
            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
            </svg>
            Accéder à la PWA
          </a>

          {/* Form CTA */}
          <a
            href="#contact"
            className="inline-flex items-center gap-3 border border-[#2A2A2A] hover:border-[#DC2626]/50 text-[#A8A8A8] hover:text-white font-michroma text-xs tracking-widest uppercase px-8 py-4 rounded-lg transition-all"
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Demander l'accès Admin
          </a>
        </motion.div>

        {/* Store badges — coming soon */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center gap-4"
        >
          <p className="font-michroma text-[#444] text-[10px] tracking-widest uppercase">
            Application mobile — Bientôt disponible sur
          </p>
          <div className="flex items-center gap-3">
            {[
              { icon: "🍎", label: "App Store", sub: "iOS 15+" },
              { icon: "▶", label: "Google Play", sub: "Android 8+" },
            ].map((b) => (
              <div
                key={b.label}
                className="flex items-center gap-2.5 bg-[#161616] border border-[#2A2A2A] rounded-xl px-5 py-3 opacity-50"
              >
                <span className="text-xl">{b.icon}</span>
                <div>
                  <div className="font-michroma text-[#666] text-[8px] tracking-widest uppercase">Disponible sur</div>
                  <div className="font-michroma text-white text-[10px] tracking-widest">{b.label}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
