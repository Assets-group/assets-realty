import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/types";

export default function AboutPage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);

  return (
    <div>
      <div className="flex min-h-[50vh] items-center bg-maroon px-8 text-white">
        <div className="max-w-content mx-auto">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/70">
            {dict.about.eyebrow}
          </p>
          <h1 className="max-w-2xl text-4xl font-light sm:text-5xl">{dict.about.title}</h1>
        </div>
      </div>

      <div className="max-w-content mx-auto px-8 py-20">
        <p className="max-w-2xl text-lg leading-relaxed text-ink/75">{dict.about.body}</p>
      </div>
    </div>
  );
}
