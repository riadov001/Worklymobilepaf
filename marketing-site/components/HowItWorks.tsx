"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Rejoignez le réseau MyTools",
    description:
      "Contactez le service client MyTools Group pour intégrer le réseau de garages partenaires. Votre compte administrateur est créé et sécurisé par notre équipe.",
    icon: "🤝",
    detail: "Accès réservé aux professionnels vérifiés",
  },
  {
    number: "02",
    title: "Téléchargez l'application",
    description:
      "Disponible sur l'App Store et le Google Play Store. Connectez-vous avec vos identifiants administrateur. L'interface s'adapte automatiquement à votre thème (clair/sombre).",
    icon: "📱",
    detail: "iOS 13+ et Android 8.0+",
  },
  {
    number: "03",
    title: "Gérez votre garage en mobilité",
    description:
      "Accédez à tous vos outils métier depuis n'importe où. Dashboard en temps réel, création de devis en 30 secondes, suivi des factures, gestion des rendez-vous. Tout, dans votre poche.",
    icon: "⚡",
    detail: "Synchronisation instantanée avec le back-office",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-32 bg-dark-surface/30">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-dark-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-dark-border to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-brand-red font-michroma text-xs tracking-widest uppercase mb-4">
            Comment ça marche
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Simple. Rapide. Professionnel.
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            Trois étapes pour transformer la gestion de votre garage.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 relative">
          <div className="hidden lg:block absolute top-16 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-brand-red/30 to-transparent" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative"
            >
              <div className="bg-dark-surface border border-dark-border rounded-2xl p-8 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-brand-red/10 border border-brand-red/20 rounded-2xl flex items-center justify-center text-2xl">
                    {step.icon}
                  </div>
                  <span className="font-michroma text-4xl text-brand-red/20 font-bold">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-text-primary mb-4">
                  {step.title}
                </h3>
                <p className="text-text-secondary leading-relaxed mb-5 text-sm">
                  {step.description}
                </p>

                <div className="inline-flex items-center gap-2 bg-dark-elevated px-3 py-1.5 rounded-full border border-dark-border">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                  <span className="text-text-tertiary text-xs">{step.detail}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
