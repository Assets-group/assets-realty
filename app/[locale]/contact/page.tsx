import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/types";
import ContactForm from "@/components/public/ContactForm";

export default function ContactPage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);

  return (
    <div className="max-w-content mx-auto px-8 py-16">
      <h1 className="text-4xl font-light text-ink">{dict.contact.title}</h1>
      <div className="mt-10 max-w-lg">
        <ContactForm dict={dict} />
      </div>
    </div>
  );
}
