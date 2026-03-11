"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-dark-border">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-red/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-brand-red rounded-lg flex items-center justify-center">
                <span className="font-michroma text-white text-xs">MT</span>
              </div>
              <span className="font-michroma text-text-primary text-sm tracking-widest uppercase">
                MyTools Admin
              </span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              L'application mobile pour les administrateurs de garages partenaires MyTools Group. Built for Performance.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="mailto:contact@mytoolsgroup.eu"
                className="inline-flex items-center gap-2 bg-dark-surface border border-dark-border hover:border-brand-red/40 text-text-secondary hover:text-text-primary text-xs font-medium px-3 py-2 rounded-lg transition-colors"
              >
                📧 contact@mytoolsgroup.eu
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-text-primary font-semibold text-sm mb-4">Application</h4>
            <ul className="space-y-3">
              {appLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-text-secondary hover:text-text-primary text-sm transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-text-primary font-semibold text-sm mb-4">Légal</h4>
            <ul className="space-y-3">
              {legalLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-text-secondary hover:text-text-primary text-sm transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-tertiary text-xs">
            © {year} MyTools Group. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-text-tertiary text-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Hébergé en Europe
            </span>
            <span className="text-text-tertiary text-xs">RGPD Conforme</span>
            <span className="text-text-tertiary text-xs">CNIL Déclaré</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

const appLinks = [
  { label: "Fonctionnalités", href: "#features" },
  { label: "Comment ça marche", href: "#how-it-works" },
  { label: "Support", href: "/support" },
  { label: "Demander un accès", href: "mailto:contact@mytoolsgroup.eu?subject=Demande accès MyTools Admin" },
];

const legalLinks = [
  { label: "Politique de confidentialité", href: "/privacy" },
  { label: "Mentions légales", href: "/privacy#mentions" },
  { label: "RGPD & Vos droits", href: "/privacy#droits" },
  { label: "Suppression de compte", href: "/privacy#suppression" },
];
