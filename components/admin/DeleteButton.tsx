"use client";

import { useTransition } from "react";

export default function DeleteButton({
  id,
  action,
  label,
}: {
  id: string;
  action: (id: string) => Promise<void>;
  label: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        if (confirm(`Delete this ${label}? This can't be undone.`)) {
          startTransition(() => action(id));
        }
      }}
      disabled={pending}
      className="font-medium text-ink/50 hover:text-maroon disabled:opacity-50"
    >
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}
