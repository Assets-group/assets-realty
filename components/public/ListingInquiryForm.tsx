"use client";

import { useState } from "react";
import type { Locale } from "@/lib/types";
import type { dictionary } from "@/lib/dictionary";
import { submitInquiry } from "@/lib/actions/inquiries";

export default function ListingInquiryForm({
  dict,
  listingId,
}: {
  dict: (typeof dictionary)[Locale];
  listingId: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-line p-6 shadow-md">
        <p className="text-ink/70">{dict.contact.sent}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-line p-6 shadow-md">
      <h2 className="text-lg font-medium text-ink">{dict.listingInquiry.title}</h2>
      <p className="mt-1 text-sm text-ink/60">{dict.listingInquiry.message}</p>

      <form
        action={async (formData) => {
          setStatus("sending");
          const result = await submitInquiry(formData);
          setStatus(result?.error ? "error" : "sent");
        }}
        className="mt-5 space-y-4"
      >
        <input type="hidden" name="listing_id" value={listingId} />
        <input
          required
          name="name"
          type="text"
          placeholder={dict.contact.name}
          className="w-full rounded-md border border-line px-4 py-3 shadow-sm transition-colors focus:border-maroon focus:outline-none"
        />
        <input
          required
          name="email"
          type="email"
          placeholder={dict.contact.email}
          className="w-full rounded-md border border-line px-4 py-3 shadow-sm transition-colors focus:border-maroon focus:outline-none"
        />
        <textarea
          required
          name="message"
          rows={4}
          placeholder={dict.contact.message}
          className="w-full rounded-md border border-line px-4 py-3 shadow-sm transition-colors focus:border-maroon focus:outline-none"
        />
        {status === "error" && <p className="text-sm text-red-600">{dict.contact.error}</p>}
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full rounded-md bg-ink px-8 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-maroon hover:shadow-lg disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {dict.listingInquiry.send}
        </button>
      </form>
    </div>
  );
}
