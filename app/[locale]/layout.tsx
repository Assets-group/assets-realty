import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/dictionary";
import Nav from "@/components/public/Nav";
import Footer from "@/components/public/Footer";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
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
      <Footer dict={dict} />
    </div>
  );
}
