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

export async function savePastProject(formData: FormData) {
  const employee = await getCurrentEmployee();
  if (!employee) throw new Error("Not authorized");

  const supabase = createClient();
  const id = formData.get("id") as string | null;
  const nameEn = formData.get("name_en") as string;

  const payload = {
    slug: (formData.get("slug") as string) || slugify(nameEn),
    name_en: nameEn,
    name_ar: formData.get("name_ar") as string,
    location_en: formData.get("location_en") as string,
    location_ar: formData.get("location_ar") as string,
    year: formData.get("year") as string,
    description_en: formData.get("description_en") as string,
    description_ar: formData.get("description_ar") as string,
    photo_url: formData.get("photo_url") as string,
    published: formData.get("published") === "on",
  };

  if (id) {
    const { error } = await supabase.from("past_projects").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase
      .from("past_projects")
      .insert({ ...payload, created_by: employee.id });
    if (error) throw new Error(error.message);
  }

  revalidatePath("/admin/past-projects");
  revalidatePath("/[locale]/past-projects", "page");
  revalidatePath("/[locale]", "page");
  redirect("/admin/past-projects");
}

export async function deletePastProject(id: string) {
  const employee = await getCurrentEmployee();
  if (!employee) throw new Error("Not authorized");

  const supabase = createClient();
  const { error } = await supabase.from("past_projects").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/past-projects");
  revalidatePath("/[locale]/past-projects", "page");
}
