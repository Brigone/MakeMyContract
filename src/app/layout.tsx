import type { Metadata } from "next";
import { headers } from "next/headers";
import { Suspense } from "react";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GA_TRACKING_ID } from "@/lib/analytics";
import { GA4Tracker } from "@/components/analytics/ga-tracker";
import { SmartCtaBar } from "@/components/layout/smart-cta-bar";

const SITE_URL = "https://makemycontract.com";
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "120",
    },
    review: [
      {
        "@type": "Review",
        name: "Great for fast contract drafting",
        reviewBody:
          "Make My Contract let our startup generate investor-ready documents in minutes without hiring a law firm.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        author: {
          "@type": "Person",
          name: "Marina Costa",
        },
        datePublished: "2024-05-10",
      },
      {
        "@type": "Review",
        name: "Reliable templates and PDF exports",
        reviewBody:
          "The guided intake keeps contracts consistent and the PDFs are ready for signature immediately.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "4.8",
          bestRating: "5",
        },
        author: {
          "@type": "Person",
          name: "Evan Brooks",
        },
        datePublished: "2024-04-22",
      },
    ],
    offers: [
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
  const currentPath = headers().get("x-current-pathname") ?? "/";

  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-background overflow-x-hidden antialiased">
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
                gtag('config', 'AW-17730578494');
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
        <main className="min-h-[calc(100vh-160px)] w-full overflow-x-hidden pb-32 sm:pb-36">{children}</main>
        <Footer />
        {currentPath === "/" ? <SmartCtaBar /> : null}
        {CLARITY_ID ? (
          <Script
            id="microsoft-clarity"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${CLARITY_ID}");
              `,
            }}
          />
        ) : null}
      </body>
    </html>
  );
}
