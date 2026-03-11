import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support — MyTools",
  description:
    "Support et aide pour l'application MyTools Admin. Contactez l'équipe MyTools Group pour toute question sur l'utilisation de l'application de gestion de garage.",
  alternates: { canonical: "https://www.mytoolsgroup.eu/support" },
  openGraph: {
    title: "Support — MyTools",
    description: "Contactez l'équipe MyTools Group pour toute question.",
    url: "https://www.mytoolsgroup.eu/support",
  },
};

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
