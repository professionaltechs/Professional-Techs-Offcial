"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-300",
          scrolled && "max-w-6xl"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between rounded-full px-5 py-3 transition-all duration-300",
            scrolled ? "glass-card shadow-sm" : "bg-transparent"
          )}
        >
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logos/logo.png" alt={SITE_NAME} width={44} height={44} className="h-11 w-11 rounded-lg" priority />
            <span className="text-lg font-bold text-ink uppercase">{SITE_NAME}</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-ink/70 hover:text-brand-indigo transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button href="/quote" variant="primary" className="!px-5 !py-2.5">
              Get a Quote
            </Button>
          </div>

          <button
            className="md:hidden text-ink"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-2 glass-card rounded-3xl p-6 flex flex-col gap-4"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-ink/80 hover:text-brand-indigo"
              >
                {link.label}
              </Link>
            ))}
            <Button href="/quote" variant="primary" className="mt-2 justify-center">
              Get a Quote
            </Button>
          </motion.div>
        )}
      </div>
    </header>
  );
}
