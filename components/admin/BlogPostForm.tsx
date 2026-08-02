import type { BlogPost } from "@/lib/types";
import { saveBlogPost } from "@/lib/actions/blogPosts";
import ImageUploader from "./ImageUploader";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-ink/70">{label}</label>
      {children}
    </div>
  );
}

const inputClass = "w-full border border-line px-4 py-3 focus:border-maroon focus:outline-none";

export default function BlogPostForm({ post }: { post?: BlogPost }) {
  return (
    <form action={saveBlogPost} className="max-w-2xl space-y-8">
      {post && <input type="hidden" name="id" value={post.id} />}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Title (English)">
          <input required name="title_en" defaultValue={post?.title_en} className={inputClass} />
        </Field>
        <Field label="Title (Arabic)">
          <input
            required
            name="title_ar"
            dir="rtl"
            defaultValue={post?.title_ar}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="URL slug (leave blank to auto-generate from English title)">
        <input name="slug" defaultValue={post?.slug} className={inputClass} placeholder="e.g. jeddah-real-estate-outlook-2026" />
      </Field>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Excerpt (English) — short summary for cards">
          <textarea
            name="excerpt_en"
            rows={3}
            defaultValue={post?.excerpt_en}
            className={inputClass}
          />
        </Field>
        <Field label="Excerpt (Arabic)">
          <textarea
            name="excerpt_ar"
            dir="rtl"
            rows={3}
            defaultValue={post?.excerpt_ar}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Body (English) — full article text">
        <textarea name="body_en" rows={12} defaultValue={post?.body_en} className={inputClass} />
      </Field>
      <Field label="Body (Arabic)">
        <textarea
          name="body_ar"
          dir="rtl"
          rows={12}
          defaultValue={post?.body_ar}
          className={inputClass}
        />
      </Field>

      <ImageUploader
        bucket="project-photos"
        name="cover_image_url"
        label="Cover Image"
        defaultValue={post?.cover_image_url ?? undefined}
      />

      <label className="flex items-center gap-2 text-sm font-medium text-ink/70">
        <input type="checkbox" name="published" defaultChecked={post?.published ?? true} />
        Published (visible on the live site)
      </label>

      <button
        type="submit"
        className="bg-ink px-8 py-3 text-sm font-bold uppercase tracking-wider text-white hover:bg-maroon"
      >
        Save Post
      </button>
    </form>
  );
}
