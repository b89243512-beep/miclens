import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

export const viewport: Viewport = {
  themeColor: "#EA580C",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://miclens.com"),
  title: {
    default: "Free Microsoft Lens App alt - PDF Scanner & Editor - Mic Lens",
    template: "%s | Mic Lens",
  },
  description:
    "Looking for a Microsoft Lens-like experience? Give Mic Lens a try! Please note that Mic Lens is not affiliated with Microsoft Office. Microsoft Lens is a trademark of Microsoft Office.",
  keywords: [
    "document scanner online", "PDF scanner online", "free document scanner",
    "image to text", "OCR online", "free OCR", "scan to PDF", "image to PDF",
    "extract text from image", "JPG to text", "PNG to text", "photo to text",
    "online document scanner free", "scan document online", "PDF editor online",
    "scan with phone camera", "lens scanner online", "office lens alternative",
    "document scanner web", "scan documents on PC", "browser scanner free",
  ],
  openGraph: {
    title: "Free Microsoft Lens alt — PDF Scanner & Editor",
    description:
      "Looking for a Microsoft Lens-like experience? Mic Lens is a free PDF scanner & editor that runs in your browser. Not affiliated with Microsoft.",
    type: "website",
    url: "https://miclens.com",
    siteName: "Mic Lens",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Microsoft Lens alt — PDF Scanner & Editor",
    description:
      "A free Microsoft Lens-like experience in your browser. PDF scanner & editor, no signup. Mic Lens is not affiliated with Microsoft.",
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
    name: "Mic Lens",
    url: "https://miclens.com",
    logo: "https://miclens.com/logo.svg",
    description: "Free online document scanner and OCR tool that runs entirely in your browser.",
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Mic Lens",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    description: "Free online document scanner with OCR. Convert images to editable text and PDF without uploading files.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    url: "https://miclens.com",
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Mic Lens",
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
      { "@type": "Question", name: "Is Mic Lens free to use?", acceptedAnswer: { "@type": "Answer", text: "Yes. Mic Lens is 100% free with no signup required. All scanning and OCR happens in your browser." } },
      { "@type": "Question", name: "Do my files get uploaded to a server?", acceptedAnswer: { "@type": "Answer", text: "No. All processing happens locally in your browser. Your images never leave your device." } },
      { "@type": "Question", name: "What languages are supported for OCR?", acceptedAnswer: { "@type": "Answer", text: "Mic Lens supports text recognition in 100+ languages including English, Turkish, German, French, Spanish, Portuguese, Russian, Chinese, Japanese, Korean, and Arabic." } },
      { "@type": "Question", name: "What file formats can I export?", acceptedAnswer: { "@type": "Answer", text: "Extracted text can be downloaded as a TXT, copied to clipboard, or saved as a PDF document with selectable text." } },
      { "@type": "Question", name: "What image formats are supported?", acceptedAnswer: { "@type": "Answer", text: "JPG, PNG, WEBP, BMP, GIF, and HEIC images are all supported as input." } },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to scan a document with Mic Lens",
    description: "Three steps to convert a photo or scan into editable text or a searchable PDF, entirely in your browser.",
    totalTime: "PT1M",
    step: [
      { "@type": "HowToStep", position: 1, name: "Drop your image", text: "Upload a photo, paste a screenshot, or open the page on your phone and tap Use camera. JPG, PNG, WEBP, BMP, GIF and HEIC all work." },
      { "@type": "HowToStep", position: 2, name: "Choose a language", text: "Pick the language of the text in your image. The OCR model loads once on first use, then is cached locally for every future scan." },
      { "@type": "HowToStep", position: 3, name: "Copy or download", text: "Edit the recognised text in place, copy it to your clipboard, save a TXT file, or export a clean searchable PDF." },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
        {children}
      </body>
      <GoogleAnalytics gaId="G-EGT0HQJEZW" />
    </html>
  );
}
