/**
 * JSON-LD Structured Data Components for SonoPrep
 *
 * Reusable components that inject schema.org structured data
 * into pages via <script type="application/ld+json">.
 */

/* ─────────────────────────────────────────────────────────────────── */
/* Organization Schema                                                  */
/* ─────────────────────────────────────────────────────────────────── */

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SonoPrep",
    url: "https://sonoprep.com",
    logo: "https://sonoprep.com/favicon.svg",
    description:
      "Premium SPI exam preparation platform built by practicing sonographers. Flashcards, exam simulator, physics pearls, and study notes for ARDMS certification.",
    email: "support@sonoprep.com",
    sameAs: [],
    foundingDate: "2024",
    contactPoint: {
      "@type": "ContactPoint",
      email: "support@sonoprep.com",
      contactType: "customer support",
      availableLanguage: "English",
      areaServed: "US",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/* WebSite Schema (with SearchAction for site links search box)        */
/* ─────────────────────────────────────────────────────────────────── */

export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SonoPrep",
    url: "https://sonoprep.com",
    description:
      "Master sonographic physics and pass your ARDMS SPI exam with clinically focused study materials.",
    publisher: {
      "@type": "Organization",
      name: "SonoPrep",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://sonoprep.com/?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/* Product Schema                                                       */
/* ─────────────────────────────────────────────────────────────────── */

interface ProductJsonLdProps {
  name: string;
  description: string;
  price: number; // in cents
  sku: string;
  url?: string;
  image?: string;
  ratingValue?: number;
  reviewCount?: number;
}

export function ProductJsonLd({
  name,
  description,
  price,
  sku,
  url,
  image,
  ratingValue = 4.9,
  reviewCount = 127,
}: ProductJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    sku,
    url: url ?? "https://sonoprep.com/products",
    image: image ?? "https://sonoprep.com/og-image.png",
    brand: {
      "@type": "Organization",
      name: "SonoPrep",
    },
    offers: {
      "@type": "Offer",
      url: url ?? "https://sonoprep.com/products",
      priceCurrency: "USD",
      price: (price / 100).toFixed(2),
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "SonoPrep",
      },
      priceValidUntil: new Date(
        new Date().getFullYear() + 1,
        0,
        1
      ).toISOString().split("T")[0],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: ratingValue.toString(),
      reviewCount: reviewCount.toString(),
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/* All Products Schema (for the products page)                         */
/* ─────────────────────────────────────────────────────────────────── */

export function AllProductsJsonLd() {
  const products = [
    {
      name: "SPI Flashcards",
      description:
        "200 clinically focused flashcards with SM-2 spaced repetition for ARDMS SPI exam preparation.",
      price: 2900,
      sku: "SPI_FLASHCARDS",
    },
    {
      name: "Physics Pearls",
      description:
        "50 high-yield physics pearls with concise explanations of critical SPI concepts and clinical applications.",
      price: 900,
      sku: "PHYSICS_PEARLS",
    },
    {
      name: "Exam Simulator",
      description:
        "110 ARDMS-weighted practice questions with detailed explanations, timed sessions, and score analytics.",
      price: 4900,
      sku: "EXAM_SIMULATOR",
    },
    {
      name: "Study Notes",
      description:
        "159-page comprehensive guide covering every ARDMS SPI domain with reading progress tracking.",
      price: 3900,
      sku: "STUDY_NOTES",
    },
    {
      name: "Premium Bundle",
      description:
        "Complete SPI exam preparation toolkit — all four products at $27 off. Flashcards, Pearls, Simulator, and Study Notes.",
      price: 9900,
      sku: "PREMIUM_BUNDLE",
    },
  ];

  return (
    <>
      {products.map((p) => (
        <ProductJsonLd key={p.sku} {...p} />
      ))}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/* Course Schema (educational product)                                  */
/* ─────────────────────────────────────────────────────────────────── */

export function CourseJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "SonoPrep SPI Exam Preparation",
    description:
      "Comprehensive ARDMS SPI exam preparation course featuring 200+ flashcards, 110 practice questions, 50 physics pearls, and 159-page study notes. Built by practicing sonographers using spaced-repetition science.",
    provider: {
      "@type": "Organization",
      name: "SonoPrep",
      url: "https://sonoprep.com",
    },
    url: "https://sonoprep.com/products",
    courseCode: "SONOPREP-SPI",
    educationalLevel: "Professional Certification",
    about: [
      "Sonographic Physics",
      "Ultrasound Instrumentation",
      "ARDMS SPI Exam",
      "Doppler Physics",
      "Acoustic Properties",
      "Transducer Technology",
    ],
    teaches: [
      "Sonographic physics principles",
      "Ultrasound instrumentation concepts",
      "Doppler effect applications in sonography",
      "Acoustic properties of biological tissue",
      "Image artifacts recognition and correction",
      "Patient safety and bioeffects",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "9",
      highPrice: "99",
      priceCurrency: "USD",
      offerCount: "5",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/* FAQ Schema                                                           */
/* ─────────────────────────────────────────────────────────────────── */

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqJsonLd({ items }: { items: FaqItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/* Review / Testimonial Schema                                          */
/* ─────────────────────────────────────────────────────────────────── */

interface ReviewData {
  authorName: string;
  reviewBody: string;
  ratingValue: number;
}

export function ReviewsJsonLd({ reviews }: { reviews: ReviewData[] }) {
  const data = reviews.map((review) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Product",
      name: "SonoPrep SPI Exam Preparation",
      url: "https://sonoprep.com",
    },
    author: {
      "@type": "Person",
      name: review.authorName,
    },
    reviewBody: review.reviewBody,
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.ratingValue.toString(),
      bestRating: "5",
      worstRating: "1",
    },
    publisher: {
      "@type": "Organization",
      name: "SonoPrep",
    },
  }));

  return (
    <>
      {data.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
        />
      ))}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/* BreadcrumbList Schema                                                */
/* ─────────────────────────────────────────────────────────────────── */

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
