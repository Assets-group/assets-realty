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
      <div className="max-w-content mx-auto px-8 pb-8 pt-16">
        <p className="eyebrow mb-5 text-maroon">{dict.hero.eyebrow}</p>
        <h1 className="max-w-xl text-4xl font-light text-ink sm:text-5xl">
          {dict.residences.title}
        </h1>
        <p className="mt-4 max-w-lg text-ink/65">{dict.residences.subtitle}</p>
      </div>
      <ResidencesGrid listings={(listings as Listing[]) ?? []} locale={params.locale} dict={dict} />
    </div>
  );
}
