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
  Hexagon,
  Wallet,
  Landmark,
  Ticket,
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
  { path: "/admin/coupons", label: "Coupons", icon: Ticket },
  { path: "/admin/finances", label: "Finances", icon: Wallet },
  { path: "/admin/investors", label: "Investors", icon: Landmark },
];

export const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { loading } = useAdminGuard();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-[hsl(25,20%,8%)] flex items-center justify-center">
        <div className="space-y-4 w-64">
          <Skeleton className="h-8 w-full bg-[hsl(25,15%,16%)]" />
          <Skeleton className="h-4 w-3/4 bg-[hsl(25,15%,16%)]" />
          <Skeleton className="h-4 w-1/2 bg-[hsl(25,15%,16%)]" />
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
        "flex flex-col h-full bg-[hsl(25,20%,8%)] text-white relative",
        mobile ? "w-full" : "w-64"
      )}
    >
      {/* Top accent line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

      {/* Header */}
      <div className="px-5 pt-5 pb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-[hsl(25,10%,50%)] hover:text-white transition-colors text-xs tracking-wide uppercase"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Store
        </Link>
        <div className="mt-4 flex items-center gap-2.5">
          <span className="font-display text-lg tracking-tight">Peptide Foundry</span>
          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-[0.08em] bg-primary/90 text-white">
            Admin
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-5 h-px bg-white/[0.06]" />

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item);
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => mobile && setMobileOpen(false)}
              className={cn(
                "group flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200 relative",
                active
                  ? "bg-white/[0.08] text-white"
                  : "text-[hsl(25,8%,58%)] hover:text-white hover:bg-white/[0.04]"
              )}
            >
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-primary" />
              )}
              <Icon className={cn("h-4 w-4 transition-colors", active ? "text-primary" : "group-hover:text-white/70")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mx-5 h-px bg-white/[0.06]" />
      <div className="px-5 py-4 space-y-2">
        <p className="text-[11px] text-[hsl(25,8%,36%)] truncate font-mono">{user?.email}</p>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-[hsl(25,10%,50%)] hover:text-red-400 hover:bg-white/[0.04] h-8 px-2 text-xs"
          onClick={() => signOut()}
        >
          <LogOut className="h-3.5 w-3.5 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[hsl(30,20%,96%)]">
      {/* Desktop Sidebar */}
      <aside className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <Sidebar />
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-[hsl(25,20%,8%)] text-white">
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

        <h1 className="font-display text-sm tracking-tight">{title || "Admin"}</h1>

        <div className="w-10" />
      </header>

      {/* Main Content */}
      <main className="md:pl-64">
        <div className="p-4 md:p-8 max-w-6xl mx-auto">
          {title && (
            <div className="hidden md:flex items-center gap-3 mb-8">
              <h1 className="text-2xl font-display tracking-tight">{title}</h1>
              <div className="flex-1 h-px bg-border/50 ml-2" />
            </div>
          )}
          {children}
        </div>
      </main>
    </div>
  );
};
