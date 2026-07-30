"use client";

import { useState } from "react";
import type { Locale } from "@/lib/types";
import type { dictionary } from "@/lib/dictionary";

export default function ContactForm({ dict }: { dict: (typeof dictionary)[Locale] }) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return <p className="text-ink/70">Thank you — we'll be in touch shortly.</p>;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // NOTE: wire this up to a Supabase table, Server Action, or
        // an email provider (Resend, etc.) before going live.
        setSent(true);
      }}
      className="space-y-5"
    >
      <div>
        <label className="mb-1 block text-sm font-medium text-ink/70">{dict.contact.name}</label>
        <input
          required
          type="text"
          className="w-full border border-line px-4 py-3 focus:border-maroon focus:outline-none"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-ink/70">{dict.contact.email}</label>
        <input
          required
          type="email"
          className="w-full border border-line px-4 py-3 focus:border-maroon focus:outline-none"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-ink/70">
          {dict.contact.message}
        </label>
        <textarea
          required
          rows={5}
          className="w-full border border-line px-4 py-3 focus:border-maroon focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="bg-ink px-8 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-maroon"
      >
        {dict.contact.send}
      </button>
    </form>
  );
}
