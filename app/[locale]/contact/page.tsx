import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/types";
import ContactForm from "@/components/public/ContactForm";
import Reveal from "@/components/public/Reveal";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const dict = getDictionary(params.locale);
  return { title: dict.contact.title };
}

export default function ContactPage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);

  return (
    <Reveal>
      <div className="max-w-content mx-auto px-8 py-16">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2">
          <div>
            <h1 className="text-4xl font-light text-ink">{dict.contact.title}</h1>
            <div className="mt-10">
              <ContactForm dict={dict} />
            </div>
          </div>

          <div>
            <p className="eyebrow text-maroon">{dict.visitUs.title}</p>
            <h2 className="mt-4 text-4xl font-light text-ink">{dict.visitUs.subtitle}</h2>
            <div className="mt-10 h-[400px] w-full overflow-hidden rounded-2xl shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d221.94976700425855!2d39.1344587!3d21.5610159!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3dbd76dfc87cd%3A0x8f4d3a4901fccd41!2z2KPYtdmI2YQg2KfZhNin2YLZhNmK2YXZitipINmE2YTYp9iz2KrYq9mF2KfYsdin2Kog2KfZhNi52YLYp9ix2YrYqQ!5e1!3m2!1sen!2ssa!4v1785399947693!5m2!1sen!2ssa"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(0.3) contrast(1.05)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Assets Real Estate Investments location"
              />
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
