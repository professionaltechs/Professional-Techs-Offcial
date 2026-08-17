import Link from "next/link";
import Image from "next/image";
import { Facebook, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import {
  NAV_LINKS,
  SITE_NAME,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  CONTACT_ADDRESS,
  SOCIAL_LINKS,
} from "@/lib/constants";
import { services } from "@/data/services";

const socials = [
  { Icon: Facebook, href: SOCIAL_LINKS.facebook },
  { Icon: Linkedin, href: SOCIAL_LINKS.linkedin },
];

export default function Footer() {
  return (
    <footer className="relative bg-navy text-white overflow-hidden">
      <div className="absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-brand-indigo/20 blur-3xl" />
      <div className="absolute -bottom-32 right-1/4 h-72 w-72 rounded-full bg-brand-cyan/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image src="/logos/logo.png" alt={SITE_NAME} width={32} height={32} className="h-8 w-8 rounded-lg" />
              <span className="text-lg font-bold">{SITE_NAME}</span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed">
              A global software development company building web, mobile, cloud and AI-powered
              products for ambitious businesses worldwide.
            </p>
            <div className="flex gap-4 mt-6">
              {socials.map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-brand-indigo transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-white/60">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-brand-cyan transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-3 text-sm text-white/60">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="hover:text-brand-cyan transition-colors">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-cyan shrink-0" />
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-brand-cyan transition-colors break-all">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand-cyan shrink-0" />
                <a href={`tel:${CONTACT_PHONE_HREF}`} className="hover:text-brand-cyan transition-colors">
                  {CONTACT_PHONE}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-brand-cyan shrink-0 mt-0.5" /> {CONTACT_ADDRESS}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-white/70">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-white/70">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
