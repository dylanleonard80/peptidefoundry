import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useAdminGuard } from "@/hooks/useAdminGuard";
import {
  LayoutDashboard,
  Package,
  BarChart3,
  ShoppingCart,
  ClipboardList,
  Hexagon,
  ArrowLeft,
  Menu,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
}

const navItems = [
  { path: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { path: "/admin/sales", label: "Sales Overview", icon: BarChart3 },
  { path: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { path: "/admin/inventory", label: "Inventory", icon: Package },
  { path: "/admin/memberships", label: "Memberships", icon: Hexagon },
  { path: "/admin/activity", label: "Activity Log", icon: ClipboardList },
];

export const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { loading } = useAdminGuard();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="space-y-4 w-64">
          <Skeleton className="h-8 w-full bg-slate-700" />
          <Skeleton className="h-4 w-3/4 bg-slate-700" />
          <Skeleton className="h-4 w-1/2 bg-slate-700" />
        </div>
      </div>
    );
  }

  const isActive = (item: typeof navItems[number]) => {
    if (item.exact) {
      return location.pathname === item.path;
    }
    return location.pathname.startsWith(item.path);
  };

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div
      className={cn(
        "flex flex-col h-full bg-slate-900 text-white",
        mobile ? "w-full" : "w-64"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <Link
          to="/"
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Store
        </Link>
        <div className="mt-4 flex items-center gap-2">
          <span className="font-bold text-lg">Peptide Foundry</span>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-primary text-white">
            Admin
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item);
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => mobile && setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-white"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <p className="text-xs text-slate-500 truncate">{user?.email}</p>
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-400 hover:text-red-400 hover:bg-white/5"
          onClick={() => signOut()}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <aside className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <Sidebar />
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-slate-900 text-white border-b border-white/10">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 border-white/10">
            <Sidebar mobile />
          </SheetContent>
        </Sheet>

        <h1 className="font-semibold">{title || "Admin"}</h1>

        <div className="w-10" />
      </header>

      {/* Main Content */}
      <main className="md:pl-64">
        <div className="p-4 md:p-8 max-w-6xl mx-auto">
          {title && (
            <h1 className="hidden md:block text-2xl font-bold mb-6">{title}</h1>
          )}
          {children}
        </div>
      </main>
    </div>
  );
};
