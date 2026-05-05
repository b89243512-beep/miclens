import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for Mic Lens, the free browser-based document scanner with OCR.",
  alternates: { canonical: "https://miclens.com/terms" },
};

export default function Terms() {
  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2">Terms of Use</h1>
        <p className="text-sm text-[var(--muted)] mb-8">Last updated: January 2026</p>

        <h2 className="text-xl font-bold mt-8 mb-3">Acceptance</h2>
        <p className="text-[var(--muted)] mb-4">
          By using Mic Lens you agree to these terms. If you do not agree, please do not use the service.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">The service</h2>
        <p className="text-[var(--muted)] mb-4">
          Mic Lens is a browser-based document scanner and OCR tool offered free of charge. The service is provided as is,
          without warranty of any kind. We do our best to keep it accurate and reliable, but we cannot guarantee perfect
          results for every input.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">Acceptable use</h2>
        <ul className="text-[var(--muted)] space-y-2 mb-4">
          <li>• You agree not to use Mic Lens for unlawful purposes or to violate the rights of others.</li>
          <li>• You are responsible for the content you scan and for ensuring you have the right to do so.</li>
          <li>• You may not attempt to disrupt or reverse-engineer the service in a way that harms other users.</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-3">No affiliation</h2>
        <p className="text-[var(--muted)] mb-4">
          Mic Lens is an independent product. We are not affiliated with, endorsed by, or sponsored by Microsoft or any
          other third party whose name may appear in our help content for descriptive purposes.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">Intellectual property</h2>
        <p className="text-[var(--muted)] mb-4">
          The Mic Lens name, logo, and site design belong to us. The OCR engine is open source and used under its own
          license. Text you scan belongs to you.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">Liability</h2>
        <p className="text-[var(--muted)] mb-4">
          To the extent permitted by law, Mic Lens is not liable for any indirect or consequential damages arising from
          use of the service. Our total liability is limited to the amount you have paid us, which for a free service is
          zero.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">Changes</h2>
        <p className="text-[var(--muted)] mb-4">
          We may update these terms occasionally. The current version is always available on this page.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-3">Contact</h2>
        <p className="text-[var(--muted)]">For any question about these terms, write to hello@miclens.com.</p>
      </main>
      <Footer />
    </>
  );
}
