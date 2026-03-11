"use client";

import { motion } from "framer-motion";

const upcoming = [
  {
    icon: "📒",
    title: "Gestion Comptable",
    desc: "Bilan, TVA, rapports financiers automatisés.",
    color: "#3B82F6",
  },
  {
    icon: "🫧",
    title: "Gestion des Laveries",
    desc: "Suivi machines, paiements, alertes en temps réel.",
    color: "#8B5CF6",
  },
  {
    icon: "📚",
    title: "Bibliothèque Numérique",
    desc: "Documents, manuels techniques, fiches produits.",
    color: "#F59E0B",
  },
  {
    icon: "🌐",
    title: "Créateur de Site Web",
    desc: "Votre vitrine en ligne en quelques clics.",
    color: "#10B981",
  },
  {
    icon: "📦",
    title: "Gestion de Stock",
    desc: "Inventaire, commandes, fournisseurs unifiés.",
    color: "#EC4899",
  },
  {
    icon: "✨",
    title: "Et bien plus encore...",
    desc: "L'écosystème MyTools Group s'agrandit chaque mois.",
    color: "#DC2626",
  },
];

export default function ComingSoon() {
  return (
    <section className="relative py-20 md:py-32 px-4 md:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Gradient separator top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DC2626]/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-[#DC2626]" />
            <span className="font-michroma text-[#DC2626] text-xs tracking-[0.3em] uppercase">L'écosystème MyTools</span>
            <div className="h-px w-12 bg-[#DC2626]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-michroma text-3xl md:text-5xl text-white tracking-widest uppercase mb-5 leading-tight"
          >
            D'autres applications<br />
            <span className="text-[#DC2626]">arrivent bientôt</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-exo text-[#666] text-xs md:text-sm tracking-widest leading-relaxed max-w-xl mx-auto"
          >
            MyTools Group construit un écosystème complet pour les professionnels.<br />
            Une suite d'applications connectées, pensées pour votre secteur.
          </motion.p>
        </div>

        {/* Apps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {upcoming.map((app, i) => (
            <motion.div
              key={app.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="group relative bg-[#161616] border border-[#2A2A2A] hover:border-[#2A2A2A]/80 rounded-2xl p-6 overflow-hidden transition-all duration-300"
            >
              {/* Subtle hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{ background: `radial-gradient(ellipse at top left, ${app.color}08 0%, transparent 60%)` }}
              />

              {/* Bottom speed line */}
              <div
                className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
                style={{ background: `linear-gradient(to right, ${app.color}60, transparent)` }}
              />

              {/* Coming soon badge */}
              <div className="absolute top-4 right-4">
                <span className="font-michroma text-[8px] tracking-widest uppercase text-[#444] border border-[#2A2A2A] rounded px-2 py-0.5">
                  Bientôt
                </span>
              </div>

              <div className="relative">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4 border"
                  style={{ background: `${app.color}12`, borderColor: `${app.color}25` }}
                >
                  {app.icon}
                </div>
                <h3 className="font-michroma text-white text-xs tracking-widest uppercase mb-2">{app.title}</h3>
                <p className="font-exo text-[#666] text-[10px] tracking-wide leading-relaxed">{app.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA — rester connecté */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-[#DC2626]/10 to-[#161616] border border-[#DC2626]/20 rounded-2xl p-8 md:p-12 text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid opacity-20" />

          {/* Animated lines */}
          {[20, 50, 80].map((top, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-[#DC2626]/25 to-transparent"
              style={{ top: `${top}%`, width: "100%" }}
              animate={{ x: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 4 + i, delay: i * 1.2, ease: "linear" }}
            />
          ))}

          <div className="relative">
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-[#DC2626] animate-pulse" />
              <span className="font-michroma text-[#DC2626] text-[10px] tracking-[0.3em] uppercase">MyTools Group</span>
            </div>

            <h3 className="font-michroma text-white text-2xl md:text-3xl tracking-widest uppercase mb-4">
              Restez connecté
            </h3>

            <p className="font-exo text-[#A8A8A8] text-xs tracking-widest leading-relaxed max-w-lg mx-auto mb-8">
              Chaque mois, de nouvelles applications rejoignent l'écosystème MyTools Group. Inscrivez-vous pour être parmi les premiers à y accéder.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="votre@email.fr"
                className="flex-1 w-full bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#DC2626]/50 rounded-lg px-4 py-3 text-white font-exo text-xs tracking-wide placeholder:text-[#444] outline-none transition-colors"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const email = (e.target as HTMLInputElement).value;
                    if (email) window.location.href = `mailto:contact@mytoolsgroup.eu?subject=Inscription newsletter MyTools Group&body=Email d'inscription : ${email}`;
                  }
                }}
              />
              <button
                className="group w-full sm:w-auto relative inline-flex items-center justify-center gap-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-michroma text-[10px] tracking-widest uppercase px-6 py-3 rounded-lg transition-all overflow-hidden flex-shrink-0"
                onClick={(e) => {
                  const input = (e.currentTarget.parentElement?.querySelector("input") as HTMLInputElement);
                  const email = input?.value;
                  if (email) window.location.href = `mailto:contact@mytoolsgroup.eu?subject=Inscription newsletter MyTools Group&body=Email d'inscription : ${email}`;
                }}
              >
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                S'inscrire →
              </button>
            </div>

            <p className="font-michroma text-[#444] text-[9px] tracking-widest uppercase mt-4">
              Aucun spam. Vous pouvez vous désinscrire à tout moment.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Gradient separator bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2A2A2A] to-transparent" />
    </section>
  );
}
