import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import GlowCard from "@/components/ui/GlowCard";
import FadeIn from "@/components/shared/FadeIn";
import { SITE_NAME, CONTACT_EMAIL, CONTACT_PHONE, CONTACT_ADDRESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms and Conditions for using ${SITE_NAME}'s website and services.`,
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: `By accessing or using the ${SITE_NAME} website and services, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our website or services.`,
  },
  {
    title: "2. Services",
    body: "We provide software development, web development, mobile app development, UI/UX design, cloud & DevOps, AI/ML solutions, and SEO services. The specific scope, timeline, and cost of any project will be agreed upon separately with each client.",
  },
  {
    title: "3. Use of Website",
    body: "You agree to use this website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use of the website.",
  },
  {
    title: "4. Intellectual Property",
    body: `Unless otherwise stated, all content on this website — including text, graphics, logos, and images — is the property of ${SITE_NAME} and is protected by applicable intellectual property laws. Project deliverables and ownership terms are governed separately by individual client agreements.`,
  },
  {
    title: "5. Payment & Project Terms",
    body: "Payment terms, project milestones, and deliverables will be outlined in a separate agreement or proposal for each client engagement. Any delays in payment may result in a pause of ongoing work.",
  },
  {
    title: "6. Limitation of Liability",
    body: `${SITE_NAME} shall not be held liable for any indirect, incidental, or consequential damages arising from the use of our website or services, to the fullest extent permitted by law.`,
  },
  {
    title: "7. Third-Party Links",
    body: "Our website and portfolio may contain links to third-party websites, including client projects. We are not responsible for the content, policies, or practices of any third-party websites.",
  },
  {
    title: "8. Changes to Terms",
    body: "We reserve the right to update or modify these Terms & Conditions at any time. Continued use of our website after changes are posted constitutes acceptance of the revised terms.",
  },
  {
    title: "9. Governing Law",
    body: "These Terms & Conditions shall be governed by and construed in accordance with the laws of Pakistan.",
  },
  {
    title: "10. Contact Us",
    body: `For any questions regarding these Terms & Conditions, please contact us at ${CONTACT_EMAIL}, call us at ${CONTACT_PHONE}, or write to us at ${CONTACT_ADDRESS}.`,
  },
];

export default function TermsAndConditionsPage() {
  return (
    <div className="pt-32 pb-24">
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-12">
        <SectionHeading
          eyebrow="Legal"
          title="Terms & Conditions"
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
