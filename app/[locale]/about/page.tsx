import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/types";

export default function AboutPage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);

  return (
    <div className="flex min-h-[70vh] items-center bg-maroon px-8 text-white">
      <div className="max-w-content mx-auto">
        <h1 className="max-w-xl text-4xl font-light sm:text-5xl">{dict.nav.about}</h1>
        <p className="mt-6 max-w-xl text-white/85">{dict.hero.subtitle}</p>
      </div>
    </div>
  );
}
