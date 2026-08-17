import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/sections/ContactForm";
import { Mail, Phone, MapPin } from "lucide-react";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_HREF, CONTACT_ADDRESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Professional Techs to discuss your next software project.",
};

const info = [
  { icon: Mail, label: "Email", value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { icon: Phone, label: "Phone", value: CONTACT_PHONE, href: `tel:${CONTACT_PHONE_HREF}` },
  { icon: MapPin, label: "Location", value: CONTACT_ADDRESS, href: undefined },
];

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something great together"
          description="Tell us about your project and our team will get back to you within 24 hours."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1 space-y-6">
            {info.map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-xl bg-brand-gradient flex items-center justify-center shrink-0">
                  <item.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-ink/50">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="font-medium text-ink hover:text-brand-indigo transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-medium text-ink">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
