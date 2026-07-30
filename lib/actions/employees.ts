"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient as createServerClient, getCurrentEmployee } from "@/lib/supabase/server";
import { createClient as createSupabaseAdminClient } from "@supabase/supabase-js";

/**
 * Requires SUPABASE_SERVICE_ROLE_KEY (server-only env var, never exposed
 * to the browser) to create Auth users for new employees.
 */
function adminClient() {
  return createSupabaseAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function inviteEmployee(formData: FormData) {
  const currentEmployee = await getCurrentEmployee();
  if (!currentEmployee || currentEmployee.role !== "admin") {
    throw new Error("Only admins can add employees");
  }

  const email = formData.get("email") as string;
  const full_name = formData.get("full_name") as string;
  const role = formData.get("role") as string;

  const admin = adminClient();

  // Creates the Auth user and emails them an invite to set their password.
  const { data, error } = await admin.auth.admin.inviteUserByEmail(email);
  if (error) throw new Error(error.message);

  const { error: insertError } = await createServerClient()
    .from("employees")
    .insert({ id: data.user.id, full_name, email, role });
  if (insertError) throw new Error(insertError.message);

  revalidatePath("/admin/employees");
  redirect("/admin/employees");
}

export async function updateEmployeeRole(id: string, role: "admin" | "agent") {
  const currentEmployee = await getCurrentEmployee();
  if (!currentEmployee || currentEmployee.role !== "admin") {
    throw new Error("Only admins can change roles");
  }

  const supabase = createServerClient();
  const { error } = await supabase.from("employees").update({ role }).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/employees");
}

export async function removeEmployee(id: string) {
  const currentEmployee = await getCurrentEmployee();
  if (!currentEmployee || currentEmployee.role !== "admin") {
    throw new Error("Only admins can remove employees");
  }

  const admin = adminClient();
  await admin.auth.admin.deleteUser(id); // also cascades the employees row
  revalidatePath("/admin/employees");
}
