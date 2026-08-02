import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/types";
import Reveal from "@/components/public/Reveal";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const dict = getDictionary(params.locale);
  return { title: dict.nav.about, description: dict.about.body };
}

export default function AboutPage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);

  return (
    <div>
      <section className="relative flex min-h-[55vh] items-center overflow-hidden bg-ink px-8 text-white">
        <div
          className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/50 to-burgundy/60"
          aria-hidden
        />
        <div className="max-w-content relative z-10 mx-auto">
          <p className="eyebrow text-white/70">{dict.about.eyebrow}</p>
          <h1 className="mt-5 max-w-2xl text-4xl font-light sm:text-5xl">{dict.about.title}</h1>
        </div>
      </section>

      <Reveal>
        <div className="max-w-content mx-auto grid grid-cols-1 gap-14 px-8 py-24 md:grid-cols-[auto_1fr]">
          <div className="flex items-start gap-4">
            <span className="text-6xl font-light leading-none text-maroon">20+</span>
            <span className="mt-1 max-w-[8rem] text-xs font-semibold uppercase leading-snug tracking-[0.14em] text-ink/50">
              Years of Experience
            </span>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-ink/75">{dict.about.body}</p>
        </div>
      </Reveal>
    </div>
  );
}
