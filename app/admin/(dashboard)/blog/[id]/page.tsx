import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { BlogPost } from "@/lib/types";
import BlogPostForm from "@/components/admin/BlogPostForm";

export default async function EditBlogPostPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!post) notFound();

  return (
    <div>
      <h1 className="mb-8 text-2xl font-light text-ink">Edit Blog Post</h1>
      <BlogPostForm post={post as BlogPost} />
    </div>
  );
}
