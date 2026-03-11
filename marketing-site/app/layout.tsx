import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MyTools Admin — Gestion de garage simplifiée",
  description:
    "MyTools Admin est l'application mobile exclusive pour les administrateurs de garages partenaires MyTools Group. Gérez vos devis, factures, réservations et clients en temps réel.",
  keywords:
    "garage, gestion, devis, factures, réservations, clients, mytools, admin, automobile, atelier",
  authors: [{ name: "MyTools Group", url: "https://www.mytoolsgroup.eu" }],
  creator: "MyTools Group",
  metadataBase: new URL("https://www.mytoolsgroup.eu"),
  openGraph: {
    title: "MyTools Admin — Gestion de garage simplifiée",
    description:
      "L'application mobile pour les administrateurs de garages partenaires MyTools. Devis, factures, clients et réservations en temps réel.",
    url: "https://www.mytoolsgroup.eu",
    siteName: "MyTools Admin",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MyTools Admin — Built for Performance",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MyTools Admin — Gestion de garage simplifiée",
    description:
      "L'application mobile pour les administrateurs de garages partenaires MyTools.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="bg-dark-base text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
