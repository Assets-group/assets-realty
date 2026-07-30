import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient, getCurrentEmployee } from "@/lib/supabase/server";
import type { Employee } from "@/lib/types";
import RoleSelect from "@/components/admin/RoleSelect";
import DeleteButton from "@/components/admin/DeleteButton";
import { removeEmployee } from "@/lib/actions/employees";

export default async function AdminEmployeesPage() {
  const currentEmployee = await getCurrentEmployee();
  if (currentEmployee?.role !== "admin") redirect("/admin");

  const supabase = createClient();
  const { data: employees } = await supabase
    .from("employees")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-light text-ink">Employees</h1>
        <Link
          href="/admin/employees/new"
          className="bg-ink px-6 py-3 text-sm font-bold uppercase tracking-wider text-white hover:bg-maroon"
        >
          + Invite Employee
        </Link>
      </div>

      <div className="mt-8 overflow-hidden border border-line bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line bg-cream/60 text-xs uppercase tracking-wider text-ink/50">
            <tr>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Role</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {(employees as Employee[] | null)?.map((employee) => (
              <tr key={employee.id} className="border-b border-line last:border-0">
                <td className="px-5 py-4 font-medium text-ink">{employee.full_name}</td>
                <td className="px-5 py-4 text-ink/70">{employee.email}</td>
                <td className="px-5 py-4">
                  <RoleSelect
                    employeeId={employee.id}
                    currentRole={employee.role}
                    disabled={employee.id === currentEmployee.id}
                  />
                </td>
                <td className="px-5 py-4 text-right">
                  {employee.id !== currentEmployee.id && (
                    <DeleteButton id={employee.id} action={removeEmployee} label="employee" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-ink/50">
        Inviting an employee sends them an email to set their own password.
      </p>
    </div>
  );
}
