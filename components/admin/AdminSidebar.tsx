"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ExternalLink, LayoutDashboard, LogOut, SquarePen } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Dashboard", href: "/admin", Icon: LayoutDashboard },
  { label: "New post", href: "/admin/new", Icon: SquarePen },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" || pathname.startsWith("/admin/edit") : pathname === href;

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col bg-navy p-6 text-white lg:flex">
        <Link href="/admin" className="flex items-center gap-3">
          <Image src="/logos/logo.png" alt={SITE_NAME} width={36} height={36} className="h-9 w-9 rounded-lg" />
          <span className="text-sm font-bold leading-tight">
            {SITE_NAME}
            <span className="block text-xs font-normal text-white/50">Blog admin</span>
          </span>
        </Link>

        <nav className="mt-10 flex flex-1 flex-col gap-1">
          {nav.map(({ label, href, Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                isActive(href) ? "bg-brand-indigo text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
          <Link
            href="/blog"
            target="_blank"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
          >
            <ExternalLink className="h-4 w-4" />
            View blog
          </Link>
        </nav>

        <button
          onClick={signOut}
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </aside>

      {/* Mobile top bar */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between bg-navy px-4 text-white lg:hidden">
        <Link href="/admin" className="flex items-center gap-2">
          <Image src="/logos/logo.png" alt={SITE_NAME} width={32} height={32} className="h-8 w-8 rounded-lg" />
          <span className="text-sm font-bold">Blog admin</span>
        </Link>
        <nav className="flex items-center gap-1">
          {nav.map(({ label, href, Icon }) => (
            <Link
              key={href}
              href={href}
              aria-label={label}
              className={cn(
                "rounded-lg p-2.5 transition-colors",
                isActive(href) ? "bg-brand-indigo" : "text-white/70 hover:bg-white/10"
              )}
            >
              <Icon className="h-5 w-5" />
            </Link>
          ))}
          <button
            onClick={signOut}
            aria-label="Sign out"
            className="rounded-lg p-2.5 text-white/70 transition-colors hover:bg-white/10"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </nav>
      </header>
    </>
  );
}
