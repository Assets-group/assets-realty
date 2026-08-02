"use client";

import { useState } from "react";
import type { Locale } from "@/lib/types";
import type { dictionary } from "@/lib/dictionary";
import { submitInquiry } from "@/lib/actions/inquiries";

export default function ContactForm({ dict }: { dict: (typeof dictionary)[Locale] }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  if (status === "sent") {
    return <p className="text-ink/70">{dict.contact.sent}</p>;
  }

  return (
    <form
      action={async (formData) => {
        setStatus("sending");
        const result = await submitInquiry(formData);
        setStatus(result?.error ? "error" : "sent");
      }}
      className="space-y-5"
    >
      <div>
        <label className="mb-1 block text-sm font-medium text-ink/70">{dict.contact.name}</label>
        <input
          required
          name="name"
          type="text"
          className="w-full rounded-md border border-line px-4 py-3 shadow-sm transition-colors focus:border-maroon focus:outline-none"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-ink/70">{dict.contact.email}</label>
        <input
          required
          name="email"
          type="email"
          className="w-full rounded-md border border-line px-4 py-3 shadow-sm transition-colors focus:border-maroon focus:outline-none"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-ink/70">
          {dict.contact.message}
        </label>
        <textarea
          required
          name="message"
          rows={5}
          className="w-full rounded-md border border-line px-4 py-3 shadow-sm transition-colors focus:border-maroon focus:outline-none"
        />
      </div>
      {status === "error" && <p className="text-sm text-red-600">{dict.contact.error}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-md bg-ink px-8 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-maroon hover:shadow-lg disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {dict.contact.send}
      </button>
    </form>
  );
}
