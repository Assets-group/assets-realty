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

      {/* Intro + stats */}
      <Reveal>
        <div className="max-w-content mx-auto px-8 py-24">
          <p className="max-w-2xl text-lg leading-relaxed text-ink/75">{dict.about.body}</p>
          <div className="mt-14 grid grid-cols-1 gap-10 border-t border-line pt-10 sm:grid-cols-2">
            {dict.about.stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-5xl font-light leading-none text-maroon">{stat.value}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink/50">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Journey timeline */}
      <Reveal>
        <div className="border-t border-line bg-stone/40 px-8 py-24">
          <div className="max-w-content mx-auto">
            <h2 className="text-3xl font-light text-ink sm:text-4xl">
              {dict.about.journey.title}
            </h2>
            <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {dict.about.journey.milestones.map((m) => (
                <div key={m.year} className="border-t-2 border-maroon pt-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-maroon">
                    {m.year}
                  </p>
                  <h3 className="mt-2 text-xl font-medium text-ink">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">{m.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Principles */}
      <Reveal>
        <div className="max-w-content mx-auto px-8 py-24">
          <h2 className="text-3xl font-light text-ink sm:text-4xl">
            {dict.about.principles.title}
          </h2>
          <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {dict.about.principles.items.map((item) => (
              <div key={item.title} className="rounded-lg border border-line p-8 shadow-sm transition-shadow hover:shadow-md">
                <h3 className="text-xl font-medium text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Services */}
      <Reveal>
        <div className="border-t border-line bg-ink px-8 py-24 text-white">
          <div className="max-w-content mx-auto">
            <h2 className="text-3xl font-light sm:text-4xl">{dict.about.services.title}</h2>
            <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
              {dict.about.services.items.map((service) => (
                <div key={service} className="flex items-center gap-4 border-b border-white/15 pb-5">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-burgundy" />
                  <p className="text-white/85">{service}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
