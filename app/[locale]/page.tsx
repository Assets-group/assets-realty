import { createClient } from "@/lib/supabase/server";
import { getDictionary } from "@/lib/dictionary";
import type { CurrentProject, Locale } from "@/lib/types";
import CurrentProjectsSlideshow from "@/components/public/CurrentProjectsSlideshow";

export default async function HomePage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);
  const supabase = createClient();

  const { data: currentProjects } = await supabase
    .from("current_projects")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden bg-ink px-6 text-center">
        <div
          className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/40 to-maroon/60"
          aria-hidden
        />
        <div className="relative z-10 max-w-2xl">
          <p className="eyebrow mx-auto w-fit text-ivory/70">{dict.hero.eyebrow}</p>
          <h1 className="mt-6 text-6xl font-light text-ivory sm:text-7xl">{dict.hero.title}</h1>
          <p className="mx-auto mt-7 max-w-lg text-lg font-light text-ivory/85">
            {dict.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Trust / Building Value */}
      <section className="max-w-content mx-auto px-8 py-28">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-[1fr_1px_1.1fr]">
          <h2 className="max-w-md text-3xl font-light leading-snug text-ink sm:text-4xl">
            {dict.trustSection.title}
          </h2>
          <div className="hidden bg-burgundy/40 md:block" aria-hidden />
          <div className="space-y-6 text-base leading-relaxed text-ink/70">
            <p>{dict.trustSection.paragraph1}</p>
            <p>{dict.trustSection.paragraph2}</p>
            <p>{dict.trustSection.paragraph3}</p>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="border-y border-line bg-stone/40 px-8 py-14">
        <div className="max-w-content mx-auto">
          <p className="eyebrow mx-auto mb-8 w-fit text-maroon">{dict.trustedBy.eyebrow}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-center">
            {[
              "Four Seasons Jeddah",
              "KAUST",
              "Saudi Aramco",
              "Lamar Towers",
              "Al Mada Towers",
              "Golden Tower",
              "Thakher Development",
            ].map((client) => (
              <span
                key={client}
                className="text-sm font-medium uppercase tracking-[0.1em] text-ink/50"
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Business Profile */}
      <section className="bg-stone/50 px-8 py-28 text-center">
        <div className="max-w-content mx-auto">
          <p className="eyebrow mx-auto w-fit text-maroon">{dict.nav.businessProfile}</p>
          <a href="/assets-business-profile.pdf" target="_blank" rel="noopener noreferrer" className="btn-boutique mt-8 inline-flex">
            {dict.nav.businessProfile}
          </a>
        </div>
      </section>

      {/* Current Projects */}
      {currentProjects && currentProjects.length > 0 && (
        <section className="max-w-content mx-auto px-8 py-32">
          <p className="eyebrow mx-auto w-fit text-maroon">{dict.currentProjects.eyebrow}</p>
          <div className="mt-10">
            <CurrentProjectsSlideshow
              projects={currentProjects as CurrentProject[]}
              locale={params.locale}
            />
          </div>
        </section>
      )}
    </>
  );
}
