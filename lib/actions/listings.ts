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

export async function saveListing(formData: FormData) {
  const employee = await getCurrentEmployee();
  if (!employee) throw new Error("Not authorized");

  const supabase = createClient();
  const id = formData.get("id") as string | null;

  const galleryRaw = formData.get("gallery_urls") as string;
  const gallery_urls = galleryRaw
    ? galleryRaw.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  const nameEn = formData.get("name_en") as string;

  const payload = {
    slug: (formData.get("slug") as string) || slugify(nameEn),
    name_en: nameEn,
    name_ar: formData.get("name_ar") as string,
    property_type: formData.get("property_type") as string,
    status: formData.get("status") as string,
    area_en: formData.get("area_en") as string,
    area_ar: formData.get("area_ar") as string,
    price: formData.get("price") ? Number(formData.get("price")) : null,
    bedrooms: Number(formData.get("bedrooms")),
    bathrooms: Number(formData.get("bathrooms")),
    area_sqm: Number(formData.get("area_sqm")),
    description_en: formData.get("description_en") as string,
    description_ar: formData.get("description_ar") as string,
    main_image_url: formData.get("main_image_url") as string,
    gallery_urls,
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
  };

  if (id) {
    const { error } = await supabase.from("listings").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase
      .from("listings")
      .insert({ ...payload, created_by: employee.id });
    if (error) throw new Error(error.message);
  }

  revalidatePath("/admin/listings");
  revalidatePath("/[locale]/residences", "page");
  redirect("/admin/listings");
}

export async function deleteListing(id: string) {
  const employee = await getCurrentEmployee();
  if (!employee) throw new Error("Not authorized");

  const supabase = createClient();
  const { error } = await supabase.from("listings").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/listings");
  revalidatePath("/[locale]/residences", "page");
}
