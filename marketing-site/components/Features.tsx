"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: "📊",
    title: "Tableau de bord",
    description: "CA encaissé, CA en attente, évolution mensuelle. Tous vos KPIs en un coup d'œil. Décidez vite, agissez mieux.",
    tag: "Dashboard",
  },
  {
    icon: "📄",
    title: "Devis instantanés",
    description: "Créez, modifiez et envoyez des devis professionnels en quelques secondes, depuis votre téléphone.",
    tag: "Devis",
  },
  {
    icon: "🧾",
    title: "Facturation pro",
    description: "Transformez un devis en facture en un tap. Suivez vos encaissements en temps réel.",
    tag: "Factures",
  },
  {
    icon: "📅",
    title: "Réservations",
    description: "Gérez votre planning atelier. Aucun rendez-vous manqué, aucun créneau perdu.",
    tag: "Planning",
  },
  {
    icon: "👥",
    title: "Clients 360°",
    description: "Fiche client complète : historique, devis, factures, véhicules. Tout en un seul endroit.",
    tag: "CRM",
  },
  {
    icon: "🔄",
    title: "Sync temps réel",
    description: "Données synchronisées en permanence avec votre back-office SaaS. Aucune saisie double.",
    tag: "Sync",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-20 md:py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-[#DC2626]" />
            <span className="font-michroma text-[#DC2626] text-xs tracking-[0.3em] uppercase">Fonctionnalités</span>
            <div className="h-px w-12 bg-[#DC2626]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-michroma text-2xl md:text-4xl lg:text-5xl text-white tracking-widest uppercase mb-4 text-center"
          >
            Tout ce dont vous<br />
            <span className="text-[#DC2626]">avez besoin</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-michroma text-[#666] text-xs md:text-sm tracking-widest max-w-xl mx-auto leading-relaxed"
          >
            Une application pensée pour les garages qui veulent aller plus vite,<br />
            gérer mieux, et ne plus rien rater.
          </motion.p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.tag}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative bg-[#161616] border border-[#2A2A2A] hover:border-[#DC2626]/40 rounded-2xl p-6 transition-all duration-300 overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#DC2626]/0 to-[#DC2626]/0 group-hover:from-[#DC2626]/5 group-hover:to-transparent transition-all duration-500 rounded-2xl" />

              {/* Speed line on hover */}
              <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-gradient-to-r from-[#DC2626] to-transparent transition-all duration-500" />

              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-[#DC2626]/10 border border-[#DC2626]/20 rounded-xl flex items-center justify-center text-lg">
                    {f.icon}
                  </div>
                  <span className="font-michroma text-[#2A2A2A] group-hover:text-[#DC2626]/40 text-[9px] tracking-widest uppercase transition-colors">
                    {f.tag}
                  </span>
                </div>
                <h3 className="font-michroma text-white text-sm tracking-widest uppercase mb-2">{f.title}</h3>
                <p className="font-michroma text-[#666] text-xs leading-relaxed tracking-wide">{f.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
