import type { Metadata } from "next";
import { Suspense } from "react";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GA_TRACKING_ID } from "@/lib/analytics";
import { GA4Tracker } from "@/components/analytics/ga-tracker";

const SITE_URL = "https://makemyrental.com";
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | Make My Rental",
    default: "Make My Rental – Create Rental Agreements Online",
  },
  description:
    "Landlord forms, leases, notices and addendums. Fully editable rental documents in minutes.",
  keywords: [
    "rental agreement generator",
    "landlord forms online",
    "rental templates",
    "lease builder",
    "rental notice generator",
    "Make My Rental",
    "Make My Rental",
    "property management paperwork",
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
    title: "Make My Rental – Create rental agreements online",
    description: "Landlord forms, leases, notices, and addendums available for download in minutes.",
    url: SITE_URL,
    siteName: "Make My Rental",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Make My Rental dashboard preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Make My Rental",
    description: "Create professional rental agreements, notices, and addendums in under a minute.",
    site: "@makemyrental",
    creator: "@makemyrental",
    images: [`${SITE_URL}/og-image.png`],
  },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Make My Rental",
    url: SITE_URL,
    description:
      "SaaS platform for generating landlord and tenant documents in minutes.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Make My Rental Subscription",
    description:
      "Online rental form builder offering unlimited landlord templates, PDF exports, and tenant intake.",
    brand: {
      "@type": "Brand",
      name: "Make My Rental",
    },
    offers: {
      "@type": "OfferCatalog",
      name: "Make My Rental Pricing",
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
    name: "Make My Rental Landlord Paperwork Automation",
    url: SITE_URL,
    areaServed: "US",
    serviceType: [
      "Rental agreement drafting",
      "Tenant notice automation",
      "PDF lease generation",
    ],
    provider: {
      "@type": "Organization",
      name: "Make My Rental",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Make My Rental Pricing Catalog",
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
      { "@type": "WebPage", name: "Rental Forms", url: `${SITE_URL}/contracts` },
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
