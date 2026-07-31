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
  const otherLocale = locale === "en" ? "ar" : "en";

  const links = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/residences`, label: dict.nav.residences },
    { href: `/${locale}/past-projects`, label: dict.nav.pastProjects },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  return (
    <header className="border-b border-line bg-ivory">
      <div className="max-w-content mx-auto flex items-center justify-between px-8 py-6">
        <Link href={`/${locale}`} className="shrink-0">
          <Image src="/logo.png" alt="Assets Real Estate Investments" width={180} height={44} priority />
        </Link>
        <nav className="hidden md:flex items-center gap-9">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-xs font-semibold uppercase tracking-[0.14em] text-ink/70 transition-colors hover:text-ink"
            >
              {link.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <Link
            href={`/${otherLocale}`}
            className="border-l border-line pl-9 text-xs font-bold uppercase tracking-[0.14em] text-maroon transition-colors hover:text-ink"
          >
            {dict.nav.langToggle}
          </Link>
        </nav>
      </div>
    </header>
  );
}
