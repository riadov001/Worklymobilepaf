"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: "📊",
    title: "Tableau de bord analytique",
    description:
      "Visualisez en temps réel votre chiffre d'affaires encaissé, le CA en attente, l'évolution mensuelle et tous vos indicateurs clés sur un seul écran.",
    tag: "Dashboard",
  },
  {
    icon: "📄",
    title: "Gestion des devis",
    description:
      "Créez, modifiez et suivez vos devis avec photos. Changez les statuts (en attente, approuvé, refusé, terminé) en un tap depuis le terrain.",
    tag: "Devis",
  },
  {
    icon: "🧾",
    title: "Suivi des factures",
    description:
      "Émettez des factures et suivez leur statut (payé, en attente, en retard, annulé). Gardez une vue d'ensemble de votre facturation mensuelle.",
    tag: "Factures",
  },
  {
    icon: "📅",
    title: "Réservations & Rendez-vous",
    description:
      "Gérez votre agenda avec le sélecteur de date intégré. Confirmez ou annulez des rendez-vous, créez de nouveaux créneaux en quelques secondes.",
    tag: "Planning",
  },
  {
    icon: "👥",
    title: "Base clients complète",
    description:
      "Accédez à l'ensemble de vos fiches clients. Créez, modifiez et recherchez des clients directement depuis votre téléphone.",
    tag: "Clients",
  },
  {
    icon: "🔒",
    title: "Sécurité entreprise",
    description:
      "Accès fermé et sécurisé par JWT. Chaque utilisateur est validé par MyTools Group. Vos données métier ne quittent jamais nos serveurs européens.",
    tag: "Sécurité",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-brand-red font-michroma text-xs tracking-widest uppercase mb-4">
            Fonctionnalités
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Tout ce dont votre garage a besoin
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            MyTools Admin regroupe tous les outils de gestion en une seule application mobile, conçue pour fonctionner là où vous travaillez vraiment.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group bg-dark-surface border border-dark-border hover:border-brand-red/30 rounded-2xl p-7 transition-all hover:shadow-lg hover:shadow-brand-red/5"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 bg-brand-red/10 rounded-xl flex items-center justify-center text-2xl group-hover:bg-brand-red/20 transition-colors">
                  {feature.icon}
                </div>
                <span className="text-xs font-semibold text-text-tertiary bg-dark-elevated px-2.5 py-1 rounded-full border border-dark-border">
                  {feature.tag}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-3">
                {feature.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 bg-dark-surface border border-dark-border rounded-3xl p-10 grid md:grid-cols-4 gap-8 text-center"
        >
          {platformStats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-brand-red mb-2">{s.value}</div>
              <div className="text-text-secondary text-sm">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const platformStats = [
  { value: "iOS & Android", label: "Plateformes supportées" },
  { value: "Temps réel", label: "Synchronisation des données" },
  { value: "EU", label: "Hébergement des données" },
  { value: "RGPD", label: "Conformité légale" },
];
