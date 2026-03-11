import type { Metadata } from "next";
import "./globals.css";

const BASE_URL = "https://www.mytoolsgroup.eu";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "MyTools — Application de Gestion de Garage | MyTools Group",
    template: "%s | MyTools",
  },
  description:
    "MyTools est l'application de gestion de garage tout-en-un : devis, factures, clients, réservations et services en temps réel. PWA disponible. App mobile iOS & Android bientôt.",

  keywords: [
    "MyTools",
    "MyTools Group",
    "MyTools Admin",
    "application gestion garage",
    "logiciel garage automobile",
    "gestion devis garage",
    "facturation garage",
    "gestion clients garage",
    "réservations garage",
    "PWA garage",
    "app mobile garage",
    "saas garage automobile",
    "gestion atelier mécanique",
    "logiciel carrosserie",
    "mytools admin",
    "mytoolsgroup",
  ],

  authors: [{ name: "MyTools Group", url: BASE_URL }],
  creator: "MyTools Group",
  publisher: "MyTools Group",

  alternates: {
    canonical: BASE_URL,
    languages: { "fr-FR": BASE_URL },
  },

  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "MyTools",
    title: "MyTools — Application de Gestion de Garage",
    description:
      "Gérez votre garage depuis votre téléphone. Devis, factures, clients, réservations, services. PWA disponible maintenant sur saas.mytoolsgroup.eu.",
    locale: "fr_FR",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MyTools — Application de Gestion de Garage",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "MyTools — Application de Gestion de Garage",
    description:
      "Gérez votre garage depuis votre téléphone. Devis, factures, clients, réservations. PWA disponible maintenant.",
    images: ["/og-image.png"],
    creator: "@mytoolsgroup",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "MyTools Group",
      alternateName: "MyTools",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
        width: 512,
        height: 512,
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "contact@mytoolsgroup.eu",
        contactType: "customer support",
        availableLanguage: "French",
      },
      sameAs: [`${BASE_URL}`],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "MyTools",
      description: "Application de gestion de garage tout-en-un",
      publisher: { "@id": `${BASE_URL}/#organization` },
      inLanguage: "fr-FR",
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${BASE_URL}/?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${BASE_URL}/#app`,
      name: "MyTools Admin",
      alternateName: ["MyTools", "MyTools Group App", "MyTools Garage"],
      applicationCategory: "BusinessApplication",
      operatingSystem: ["iOS", "Android", "Web"],
      url: "https://saas.mytoolsgroup.eu",
      description:
        "Application de gestion de garage : devis, factures, clients, réservations et services. Disponible en PWA, bientôt sur App Store et Google Play.",
      author: { "@id": `${BASE_URL}/#organization` },
      publisher: { "@id": `${BASE_URL}/#organization` },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
      },
      featureList: [
        "Gestion des devis",
        "Facturation",
        "Gestion des clients",
        "Réservations et rendez-vous",
        "Catalogue de services",
        "Dashboard KPI en temps réel",
        "API REST 40+ endpoints",
        "Progressive Web App",
      ],
      screenshot: [
        `${BASE_URL}/screenshots/dashboard.png`,
        `${BASE_URL}/screenshots/login.png`,
        `${BASE_URL}/screenshots/services.png`,
      ],
      inLanguage: "fr-FR",
    },
    {
      "@type": "WebPage",
      "@id": `${BASE_URL}/#webpage`,
      url: BASE_URL,
      name: "MyTools — Application de Gestion de Garage",
      description:
        "MyTools est l'application de gestion de garage tout-en-un : devis, factures, clients, réservations et services en temps réel.",
      isPartOf: { "@id": `${BASE_URL}/#website` },
      about: { "@id": `${BASE_URL}/#app` },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "MyTools",
            item: BASE_URL,
          },
        ],
      },
      inLanguage: "fr-FR",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Qu'est-ce que MyTools ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "MyTools est une application de gestion de garage tout-en-un développée par MyTools Group. Elle permet aux administrateurs de gérer leurs devis, factures, clients, réservations et services depuis leur smartphone.",
          },
        },
        {
          "@type": "Question",
          name: "Comment accéder à MyTools ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "MyTools est disponible en PWA sur saas.mytoolsgroup.eu. L'accès est réservé aux garages partenaires MyTools Group. Une application iOS et Android est prévue pour 2026.",
          },
        },
        {
          "@type": "Question",
          name: "MyTools est-il disponible sur iPhone et Android ?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "MyTools est actuellement disponible en Progressive Web App (PWA) compatible avec tous les navigateurs mobiles. L'application native App Store et Google Play est prévue pour 2026.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="canonical" href={BASE_URL} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="theme-color" content="#0A0A0A" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="MyTools" />
        <meta name="application-name" content="MyTools" />
        <meta name="geo.region" content="FR" />
        <meta name="geo.placename" content="France" />
        <meta property="og:locale:alternate" content="en_US" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-dark-base text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
