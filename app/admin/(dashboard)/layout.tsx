import { redirect } from "next/navigation";
import { getCurrentEmployee } from "@/lib/supabase/server";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const employee = await getCurrentEmployee();

  // The /admin/login page renders its own minimal shell (see that page),
  // so only guard the rest of /admin here.
  if (!employee) {
    // If the user is authenticated but has no employees row, or isn't
    // authenticated at all, middleware already redirects to /admin/login
    // for unauthenticated visitors. This covers the "authenticated but
    // not provisioned as an employee yet" case.
    redirect("/admin/login?error=not_provisioned");
  }

  return (
    <div className="flex min-h-screen font-sans" style={{ fontFamily: "Tajawal, sans-serif" }}>
      <AdminSidebar employee={employee} />
      <div className="flex-1 bg-cream/40 p-10">{children}</div>
    </div>
  );
}
