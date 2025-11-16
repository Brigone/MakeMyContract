import type { Metadata } from "next";
import { Suspense } from "react";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GA_TRACKING_ID } from "@/lib/analytics";
import { GA4Tracker } from "@/components/analytics/ga-tracker";

const SITE_URL = "https://makemycontract.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | Make My Contract",
    default:
      "Make My Contract — Professional U.S. contracts without the law firm",
  },
  description:
    "Make My Contract helps founders, operators, and teams create attorney-level U.S. contracts online in minutes.",
  keywords: [
    "create contract online",
    "legal contract generator",
    "online contract builder",
    "PDF contract creator",
    "NDA generator",
    "lease agreement generator",
    "Make My Contract",
    "U.S. contract templates",
  ],
  alternates: {
    canonical: SITE_URL,
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
  openGraph: {
    title: "Make My Contract — Create legally binding contracts online",
    description:
      "Guided intake, attorney-style templates, and signature-ready PDFs for modern U.S. businesses.",
    url: SITE_URL,
    siteName: "Make My Contract",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Make My Contract dashboard preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Make My Contract",
    description:
      "Generate professional U.S. contracts in minutes—no law firm retainer or confusing legal jargon.",
    site: "@makemycontract",
    creator: "@makemycontract",
    images: [`${SITE_URL}/og-image.png`],
  },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Make My Contract",
    url: SITE_URL,
    description:
      "SaaS platform for generating attorney-style U.S. contracts online in minutes.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Make My Contract Subscription",
    description:
      "Online contract builder offering unlimited attorney-style agreements, PDF exports, and contract storage.",
    brand: {
      "@type": "Brand",
      name: "Make My Contract",
    },
    offers: {
      "@type": "OfferCatalog",
      name: "Make My Contract Pricing",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Unlimited Weekly",
          price: "9",
          priceCurrency: "USD",
          url: `${SITE_URL}/pricing`,
        },
        {
          "@type": "Offer",
          name: "Unlimited Monthly",
          price: "19",
          priceCurrency: "USD",
          url: `${SITE_URL}/pricing`,
        },
        {
          "@type": "Offer",
          name: "Unlimited Annual",
          price: "99",
          priceCurrency: "USD",
          url: `${SITE_URL}/pricing`,
        },
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "Make My Contract Legal Document Automation",
    url: SITE_URL,
    areaServed: "US",
    serviceType: [
      "Contract drafting",
      "Legal document automation",
      "PDF contract generation",
    ],
    provider: {
      "@type": "Organization",
      name: "Make My Contract",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Make My Contract Pricing Catalog",
    itemListElement: ["Weekly", "Monthly", "Annual"].map((tier) => ({
      "@type": "Offer",
      name: `Unlimited ${tier}`,
      url: `${SITE_URL}/pricing`,
      priceCurrency: "USD",
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: "Primary Navigation",
    url: SITE_URL,
    hasPart: [
      { "@type": "WebPage", name: "Home", url: `${SITE_URL}/#hero` },
      { "@type": "WebPage", name: "Pricing", url: `${SITE_URL}/pricing` },
      { "@type": "WebPage", name: "Contracts", url: `${SITE_URL}/contracts` },
      { "@type": "WebPage", name: "Login", url: `${SITE_URL}/login` },
      { "@type": "WebPage", name: "Signup", url: `${SITE_URL}/signup` },
    ],
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-background">
        {GA_TRACKING_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
            <Suspense fallback={null}>
              <GA4Tracker />
            </Suspense>
          </>
        ) : null}
        {structuredData.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema),
            }}
          />
        ))}
        <Navbar />
        <main className="min-h-[calc(100vh-160px)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
