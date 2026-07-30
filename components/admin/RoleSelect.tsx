"use client";

import { useTransition } from "react";
import { updateEmployeeRole } from "@/lib/actions/employees";

export default function RoleSelect({
  employeeId,
  currentRole,
  disabled,
}: {
  employeeId: string;
  currentRole: "admin" | "agent";
  disabled?: boolean;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      defaultValue={currentRole}
      disabled={disabled || pending}
      onChange={(e) =>
        startTransition(() =>
          updateEmployeeRole(employeeId, e.target.value as "admin" | "agent")
        )
      }
      className="border border-line px-3 py-1.5 text-sm disabled:opacity-50"
    >
      <option value="agent">Agent</option>
      <option value="admin">Admin</option>
    </select>
  );
}
