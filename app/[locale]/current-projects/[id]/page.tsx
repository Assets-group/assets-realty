import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Locale, CurrentProject } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; id: string };
}): Promise<Metadata> {
  const supabase = createClient();
  const { data: project } = await supabase
    .from("current_projects")
    .select("*")
    .eq("id", params.id)
    .eq("published", true)
    .single();

  if (!project) return {};

  const p = project as CurrentProject;
  const name = params.locale === "en" ? p.name_en : p.name_ar;
  const description = params.locale === "en" ? p.description_en : p.description_ar;

  return {
    title: name,
    description: description || undefined,
    openGraph: {
      title: name,
      description: description || undefined,
      images: p.image_url ? [{ url: p.image_url }] : undefined,
    },
  };
}

export default async function CurrentProjectDetailPage({
  params,
}: {
  params: { locale: Locale; id: string };
}) {
  const supabase = createClient();
  const { data: project } = await supabase
    .from("current_projects")
    .select("*")
    .eq("id", params.id)
    .eq("published", true)
    .single();

  if (!project) notFound();

  const p = project as CurrentProject;
  const name = params.locale === "en" ? p.name_en : p.name_ar;
  const description = params.locale === "en" ? p.description_en : p.description_ar;

  return (
    <article>
      {p.image_url && (
        <div className="max-w-content mx-auto px-8 pt-8">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-ink/5 shadow-lg">
            <Image src={p.image_url} alt={name} fill className="object-cover" priority />
          </div>
        </div>
      )}

      <div className="max-w-content mx-auto px-8 py-16">
        <h1 className="max-w-2xl text-4xl font-light text-ink">{name}</h1>
        {description && (
          <div className="mt-8 max-w-2xl whitespace-pre-line text-lg leading-relaxed text-ink/75">
            {description}
          </div>
        )}
      </div>
    </article>
  );
}
