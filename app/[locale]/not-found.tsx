"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/types";

export default function NotFound() {
  const pathname = usePathname();
  const locale: Locale = pathname?.startsWith("/ar") ? "ar" : "en";
  const dict = getDictionary(locale);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-8 text-center">
      <p className="text-8xl font-light text-maroon">404</p>
      <h1 className="mt-6 text-3xl font-light text-ink">{dict.notFound.title}</h1>
      <p className="mt-3 max-w-md text-ink/60">{dict.notFound.message}</p>
      <Link href={`/${locale}`} className="btn-boutique mt-8">
        {dict.notFound.backHome}
      </Link>
    </div>
  );
}
