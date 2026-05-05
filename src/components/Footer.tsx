import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-2)] mt-20">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-bold text-base md:text-lg mb-2">
            <Logo size={28} />
            <span>Lens - PDF Scanner &amp; Editor</span>
          </div>
          <p className="text-sm text-[var(--muted)] max-w-xs">
            Free online document scanner with OCR. Runs entirely in your browser — no upload, no signup.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-3">Sections</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/#scanner" className="hover:text-[var(--primary)]">Scanner</Link></li>
            <li><Link href="/#how-it-works" className="hover:text-[var(--primary)]">How it works</Link></li>
            <li><Link href="/#use-cases" className="hover:text-[var(--primary)]">Use cases</Link></li>
            <li><Link href="/#faq" className="hover:text-[var(--primary)]">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-[var(--primary)]">Home</Link></li>
            <li><Link href="/privacy" className="hover:text-[var(--primary)]">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-[var(--primary)]">Terms</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-3">About</h4>
          <p className="text-sm text-[var(--muted)]">
            Mic Lens is an independent document scanning tool. We are not affiliated with Microsoft.
          </p>
        </div>
      </div>
      <div className="border-t border-[var(--border)]">
        <p className="max-w-6xl mx-auto px-4 py-5 text-xs text-[var(--muted)] text-center">
          &copy; {new Date().getFullYear()} Mic Lens. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
