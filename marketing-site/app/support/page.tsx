"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-dark-base">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-32">
        <div className="mb-16 text-center">
          <p className="text-brand-red font-michroma text-sm tracking-widest uppercase mb-4">
            Assistance
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Support MyTools Admin
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Besoin d'aide avec MyTools Admin ? Notre équipe est disponible pour vous accompagner.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="bg-dark-surface border border-dark-border rounded-2xl p-8 hover:border-brand-red/30 transition-colors">
            <div className="w-12 h-12 bg-brand-red/10 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">📧</span>
            </div>
            <h2 className="text-xl font-semibold text-text-primary mb-2">Email</h2>
            <p className="text-text-secondary mb-4">Pour toute question technique ou demande d'accès.</p>
            <a
              href="mailto:contact@mytoolsgroup.eu"
              className="text-brand-red hover:text-brand-red-light font-medium transition-colors"
            >
              contact@mytoolsgroup.eu →
            </a>
          </div>

          <div className="bg-dark-surface border border-dark-border rounded-2xl p-8 hover:border-brand-red/30 transition-colors">
            <div className="w-12 h-12 bg-brand-red/10 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">🌐</span>
            </div>
            <h2 className="text-xl font-semibold text-text-primary mb-2">Site web</h2>
            <p className="text-text-secondary mb-4">Visitez notre site pour plus d'informations sur nos services.</p>
            <a
              href="https://www.mytoolsgroup.eu"
              className="text-brand-red hover:text-brand-red-light font-medium transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.mytoolsgroup.eu →
            </a>
          </div>
        </div>

        <div className="bg-dark-surface border border-dark-border rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-text-primary mb-8">Questions fréquentes</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className={i < faqs.length - 1 ? "pb-6 border-b border-dark-border" : ""}>
                <h3 className="text-text-primary font-semibold mb-2">{faq.q}</h3>
                <p className="text-text-secondary leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-dark-surface border border-brand-red/20 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-semibold text-text-primary mb-3">
            Vous souhaitez accéder à MyTools Admin ?
          </h2>
          <p className="text-text-secondary mb-6">
            L'accès est réservé aux garages partenaires MyTools Group. Contactez notre service client pour rejoindre le réseau.
          </p>
          <a
            href="mailto:contact@mytoolsgroup.eu?subject=Demande d'accès MyTools Admin"
            className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Demander un accès
          </a>
        </div>
      </div>
      <Footer />
    </main>
  );
}

const faqs = [
  {
    q: "Comment obtenir un compte MyTools Admin ?",
    a: "Les comptes sont créés exclusivement par le service client MyTools Group. Envoyez un email à contact@mytoolsgroup.eu avec le nom de votre garage et vos coordonnées.",
  },
  {
    q: "J'ai oublié mon mot de passe. Que faire ?",
    a: "Sur l'écran de connexion de l'application, appuyez sur « Mot de passe oublié ? » pour recevoir un lien de réinitialisation par email.",
  },
  {
    q: "L'application est-elle disponible sur Android et iOS ?",
    a: "Oui, MyTools Admin est disponible sur l'App Store (iPhone/iPad) et le Google Play Store (Android). Recherchez « MyTools Admin » sur la boutique de votre appareil.",
  },
  {
    q: "Mes données sont-elles sécurisées ?",
    a: "Oui. Toutes les données sont chiffrées en transit (TLS 1.2+), hébergées sur des serveurs européens, et l'accès nécessite une authentification JWT. Aucun tiers n'a accès à vos données métier.",
  },
  {
    q: "Comment supprimer mon compte ?",
    a: "Depuis l'application : Dashboard → icône corbeille rouge en haut à droite → confirmer en 2 étapes. La suppression est définitive et irréversible.",
  },
  {
    q: "L'application fonctionne-t-elle sans connexion internet ?",
    a: "MyTools Admin nécessite une connexion internet pour synchroniser les données avec le back-office MyTools Group. Un mode hors-ligne est prévu dans une prochaine version.",
  },
];
