import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Locale, CurrentProject } from "@/lib/types";
import ListingGallery from "@/components/public/ListingGallery";

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
  const body = params.locale === "en" ? p.body_en : p.body_ar;

  return (
    <article>
      <ListingGallery mainImageUrl={p.image_url} galleryUrls={p.gallery_urls ?? []} alt={name} />

      <div className="max-w-content mx-auto px-8 py-16">
        <h1 className="max-w-2xl text-4xl font-light text-ink">{name}</h1>
        {description && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/75">{description}</p>
        )}
        {body && (
          <div className="mt-8 max-w-2xl whitespace-pre-line text-base leading-relaxed text-ink/70">
            {body}
          </div>
        )}
      </div>
    </article>
  );
}
