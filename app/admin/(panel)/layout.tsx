import AdminSidebar from "@/components/admin/AdminSidebar";

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="lg:pl-64">
      <AdminSidebar />
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-24 sm:px-8 lg:pt-10">{children}</div>
    </div>
  );
}
