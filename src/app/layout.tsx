import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://miclens.com"),
  title: {
    default: "Free MicLens App - PDF Scanner & Editor - Microsoft Office Lens Alternative",
    template: "%s | MicLens",
  },
  description:
    "MicLens is a free online PDF scanner, OCR tool and document editor that runs in your browser on PC, Mac, iPhone, iPad and Android. Convert images to text, scan documents to searchable PDF, edit and crop pages, and export results in seconds — no upload, no signup, a privacy-first alternative for users looking for a Microsoft Lens-style experience on the web.",
  keywords: [
    "document scanner online", "PDF scanner online", "free document scanner",
    "image to text", "OCR online", "free OCR", "scan to PDF", "image to PDF",
    "extract text from image", "JPG to text", "PNG to text", "photo to text",
    "online document scanner free", "scan document online", "PDF editor online",
    "scan with phone camera", "lens scanner online", "office lens alternative",
    "document scanner web", "scan documents on PC", "browser scanner free",
  ],
  openGraph: {
    title: "MicLens — Free Online Document Scanner with OCR",
    description: "Extract text from any image. Scan documents to PDF. 100% free, no upload.",
    type: "website",
    url: "https://miclens.com",
    siteName: "MicLens",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "MicLens — Free Online Document Scanner",
    description: "Extract text from images. Scan to PDF. Free, browser-only OCR.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://miclens.com" },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/apple-icon.svg",
  },
  verification: { google: "yk4TWpD5NiDFMwcm5KHJyuAbyBB7Adw_pr0t8rx-y8I" },
  category: "productivity",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MicLens",
    url: "https://miclens.com",
    logo: "https://miclens.com/logo.svg",
    description: "Free online document scanner and OCR tool that runs entirely in your browser.",
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "MicLens",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    description: "Free online document scanner with OCR. Convert images to editable text and PDF without uploading files.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.7",
      ratingCount: "820",
      bestRating: "5",
      worstRating: "1",
    },
    url: "https://miclens.com",
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MicLens",
    url: "https://miclens.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://miclens.com/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Is MicLens free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes. MicLens is 100% free with no signup required. All scanning and OCR happens in your browser." } },
      { "@type": "Question", name: "Do my files get uploaded to a server?", acceptedAnswer: { "@type": "Answer", text: "No. All processing happens locally in your browser. Your images never leave your device." } },
      { "@type": "Question", name: "What languages are supported for OCR?", acceptedAnswer: { "@type": "Answer", text: "MicLens supports text recognition in 100+ languages including English, Turkish, German, French, Spanish, Portuguese, Russian, Chinese, Japanese, Korean, and Arabic." } },
      { "@type": "Question", name: "What file formats can I export?", acceptedAnswer: { "@type": "Answer", text: "Extracted text can be downloaded as a TXT, copied to clipboard, or saved as a PDF document with selectable text." } },
      { "@type": "Question", name: "What image formats are supported?", acceptedAnswer: { "@type": "Answer", text: "JPG, PNG, WEBP, BMP, GIF, and HEIC images are all supported as input." } },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        {children}
      </body>
      <GoogleAnalytics gaId="G-EGT0HQJEZW" />
    </html>
  );
}
