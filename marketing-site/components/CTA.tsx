"use client";

import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-brand-red/8 blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 bg-brand-red/10 border border-brand-red/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
            <span className="text-brand-red text-xs font-semibold tracking-wider uppercase">
              Accès professionnel uniquement
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-text-primary mb-6 leading-tight">
            Prêt à moderniser<br />
            <span className="text-brand-red">votre garage ?</span>
          </h2>
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Rejoignez le réseau MyTools Group et donnez à vos équipes les outils qu'elles méritent. L'accès est créé par notre service client — gratuit pour tous les garages partenaires.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contact@mytoolsgroup.eu?subject=Demande d'accès MyTools Admin"
              className="inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-semibold px-10 py-5 rounded-xl transition-all hover:shadow-xl hover:shadow-brand-red/25 text-lg"
            >
              <span>Contacter le service client</span>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="/support"
              className="inline-flex items-center justify-center border border-dark-border hover:border-brand-red/40 text-text-secondary hover:text-text-primary font-semibold px-10 py-5 rounded-xl transition-all text-lg"
            >
              Questions fréquentes
            </a>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {perks.map((perk) => (
              <div
                key={perk.title}
                className="bg-dark-surface border border-dark-border rounded-2xl p-6 text-left"
              >
                <div className="text-2xl mb-3">{perk.icon}</div>
                <h3 className="text-text-primary font-semibold mb-2">{perk.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{perk.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const perks = [
  {
    icon: "🔑",
    title: "Accès sécurisé",
    desc: "Votre compte est créé et validé par MyTools Group. Aucune inscription publique.",
  },
  {
    icon: "📱",
    title: "iOS & Android",
    desc: "L'application est disponible sur les deux plateformes, sans configuration supplémentaire.",
  },
  {
    icon: "🇫🇷",
    title: "RGPD & CNIL",
    desc: "Données hébergées en Europe. Conformité totale au RGPD. Suppression de compte disponible dans l'app.",
  },
];
