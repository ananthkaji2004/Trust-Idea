import { DashboardMobileNav } from "@/components/dashboard/DashboardMobileNav";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardTopNav } from "@/components/dashboard/DashboardTopNav";

export const metadata = {
  title: "Dashboard — TRUST IDEA",
  description: "Your brand reality dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-[#050505] z-10">
      <DashboardTopNav />
      <DashboardSidebar />
      <main className="lg:pl-60 pt-16 min-h-screen">
        <div className="p-4 md:p-6 lg:p-8 max-w-[1600px]">
          <DashboardMobileNav />
          {children}
        </div>
      </main>
    </div>
  );
}
