import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import GlowCard from "@/components/ui/GlowCard";
import FadeIn from "@/components/shared/FadeIn";
import { SITE_NAME, CONTACT_EMAIL, CONTACT_PHONE, CONTACT_ADDRESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy of ${SITE_NAME} — how we collect, use, and protect your information.`,
};

const sections = [
  {
    title: "1. Introduction",
    body: `${SITE_NAME} ("we", "us", or "our") respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.`,
  },
  {
    title: "2. Information We Collect",
    body: "We may collect personal information such as your name, email address, phone number, and company details when you fill out our contact form, request a quote, or otherwise communicate with us. We may also collect non-personal information automatically, such as browser type, device information, and pages visited, to help us improve our website.",
  },
  {
    title: "3. How We Use Your Information",
    body: "We use the information we collect to respond to your inquiries, provide and improve our services, communicate updates about your projects, and, where permitted, send you information about our services that may be of interest to you.",
  },
  {
    title: "4. Sharing of Information",
    body: "We do not sell, rent, or trade your personal information to third parties. We may share information with trusted service providers who assist us in operating our website and delivering our services, provided they agree to keep this information confidential.",
  },
  {
    title: "5. Data Security",
    body: "We implement reasonable administrative, technical, and physical safeguards to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet is 100% secure.",
  },
  {
    title: "6. Cookies",
    body: "Our website may use cookies and similar technologies to enhance your browsing experience and analyze site traffic. You can choose to disable cookies through your browser settings, though this may affect certain website features.",
  },
  {
    title: "7. Your Rights",
    body: "You may request access to, correction of, or deletion of your personal information at any time by contacting us using the details below.",
  },
  {
    title: "8. Changes to This Policy",
    body: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.",
  },
  {
    title: "9. Contact Us",
    body: `If you have any questions about this Privacy Policy, please contact us at ${CONTACT_EMAIL}, call us at ${CONTACT_PHONE}, or write to us at ${CONTACT_ADDRESS}.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-32 pb-24">
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-12">
        <SectionHeading
          eyebrow="Legal"
          title="Privacy Policy"
          description="Last updated: August 2026"
          align="left"
        />
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <GlowCard className="space-y-8">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="text-lg font-semibold text-ink mb-2">{s.title}</h2>
                <p className="text-sm text-ink/70 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </GlowCard>
        </FadeIn>
      </section>
    </div>
  );
}
