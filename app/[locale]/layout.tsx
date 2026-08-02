import type { Metadata } from "next";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/dictionary";
import Nav from "@/components/public/Nav";
import Footer from "@/components/public/Footer";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const dict = getDictionary(params.locale);
  return {
    title: dict.hero.title,
    description: dict.hero.subtitle,
    alternates: {
      canonical: `/${params.locale}`,
      languages: { en: "/en", ar: "/ar" },
    },
    openGraph: {
      locale: params.locale === "ar" ? "ar_SA" : "en_US",
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const dict = getDictionary(params.locale);
  const dir = params.locale === "ar" ? "rtl" : "ltr";

  return (
    <div dir={dir} lang={params.locale} className={dir === "rtl" ? "font-sans" : "font-sans"}>
      <Nav locale={params.locale} dict={dict} />
      <main>{children}</main>
      <Footer dict={dict} locale={params.locale} />
    </div>
  );
}
