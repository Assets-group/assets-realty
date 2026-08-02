import Link from "next/link";
import Image from "next/image";
import type { BlogPost, Locale } from "@/lib/types";
import type { dictionary } from "@/lib/dictionary";

export default function BlogCard({
  post,
  locale,
  dict,
}: {
  post: BlogPost;
  locale: Locale;
  dict: (typeof dictionary)[Locale];
}) {
  const title = locale === "en" ? post.title_en : post.title_ar;
  const excerpt = locale === "en" ? post.excerpt_en : post.excerpt_ar;

  return (
    <Link href={`/${locale}/blog/${post.slug}`} className="group block">
      <div className="card-media relative aspect-[4/3] bg-ink/5">
        {post.cover_image_url && (
          <Image
            src={post.cover_image_url}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        )}
      </div>
      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-burgundy">
        {new Date(post.created_at).toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <h3 className="mt-2 text-2xl font-light text-ink">{title}</h3>
      {excerpt && <p className="mt-2 max-w-md text-sm leading-relaxed text-ink/60">{excerpt}</p>}
      <span className="mt-3 inline-block text-xs font-semibold uppercase tracking-[0.14em] text-maroon">
        {dict.blogSection.readMore}
      </span>
    </Link>
  );
}
