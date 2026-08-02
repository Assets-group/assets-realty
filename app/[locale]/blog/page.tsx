import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getDictionary } from "@/lib/dictionary";
import type { Locale, BlogPost } from "@/lib/types";
import BlogCard from "@/components/public/BlogCard";
import Reveal from "@/components/public/Reveal";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const dict = getDictionary(params.locale);
  return { title: dict.nav.blog, description: dict.blogSection.title };
}

export default async function BlogPage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);
  const supabase = createClient();

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-content mx-auto px-8 py-16">
      <p className="eyebrow mb-5 text-maroon">{dict.blogSection.eyebrow}</p>
      <h1 className="max-w-xl text-4xl font-light text-ink sm:text-5xl">
        {dict.blogSection.title}
      </h1>

      <div className="mt-16">
        {!posts?.length ? (
          <p className="py-20 text-center text-lg font-light text-ink/50">
            {dict.blogSection.empty}
          </p>
        ) : (
          <Reveal>
            <div className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {(posts as BlogPost[]).map((post) => (
                <BlogCard key={post.id} post={post} locale={params.locale} dict={dict} />
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}
