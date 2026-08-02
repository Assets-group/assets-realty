"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient, getCurrentEmployee } from "@/lib/supabase/server";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function saveBlogPost(formData: FormData) {
  const employee = await getCurrentEmployee();
  if (!employee) throw new Error("Not authorized");

  const supabase = createClient();
  const id = formData.get("id") as string | null;
  const titleEn = formData.get("title_en") as string;

  const payload = {
    slug: (formData.get("slug") as string) || slugify(titleEn),
    title_en: titleEn,
    title_ar: formData.get("title_ar") as string,
    excerpt_en: formData.get("excerpt_en") as string,
    excerpt_ar: formData.get("excerpt_ar") as string,
    body_en: formData.get("body_en") as string,
    body_ar: formData.get("body_ar") as string,
    cover_image_url: formData.get("cover_image_url") as string,
    published: formData.get("published") === "on",
  };

  if (id) {
    const { error } = await supabase.from("blog_posts").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase
      .from("blog_posts")
      .insert({ ...payload, created_by: employee.id });
    if (error) throw new Error(error.message);
  }

  revalidatePath("/admin/blog");
  revalidatePath("/[locale]/blog", "page");
  revalidatePath("/[locale]", "page");
  redirect("/admin/blog");
}

export async function deleteBlogPost(id: string) {
  const employee = await getCurrentEmployee();
  if (!employee) throw new Error("Not authorized");

  const supabase = createClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/blog");
  revalidatePath("/[locale]/blog", "page");
}
