"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient, getCurrentEmployee } from "@/lib/supabase/server";

export async function saveCurrentProject(formData: FormData) {
  const employee = await getCurrentEmployee();
  if (!employee) throw new Error("Not authorized");

  const supabase = createClient();
  const id = formData.get("id") as string | null;

  const payload = {
    name_en: formData.get("name_en") as string,
    name_ar: formData.get("name_ar") as string,
    description_en: formData.get("description_en") as string,
    description_ar: formData.get("description_ar") as string,
    image_url: formData.get("image_url") as string,
    sort_order: Number(formData.get("sort_order") ?? 0),
    published: formData.get("published") === "on",
  };

  if (id) {
    const { error } = await supabase.from("current_projects").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase
      .from("current_projects")
      .insert({ ...payload, created_by: employee.id });
    if (error) throw new Error(error.message);
  }

  revalidatePath("/admin/current-projects");
  revalidatePath("/[locale]", "page");
  redirect("/admin/current-projects");
}

export async function deleteCurrentProject(id: string) {
  const employee = await getCurrentEmployee();
  if (!employee) throw new Error("Not authorized");

  const supabase = createClient();
  const { error } = await supabase.from("current_projects").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/current-projects");
  revalidatePath("/[locale]", "page");
}
