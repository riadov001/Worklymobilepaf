"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const items = [
  {
    n:    "01",
    id:   "devis",
    name: "DEVIS",
    line: "Créez un devis en 30 secondes. Photos du véhicule. Suivi des statuts en temps réel.",
    detail: [
      "Création avec immatriculation, marque, modèle",
      "Photos véhicule directement depuis l'app",
      "Statuts : En attente · Approuvé · Refusé · Terminé",
      "Notes internes visibles uniquement par l'admin",
    ],
  },
  {
    n:    "02",
    id:   "factures",
    name: "FACTURES",
    line: "Cycle de paiement complet. Payée, en attente, en retard, annulée.",
    detail: [
      "4 statuts : Payée · En attente · En retard · Annulée",
      "Total TTC calculé automatiquement",
      "Historique complet par client",
      "Alertes sur factures impayées",
    ],
  },
  {
    n:    "03",
    id:   "clients",
    name: "CLIENTS",
    line: "Base clients toujours à portée de main. Recherche instantanée.",
    detail: [
      "Fiche client : nom, email, téléphone, adresse",
      "Historique devis & factures par client",
      "Recherche par nom ou email en temps réel",
      "Création et mise à jour en mobilité",
    ],
  },
  {
    n:    "04",
    id:   "rdv",
    name: "RDV",
    line: "Agenda ou liste. Confirmez, terminez, annulez en un tap.",
    detail: [
      "Calendrier mensuel avec indicateurs de RDV",
      "Liste chronologique avec statuts colorés",
      "Statuts : Confirmé · Terminé · Annulé · En attente",
      "Création et modification à la volée",
    ],
  },
  {
    n:    "05",
    id:   "services",
    name: "SERVICES",
    line: "Catalogue de prestations. Prix, durée, synchronisation instantanée.",
    detail: [
      "Nom, description, prix HT/TTC, durée",
      "Recherche dans le catalogue en temps réel",
      "Ajout rapide lors de la création d'un devis",
      "Synchronisation API instantanée",
    ],
  },
];

export default function Capabilities() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="features" className="py-20 md:py-32 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-20 flex flex-col gap-5 md:flex-row md:items-end md:gap-20"
        >
          <div className="shrink-0">
            <p className="font-michroma text-[#DC2626] text-[9px] tracking-widest uppercase mb-3">Modules</p>
            <h2 className="font-michroma text-white uppercase leading-tight">
              <span className="text-2xl md:text-4xl lg:text-5xl tracking-wide block">Cinq modules.</span>
              <span className="text-2xl md:text-4xl lg:text-5xl tracking-wide block text-[#2A2A2A]">Un seul outil.</span>
            </h2>
          </div>
          <p className="font-exo text-[#555] text-[10px] md:text-xs tracking-wide leading-relaxed max-w-xs">
            Chaque module est relié à l'API MyTools Group en temps réel. Aucune synchronisation manuelle.
          </p>
        </motion.div>

        {/* Spec list */}
        <div className="border-t border-[#1A1A1A]">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.04 }}
              className="border-b border-[#1A1A1A]"
            >
              <button
                onClick={() => setOpen(open === item.id ? null : item.id)}
                className="w-full flex items-center gap-4 md:gap-10 py-5 md:py-7 text-left group"
              >
                {/* Number */}
                <span className="font-michroma text-[#2A2A2A] text-[10px] tracking-widest shrink-0 group-hover:text-[#DC2626] transition-colors duration-300 w-6">
                  {item.n}
                </span>

                {/* Name */}
                <span className="font-exo text-white text-sm md:text-xl tracking-wide group-hover:text-[#DC2626] transition-colors duration-300 shrink-0 w-24 md:w-36">
                  {item.name}
                </span>

                {/* Description — hidden on very small screens */}
                <span className="font-exo text-[#3A3A3A] text-[9px] md:text-[10px] tracking-wide leading-relaxed flex-1 hidden sm:block">
                  {item.line}
                </span>

                {/* Toggle */}
                <span className={`font-michroma text-[#333] text-sm shrink-0 transition-transform duration-300 ml-auto ${open === item.id ? "rotate-45 text-[#DC2626]" : ""}`}>
                  +
                </span>
              </button>

              {/* Mobile description */}
              <div className="sm:hidden px-10 pb-2">
                <p className="font-exo text-[#333] text-[9px] tracking-wide leading-relaxed">
                  {item.line}
                </p>
              </div>

              {/* Expanded detail */}
              <motion.div
                initial={false}
                animate={open === item.id ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="pl-10 md:pl-[10.5rem] pb-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {item.detail.map((d) => (
                    <div key={d} className="flex items-start gap-3">
                      <div className="w-px h-3.5 bg-[#DC2626] shrink-0 mt-0.5" />
                      <span className="font-exo text-[#555] text-[9px] tracking-wide leading-relaxed">{d}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
