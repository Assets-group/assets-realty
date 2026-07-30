import type { Locale } from "@/lib/types";
import type { dictionary } from "@/lib/dictionary";

export default function Footer({ dict }: { dict: (typeof dictionary)[Locale] }) {
  return (
    <footer className="border-t border-line py-10 text-center text-sm text-ink/50">
      {dict.footer.rights} {new Date().getFullYear()} ©
    </footer>
  );
}
