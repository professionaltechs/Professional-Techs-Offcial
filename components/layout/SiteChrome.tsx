"use client";

import { usePathname } from "next/navigation";

/**
 * Wraps public pages with the navbar and footer. The admin dashboard
 * (/admin/*) has its own layout, so the site chrome is hidden there.
 */
export default function SiteChrome({
  navbar,
  footer,
  children,
}: {
  navbar: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return <>{children}</>;

  return (
    <>
      {navbar}
      <main>{children}</main>
      {footer}
    </>
  );
}
