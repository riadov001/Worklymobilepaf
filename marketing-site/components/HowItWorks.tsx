"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Demandez votre accès",
    description: "Remplissez le formulaire de qualification. Nous analysons votre activité et vous proposons le plan le plus adapté sous 24h.",
    tag: "Qualification",
    highlight: false,
  },
  {
    number: "02",
    title: "Accès immédiat à la PWA",
    description: "Connectez-vous dès maintenant sur saas.mytoolsgroup.eu depuis n'importe quel navigateur. Aucune installation, 100% opérationnel.",
    tag: "Disponible",
    highlight: true,
  },
  {
    number: "03",
    title: "App mobile sur les stores",
    description: "L'application iOS et Android arrive bientôt. Gérez votre garage en mobilité totale, avec notifications push et mode hors-ligne.",
    tag: "Bientôt",
    highlight: false,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-20 md:py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-[#DC2626]" />
            <span className="font-michroma text-[#DC2626] text-xs tracking-[0.3em] uppercase">Comment ça marche</span>
            <div className="h-px w-12 bg-[#DC2626]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-michroma text-2xl md:text-4xl lg:text-5xl text-white tracking-widest uppercase mb-4 text-center"
          >
            Trois étapes<br />
            <span className="text-[#DC2626]">pour démarrer</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-exo text-[#666] text-sm max-w-xl mx-auto leading-relaxed"
          >
            La PWA est déjà en ligne. L'app mobile arrive sur App Store et Google Play.
          </motion.p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`flex-1 relative rounded-2xl p-6 md:p-8 border transition-all ${
                s.highlight
                  ? "border-green-500/30 bg-gradient-to-br from-green-500/5 to-[#161616]"
                  : "border-[#2A2A2A] bg-[#161616]"
              }`}
            >
              {s.highlight && (
                <div className="absolute -top-3 left-6 flex items-center gap-1.5 bg-[#0A0A0A] border border-green-500/30 rounded-full px-3 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-michroma text-green-400 text-[8px] tracking-widest uppercase">En ligne maintenant</span>
                </div>
              )}

              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 z-10 font-michroma text-[#DC2626] text-lg">→</div>
              )}

              <div className="font-michroma text-5xl tracking-widest opacity-10 mb-4 text-white">{s.number}</div>
              <h3 className="font-michroma text-white text-sm tracking-widest uppercase mb-3">{s.title}</h3>
              <p className="font-exo text-[#666] text-xs tracking-wide leading-relaxed mb-5">{s.description}</p>

              <span className={`font-michroma text-[9px] tracking-widest uppercase px-2.5 py-1 rounded border ${
                s.highlight
                  ? "border-green-500/30 text-green-400 bg-green-500/5"
                  : i === 2
                  ? "border-[#DC2626]/30 text-[#DC2626]"
                  : "border-[#2A2A2A] text-[#666]"
              }`}>
                {s.tag}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
