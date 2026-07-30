"use client";

import { useTransition } from "react";
import type { Inquiry } from "@/lib/types";
import { toggleInquiryRead, deleteInquiry } from "@/lib/actions/inquiries";
import DeleteButton from "./DeleteButton";

export default function InquiryRow({
  inquiry,
  listingName,
}: {
  inquiry: Inquiry;
  listingName?: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <tr className={`border-b border-line last:border-0 ${inquiry.read ? "" : "bg-maroon/5"}`}>
      <td className="px-5 py-4">
        {!inquiry.read && (
          <span className="inline-block h-2 w-2 rounded-full bg-maroon" title="Unread" />
        )}
      </td>
      <td className="px-5 py-4">
        <p className="font-medium text-ink">{inquiry.name}</p>
        <a href={`mailto:${inquiry.email}`} className="text-ink/50 hover:text-maroon">
          {inquiry.email}
        </a>
      </td>
      <td className="max-w-xs px-5 py-4 text-ink/70">{inquiry.message}</td>
      <td className="px-5 py-4 text-ink/70">
        {listingName ?? <span className="text-ink/40">General inquiry</span>}
      </td>
      <td className="px-5 py-4 whitespace-nowrap text-ink/50">
        {new Date(inquiry.created_at).toLocaleDateString()}
      </td>
      <td className="px-5 py-4 text-right whitespace-nowrap">
        <button
          disabled={pending}
          onClick={() =>
            startTransition(() => toggleInquiryRead(inquiry.id, !inquiry.read))
          }
          className="mr-4 font-medium text-maroon hover:underline disabled:opacity-50"
        >
          {inquiry.read ? "Mark unread" : "Mark read"}
        </button>
        <DeleteButton id={inquiry.id} action={deleteInquiry} label="inquiry" />
      </td>
    </tr>
  );
}
