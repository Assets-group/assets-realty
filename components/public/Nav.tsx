"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/types";
import type { dictionary } from "@/lib/dictionary";

export default function Nav({
  locale,
  dict,
}: {
  locale: Locale;
  dict: (typeof dictionary)[Locale];
}) {
  const [open, setOpen] = useState(false);
  const otherLocale = locale === "en" ? "ar" : "en";

  const links = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/residences`, label: dict.nav.residences },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  return (
    <header className="border-b border-line bg-ivory">
      <div className="max-w-content mx-auto grid grid-cols-[auto_1fr_auto] items-center gap-6 px-8 py-6">
        <Link href={`/${locale}`} className="shrink-0">
          <Image src="/logo.png" alt="Assets Real Estate Investments" width={180} height={44} priority />
        </Link>

        <nav className="hidden items-center justify-center gap-9 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-xs font-semibold uppercase tracking-[0.14em] text-ink/70 transition-colors hover:text-ink"
            >
              {link.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-burgundy transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <Link
            href={`/${otherLocale}`}
            className="border-l border-line pl-9 text-xs font-bold uppercase tracking-[0.14em] text-maroon transition-colors hover:text-ink"
          >
            {dict.nav.langToggle}
          </Link>
        </nav>

        <a href="tel:920000398" dir="ltr" className="hidden shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-ink/70 transition-colors hover:text-maroon md:block">
          920 000 398
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="justify-self-end p-1 text-ink md:hidden"
        >
          {open ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <nav className="border-t border-line px-8 py-6 md:hidden">
          <div className="flex flex-col gap-5">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-semibold uppercase tracking-[0.14em] text-ink/80"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={`/${otherLocale}`}
              onClick={() => setOpen(false)}
              className="text-sm font-bold uppercase tracking-[0.14em] text-maroon"
            >
              {dict.nav.langToggle}
            </Link>
            <a href="tel:920000398" dir="ltr" className="text-sm font-semibold uppercase tracking-[0.14em] text-ink/80">
              920 000 398
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
