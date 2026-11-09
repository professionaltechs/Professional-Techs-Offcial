import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import LoginForm from "@/components/admin/LoginForm";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = { title: "Sign in" };

export default function AdminLoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <div className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 animate-blob rounded-full bg-brand-indigo/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-1/4 h-96 w-96 animate-blob-delay rounded-full bg-brand-cyan/15 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="glass-card rounded-3xl p-8 shadow-glow sm:p-10">
          <div className="flex items-center gap-3">
            <Image src="/logos/logo.png" alt={SITE_NAME} width={44} height={44} className="h-11 w-11 rounded-lg" />
            <div>
              <h1 className="text-xl font-bold text-ink">Admin sign in</h1>
              <p className="text-sm text-ink/60">Manage the {SITE_NAME} blog.</p>
            </div>
          </div>
          <LoginForm />
        </div>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink/60 transition-colors hover:text-brand-indigo"
        >
          <ArrowLeft className="h-4 w-4" /> Back to website
        </Link>
      </div>
    </div>
  );
}
