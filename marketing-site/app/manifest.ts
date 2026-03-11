import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MyTools — Application de Gestion de Garage",
    short_name: "MyTools",
    description:
      "Application de gestion de garage : devis, factures, clients, réservations, services. Par MyTools Group.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0A0A",
    theme_color: "#DC2626",
    orientation: "portrait",
    lang: "fr",
    categories: ["business", "productivity", "utilities"],
    icons: [
      { src: "/logo.png", sizes: "192x192", type: "image/png" },
      { src: "/logo.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
