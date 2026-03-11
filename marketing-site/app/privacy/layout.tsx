import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité — MyTools",
  description:
    "Politique de confidentialité de l'application MyTools Admin par MyTools Group. Informations sur la collecte et l'utilisation des données personnelles.",
  alternates: { canonical: "https://www.mytoolsgroup.eu/privacy" },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Politique de confidentialité — MyTools",
    url: "https://www.mytoolsgroup.eu/privacy",
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
