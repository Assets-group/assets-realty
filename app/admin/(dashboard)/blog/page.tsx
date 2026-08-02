import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { BlogPost } from "@/lib/types";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteBlogPost } from "@/lib/actions/blogPosts";

export default async function AdminBlogPage() {
  const supabase = createClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-light text-ink">Blog</h1>
        <Link
          href="/admin/blog/new"
          className="bg-ink px-6 py-3 text-sm font-bold uppercase tracking-wider text-white hover:bg-maroon"
        >
          + Add Post
        </Link>
      </div>

      <div className="mt-8 overflow-hidden border border-line bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line bg-cream/60 text-xs uppercase tracking-wider text-ink/50">
            <tr>
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Published</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {(posts as BlogPost[] | null)?.map((post) => (
              <tr key={post.id} className="border-b border-line last:border-0">
                <td className="px-5 py-4 font-medium text-ink">{post.title_en}</td>
                <td className="px-5 py-4 text-ink/60">
                  {new Date(post.created_at).toLocaleDateString()}
                </td>
                <td className="px-5 py-4">
                  {post.published ? (
                    <span className="text-green-700">Yes</span>
                  ) : (
                    <span className="text-ink/40">Draft</span>
                  )}
                </td>
                <td className="px-5 py-4 text-right">
                  <Link
                    href={`/admin/blog/${post.id}`}
                    className="mr-4 font-medium text-maroon hover:underline"
                  >
                    Edit
                  </Link>
                  <DeleteButton id={post.id} action={deleteBlogPost} label="post" />
                </td>
              </tr>
            ))}
            {!posts?.length && (
              <tr>
                <td colSpan={4} className="px-5 py-10 text-center text-ink/50">
                  No blog posts yet — add your first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
