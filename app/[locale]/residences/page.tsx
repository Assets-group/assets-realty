import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getDictionary } from "@/lib/dictionary";
import type { Locale, Listing } from "@/lib/types";
import ResidencesGrid from "@/components/public/ResidencesGrid";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const dict = getDictionary(params.locale);
  return { title: dict.nav.residences, description: dict.residences.subtitle };
}

export default async function ResidencesPage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);
  const supabase = createClient();

  const { data: listings } = await supabase
    .from("listings")
    .select("*")
    .eq("published", true)
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  return (
    <div>
      <section className="relative flex min-h-[40vh] items-center overflow-hidden bg-ink px-8 text-white">
        <div
          className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/50 to-burgundy/60"
          aria-hidden
        />
        <div className="max-w-content relative z-10 mx-auto">
          <p className="eyebrow text-white/70">{dict.hero.eyebrow}</p>
          <h1 className="mt-5 max-w-xl text-4xl font-light sm:text-5xl">
            {dict.residences.title}
          </h1>
          <p className="mt-4 max-w-lg text-white/75">{dict.residences.subtitle}</p>
        </div>
      </section>
      <ResidencesGrid listings={(listings as Listing[]) ?? []} locale={params.locale} dict={dict} />
    </div>
  );
}
