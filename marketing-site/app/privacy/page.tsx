"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-dark-base">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-32">
        <div className="mb-16">
          <p className="text-brand-red font-michroma text-sm tracking-widest uppercase mb-4">
            Légal
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Politique de confidentialité
          </h1>
          <p className="text-text-secondary text-lg">
            Dernière mise à jour : Mars 2026
          </p>
        </div>

        <div className="prose prose-invert max-w-none space-y-10 text-text-secondary leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">1. Introduction</h2>
            <p>
              MyTools Admin est opéré par <strong className="text-text-primary">MyTools Group</strong>. Cette politique de confidentialité explique comment nous collectons, utilisons, stockons et protégeons vos données personnelles lorsque vous utilisez notre application mobile.
            </p>
            <p className="mt-3">
              Cette application est exclusivement réservée aux administrateurs et employés des garages partenaires MyTools Group ("Utilisateurs Autorisés").
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">2. Responsable du traitement</h2>
            <div className="bg-dark-surface border border-dark-border rounded-2xl p-6">
              <p className="text-text-primary font-semibold">MyTools Group</p>
              <p className="mt-2">Email : <a href="mailto:contact@mytoolsgroup.eu" className="text-brand-red hover:underline">contact@mytoolsgroup.eu</a></p>
              <p>Site web : <a href="https://www.mytoolsgroup.eu" className="text-brand-red hover:underline">www.mytoolsgroup.eu</a></p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">3. Données collectées</h2>

            <h3 className="text-lg font-semibold text-text-primary mt-6 mb-3">3.1 Données de compte</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Nom et prénom</li>
              <li>Adresse email professionnelle</li>
              <li>Mot de passe chiffré</li>
              <li>Rôle (administrateur ou employé)</li>
              <li>Identifiant du garage associé</li>
            </ul>

            <h3 className="text-lg font-semibold text-text-primary mt-6 mb-3">3.2 Données métier</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Informations clients (nom, email, téléphone, adresse)</li>
              <li>Devis et factures (montants, services, dates, statuts)</li>
              <li>Réservations (date, heure, client, service)</li>
              <li>Photos jointes aux devis</li>
            </ul>

            <h3 className="text-lg font-semibold text-text-primary mt-6 mb-3">3.3 Données techniques</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Type d'appareil et système d'exploitation</li>
              <li>Version de l'application</li>
              <li>Horodatages de connexion (audit de sécurité)</li>
              <li>Journaux d'erreurs (stabilité de l'application)</li>
            </ul>

            <div className="mt-6 p-4 bg-dark-surface border border-dark-border rounded-xl">
              <p className="text-text-secondary text-sm">
                <strong className="text-text-primary">Nous ne collectons pas :</strong> données de localisation, identifiants publicitaires, comportement de navigation à des fins marketing, ni données partagées avec des régies publicitaires.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">4. Base légale (RGPD)</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-dark-border">
                    <th className="text-left py-3 pr-6 text-text-primary font-semibold">Type de données</th>
                    <th className="text-left py-3 text-text-primary font-semibold">Base légale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-border">
                  <tr>
                    <td className="py-3 pr-6">Données de compte</td>
                    <td className="py-3">Nécessité contractuelle</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6">Données métier</td>
                    <td className="py-3">Intérêt légitime (gestion de l'activité)</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6">Données techniques</td>
                    <td className="py-3">Intérêt légitime (sécurité et stabilité)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">5. Conservation des données</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Données de compte : durée de la relation contractuelle + 5 ans</li>
              <li>Données métier (factures, devis) : <strong className="text-text-primary">10 ans</strong> (Code de commerce, Art. L123-22)</li>
              <li>Journaux techniques : 90 jours</li>
            </ul>
            <p className="mt-4">Toutes les données sont hébergées sur des serveurs situés dans l'<strong className="text-text-primary">Union Européenne</strong>.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">6. Vos droits (RGPD)</h2>
            <p className="mb-4">En tant que personne concernée, vous disposez des droits suivants :</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong className="text-text-primary">Accès</strong> — consulter vos données personnelles</li>
              <li><strong className="text-text-primary">Rectification</strong> — corriger des données inexactes</li>
              <li><strong className="text-text-primary">Effacement</strong> — supprimer votre compte (disponible directement dans l'app)</li>
              <li><strong className="text-text-primary">Portabilité</strong> — recevoir vos données dans un format structuré</li>
              <li><strong className="text-text-primary">Opposition</strong> — s'opposer au traitement basé sur l'intérêt légitime</li>
            </ul>

            <div className="mt-6 p-4 bg-dark-surface border border-brand-red/30 rounded-xl">
              <p className="text-text-secondary text-sm">
                <strong className="text-text-primary">Suppression de compte depuis l'app :</strong> Dashboard → icône corbeille → confirmation en 2 étapes. La suppression est permanente et irréversible.
              </p>
            </div>

            <p className="mt-4">Pour exercer vos droits : <a href="mailto:contact@mytoolsgroup.eu" className="text-brand-red hover:underline">contact@mytoolsgroup.eu</a></p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">7. Contact & Réclamations</h2>
            <p>Pour toute question sur cette politique ou pour exercer vos droits :</p>
            <p className="mt-2"><strong className="text-text-primary">MyTools Group</strong> — <a href="mailto:contact@mytoolsgroup.eu" className="text-brand-red hover:underline">contact@mytoolsgroup.eu</a></p>
            <p className="mt-4 text-sm">Vous pouvez également déposer une plainte auprès de la <strong className="text-text-primary">CNIL</strong> : <a href="https://www.cnil.fr" className="text-brand-red hover:underline" target="_blank" rel="noopener noreferrer">www.cnil.fr</a></p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
