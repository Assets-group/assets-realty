import Image from "next/image";
import type { Locale } from "@/lib/types";
import type { dictionary } from "@/lib/dictionary";

export default function Footer({ dict }: { dict: (typeof dictionary)[Locale] }) {
  return (
    <footer className="border-t border-line bg-ink text-ivory">
      <div className="max-w-content mx-auto flex flex-col items-center gap-6 px-8 py-16 text-center">
        <Image
          src="/logo.png"
          alt="Assets Real Estate Investments"
          width={150}
          height={37}
          className="opacity-90 brightness-0 invert"
        />
        <div className="h-px w-12 bg-gold" />
        <p className="text-xs uppercase tracking-[0.2em] text-ivory/50">
          {dict.footer.rights} © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
