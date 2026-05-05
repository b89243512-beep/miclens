import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How MicLens handles your data. We process images locally in your browser and store nothing.",
  alternates: { canonical: "https://miclens.com/privacy" },
};

export default function Privacy() {
  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-[var(--muted)] mb-8">Last updated: January 2026</p>

        <h2 className="text-xl font-bold mt-8 mb-3">In short</h2>
        <p className="text-[var(--muted)] mb-4">
          MicLens does not collect, store, or transmit the images you scan. All optical character recognition happens
          on your device, inside your browser tab. Your file never leaves your computer.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">What we don&apos;t do</h2>
        <ul className="text-[var(--muted)] space-y-2 mb-4">
          <li>• We do not upload your images to any server.</li>
          <li>• We do not require an account or email address.</li>
          <li>• We do not sell or share data with third parties for marketing.</li>
          <li>• We do not place any tracking cookies that personally identify you.</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-3">What we do</h2>
        <p className="text-[var(--muted)] mb-4">
          We may collect anonymous, aggregate analytics about how the site is used (page views, country, device class).
          This data is used only to improve the product and contains no personal information.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">Your data, your control</h2>
        <p className="text-[var(--muted)] mb-4">
          Because nothing about your scanned content is stored, there is nothing to delete, export, or correct on our
          side. Closing the tab clears everything related to that scan.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">Third-party services</h2>
        <p className="text-[var(--muted)] mb-4">
          The OCR engine (Tesseract.js) is loaded as a static asset and runs locally. We may use a privacy-respecting
          analytics provider; if so, it is configured to anonymise IP addresses and not use persistent identifiers.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">Contact</h2>
        <p className="text-[var(--muted)]">For questions about this policy, write to hello@miclens.com.</p>
      </main>
      <Footer />
    </>
  );
}
