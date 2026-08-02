import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

const BASE_URL = "https://assets-group.com";
const LOCALES = ["en", "ar"] as const;
const STATIC_PATHS = ["", "/about", "/residences", "/blog", "/contact"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient();

  const { data: listings } = await supabase
    .from("listings")
    .select("slug, updated_at")
    .eq("published", true);

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("slug, updated_at")
    .eq("published", true);

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.7,
      });
    }
    for (const listing of listings ?? []) {
      entries.push({
        url: `${BASE_URL}/${locale}/residences/${listing.slug}`,
        lastModified: listing.updated_at,
        changeFrequency: "weekly",
        priority: 0.9,
      });
    }
    for (const post of posts ?? []) {
      entries.push({
        url: `${BASE_URL}/${locale}/blog/${post.slug}`,
        lastModified: post.updated_at,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
