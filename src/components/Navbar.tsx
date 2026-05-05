import Link from "next/link";
import { Logo } from "./Logo";

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 bg-white/85 backdrop-blur border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-base md:text-lg">
          <Logo size={32} />
          <span>Lens - PDF Scanner &amp; Editor</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-[var(--muted)]">
          <Link href="/#scanner" className="hover:text-[var(--fg)]">Scanner</Link>
          <Link href="/#pdf-editor" className="hover:text-[var(--fg)]">PDF Editor</Link>
          <Link href="/#how-it-works" className="hover:text-[var(--fg)]">How it works</Link>
          <Link href="/#use-cases" className="hover:text-[var(--fg)]">Use cases</Link>
          <Link href="/#faq" className="hover:text-[var(--fg)]">FAQ</Link>
        </nav>
      </div>
    </header>
  );
}
