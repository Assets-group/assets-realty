import type { Locale } from "./types";

export const dictionary = {
  en: {
    nav: {
      home: "Home",
      about: "About us",
      residences: "Residences",
      pastProjects: "Past Projects",
      contact: "Contact us",
      langToggle: "العربية",
    },
    hero: {
      eyebrow: "Jeddah · Real Estate Investments",
      title: "Like No Other",
      subtitle:
        "We provide the best services in real estate investment and development to achieve our client's goals and aspirations.",
    },
    about: {
      eyebrow: "About Us",
      title: "More Than 20 Years of Experience",
      body: "We are a real estate investment and consultancy company that prioritizes customer satisfaction. We offer the best services in the industry to help our clients achieve their goals and aspirations. We rely on our extensive experience and professional consultants to provide our clients with expert advice and guidance at all times. We also promote the principles of transparency, mutual trust, credibility, and sustainability to build strong and lasting relationships with our clients.",
    },
    residences: {
      title: "Residences in Jeddah, presented like no other.",
      subtitle:
        "A living collection of villas, penthouses and branded residences across Jeddah's most distinguished addresses.",
      allTypes: "All Types",
      allAreas: "All Areas",
      anyPrice: "Any Price",
      forSale: "For Sale",
      forRent: "For Rent",
      match: "residences match",
      viewDetails: "View Details",
      beds: "Beds",
      baths: "Baths",
      sqm: "sqm",
      empty: "No residences match these filters — try widening your search.",
    },
    pastProjects: {
      title: "Previous Projects",
      subtitle: "A record of what we've delivered.",
    },
    contact: {
      title: "Get in touch",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send",
      sent: "Thank you — we'll be in touch shortly.",
      error: "Something went wrong. Please try again.",
    },
    listingInquiry: {
      title: "Interested in this residence?",
      message: "Ask about this residence — availability, viewings, or pricing.",
      send: "Send Inquiry",
    },
    visitUs: {
      title: "Visit Us",
      subtitle: "Jeddah, Saudi Arabia",
    },
    footer: {
      rights: "All rights reserved to Assets Real Estate Investments",
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      about: "عن أصول",
      residences: "الوحدات السكنية",
      pastProjects: "مشاريعنا السابقة",
      contact: "تواصل معنا",
      langToggle: "English",
    },
    hero: {
      eyebrow: "جدة · استثمارات عقارية",
      title: "لامثيل لنا",
      subtitle:
        "نقدم أفضل الخدمات في الاستثمار والتطوير العقاري لتحقيق أهداف عملائنا وتطلعاتهم.",
    },
    about: {
      eyebrow: "عن أصول",
      title: "أكثر من 20 عامًا من الخبرة",
      body: "نحن شركة استثمار واستشارات عقارية تضع رضا العملاء في مقدمة أولوياتها. نقدم أفضل الخدمات في القطاع لمساعدة عملائنا على تحقيق أهدافهم وتطلعاتهم. نعتمد على خبرتنا الواسعة واستشاريينا المحترفين لتزويد عملائنا بالمشورة والتوجيه بشكل دائم. كما نتبنى مبادئ الشفافية والثقة المتبادلة والمصداقية والاستدامة لبناء علاقات قوية ودائمة مع عملائنا.",
    },
    residences: {
      title: "وحدات سكنية في جدة، بأسلوب لا مثيل له.",
      subtitle: "مجموعة حية من الفلل والبنتهاوس والوحدات ذات العلامات التجارية في أرقى أحياء جدة.",
      allTypes: "كل الأنواع",
      allAreas: "كل الأحياء",
      anyPrice: "أي سعر",
      forSale: "للبيع",
      forRent: "للإيجار",
      match: "وحدة مطابقة",
      viewDetails: "التفاصيل",
      beds: "غرف نوم",
      baths: "حمامات",
      sqm: "متر مربع",
      empty: "لا توجد وحدات مطابقة لهذا البحث — جرّب توسيع نطاق البحث.",
    },
    pastProjects: {
      title: "مشاريعنا السابقة",
      subtitle: "سجل بما أنجزناه.",
    },
    contact: {
      title: "تواصل معنا",
      name: "الاسم",
      email: "البريد الإلكتروني",
      message: "الرسالة",
      send: "إرسال",
      sent: "شكراً لك — سنتواصل معك قريباً.",
      error: "حدث خطأ ما. الرجاء المحاولة مرة أخرى.",
    },
    listingInquiry: {
      title: "مهتم بهذه الوحدة؟",
      message: "استفسر عن هذه الوحدة — التوفر، المعاينة، أو السعر.",
      send: "إرسال الاستفسار",
    },
    visitUs: {
      title: "زورونا",
      subtitle: "جدة، المملكة العربية السعودية",
    },
    footer: {
      rights: "جميع الحقوق محفوظة لأصول للاستثمارات العقارية",
    },
  },
} as const;

export function getDictionary(locale: Locale) {
  return dictionary[locale];
}
