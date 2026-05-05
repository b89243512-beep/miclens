import Link from "next/link";
import { ScanLine } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 bg-white/85 backdrop-blur border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="w-8 h-8 rounded-lg bg-[var(--primary)] text-white flex items-center justify-center">
            <ScanLine className="w-5 h-5" />
          </span>
          <span>MicLens</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-[var(--muted)]">
          <Link href="/#scanner" className="hover:text-[var(--fg)]">Scanner</Link>
          <Link href="/#how-it-works" className="hover:text-[var(--fg)]">How it works</Link>
          <Link href="/#use-cases" className="hover:text-[var(--fg)]">Use cases</Link>
          <Link href="/#faq" className="hover:text-[var(--fg)]">FAQ</Link>
        </nav>
      </div>
    </header>
  );
}
