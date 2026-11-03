"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

const links = [
  { href: "/#gallery", label: "Hairstyles" },
  { href: "/#services", label: "Services" },
  { href: "/careers", label: "Careers" },
  { href: "/#visit", label: "Visit" },
];

export default function Header() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors ${
        scrolled || menu ? "border-line bg-ink/95 backdrop-blur" : "border-transparent bg-gradient-to-b from-ink/80 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-wrap items-center gap-4 px-6 sm:px-8">
        <Link href="/" onClick={() => setMenu(false)} className="shrink-0 font-display text-lg text-cream">
          White <span className="italic text-gold">Craft</span>
        </Link>

        <div className="hidden min-w-0 flex-1 md:block md:max-w-md md:flex-none md:grow lg:mx-6">
          <SearchBar />
        </div>

        <nav aria-label="Main" className="ml-auto hidden items-center gap-6 text-[0.92rem] text-cream-dim md:flex">
          {links.map((l) => (
            <Link key={l.label} href={l.href} className="transition-colors hover:text-gold">
              {l.label}
            </Link>
          ))}
          <Link
            href="/careers#apply"
            className="border border-gold px-4 py-2 text-ink transition-colors hover:border-[#dcb75d] hover:bg-[#dcb75d] bg-gold"
          >
            We&rsquo;re hiring
          </Link>
        </nav>

        <button
          type="button"
          aria-label={menu ? "Close menu" : "Open menu"}
          aria-expanded={menu}
          onClick={() => setMenu((m) => !m)}
          className="ml-auto flex h-11 w-11 items-center justify-center text-cream md:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            {menu ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      <div className="px-6 pb-3 md:hidden">
        <SearchBar onNavigate={() => setMenu(false)} />
      </div>

      {menu && (
        <div className="fixed inset-x-0 bottom-0 top-[7rem] overflow-auto bg-ink px-6 pb-10 pt-2 md:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setMenu(false)}
                className="border-b border-line py-4 font-display text-xl text-cream"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/careers#apply"
            onClick={() => setMenu(false)}
            className="mt-8 block bg-gold px-7 py-4 text-center text-ink"
          >
            We&rsquo;re hiring — apply now
          </Link>
        </div>
      )}
    </header>
  );
}
