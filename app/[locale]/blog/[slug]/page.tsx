import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Locale, BlogPost } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}): Promise<Metadata> {
  const supabase = createClient();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", params.slug)
    .eq("published", true)
    .single();

  if (!post) return {};

  const p = post as BlogPost;
  const title = params.locale === "en" ? p.title_en : p.title_ar;
  const excerpt = params.locale === "en" ? p.excerpt_en : p.excerpt_ar;

  return {
    title,
    description: excerpt || undefined,
    openGraph: {
      title,
      description: excerpt || undefined,
      images: p.cover_image_url ? [{ url: p.cover_image_url }] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const supabase = createClient();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", params.slug)
    .eq("published", true)
    .single();

  if (!post) notFound();

  const p = post as BlogPost;
  const title = params.locale === "en" ? p.title_en : p.title_ar;
  const body = params.locale === "en" ? p.body_en : p.body_ar;

  return (
    <article>
      {p.cover_image_url && (
        <div className="max-w-content mx-auto px-8 pt-8">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-ink/5 shadow-lg">
            <Image src={p.cover_image_url} alt={title} fill className="object-cover" priority />
          </div>
        </div>
      )}

      <div className="max-w-content mx-auto px-8 py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-burgundy">
          {new Date(p.created_at).toLocaleDateString(params.locale === "ar" ? "ar-SA" : "en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h1 className="mt-3 max-w-2xl text-4xl font-light text-ink">{title}</h1>
        {body && (
          <div className="mt-10 max-w-2xl whitespace-pre-line text-lg leading-relaxed text-ink/75">
            {body}
          </div>
        )}
      </div>
    </article>
  );
}
