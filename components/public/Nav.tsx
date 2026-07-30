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
    <header className="border-b border-line">
      <div className="max-w-content mx-auto flex items-center justify-between px-8 py-6">
        <Link href={`/${locale}`} className="shrink-0">
          <Image src="/logo.svg" alt="Assets" width={140} height={34} priority />
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/80 hover:text-maroon transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={`/${otherLocale}`}
            className="text-sm font-bold text-ink hover:text-maroon transition-colors"
          >
            {dict.nav.langToggle}
          </Link>
        </nav>
      </div>
    </header>
  );
}
