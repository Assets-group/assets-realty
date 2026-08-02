import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/types";
import type { dictionary } from "@/lib/dictionary";

const socials = [
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M18.9 2H22l-7.6 8.7L23 22h-6.8l-5.3-6.9L4.8 22H1.7l8.2-9.3L1 2h6.9l4.8 6.3L18.9 2zm-1.2 18h1.9L7.3 3.9H5.3L17.7 20z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M6.94 8.5H3.56V21h3.38V8.5zM5.25 3a1.96 1.96 0 100 3.92A1.96 1.96 0 005.25 3zM20.44 21h-3.38v-6.4c0-1.53-.03-3.5-2.13-3.5-2.14 0-2.47 1.67-2.47 3.39V21H9.08V8.5h3.24v1.71h.05c.45-.85 1.56-1.75 3.2-1.75 3.42 0 4.05 2.25 4.05 5.18V21z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M16.6 2h-3.2v13.4a2.9 2.9 0 11-2.9-2.9c.27 0 .53.03.78.09V9.3a5.9 5.9 0 105.02 5.83V8.6a7.5 7.5 0 004.7 1.65V7.05a4.4 4.4 0 01-4.4-4.4V2z" />
      </svg>
    ),
  },
];

export default function Footer({
  dict,
  locale,
}: {
  dict: (typeof dictionary)[Locale];
  locale: Locale;
}) {
  return (
    <footer className="border-t border-line bg-ink text-ivory">
      <div className="max-w-content mx-auto flex flex-col items-center gap-7 px-8 py-16 text-center">
        <Image
          src="/logo.png"
          alt="Assets Real Estate Investments"
          width={150}
          height={37}
          className="opacity-90 brightness-0 invert"
        />
        <div className="h-px w-12 bg-burgundy" />
        <Link
          href={`/${locale}/blog`}
          className="text-xs font-semibold uppercase tracking-[0.14em] text-ivory/70 transition-colors hover:text-burgundy"
        >
          {dict.nav.blog}
        </Link>
        <div className="flex items-center gap-5">
          {socials.map((s) => (
            <a key={s.name} href={s.href} aria-label={s.name} className="text-ivory/60 transition-colors hover:text-burgundy">
              {s.icon}
            </a>
          ))}
        </div>
        <p className="text-xs uppercase tracking-[0.2em] text-ivory/50">
          {dict.footer.rights} © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
