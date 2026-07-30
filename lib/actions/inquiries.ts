"use server";

import { revalidatePath } from "next/cache";
import { createClient, getCurrentEmployee } from "@/lib/supabase/server";

export async function submitInquiry(formData: FormData) {
  const supabase = createClient();

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  const listingId = formData.get("listing_id") as string | null;

  if (!name || !email || !message) {
    return { error: "Please fill in all fields." };
  }

  const { error } = await supabase.from("inquiries").insert({
    name,
    email,
    message,
    listing_id: listingId || null,
  });

  if (error) return { error: error.message };

  return { success: true };
}

export async function toggleInquiryRead(id: string, read: boolean) {
  const employee = await getCurrentEmployee();
  if (!employee) throw new Error("Not authorized");

  const supabase = createClient();
  const { error } = await supabase.from("inquiries").update({ read }).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/inquiries");
}

export async function deleteInquiry(id: string) {
  const employee = await getCurrentEmployee();
  if (!employee) throw new Error("Not authorized");

  const supabase = createClient();
  const { error } = await supabase.from("inquiries").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/inquiries");
}
