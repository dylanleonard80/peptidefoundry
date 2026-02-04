import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useMembership } from "@/hooks/useMembership";
import { useUserRole } from "@/hooks/useUserRole";
import {
  LayoutDashboard,
  Package,
  Hexagon,
  FileText,
  Settings,
  Heart,
  Menu,
  X,
  LogOut,
  ChevronLeft,
  Newspaper,
  Calculator,
  ClipboardList,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

const navItems = [
  { path: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { path: "/dashboard/orders", label: "Orders", icon: Package },
  { path: "/dashboard/calculator", label: "Peptide Calculator", icon: Calculator },
  { path: "/dashboard/membership", label: "Foundry Club", icon: Hexagon },
  { path: "/dashboard/research-briefs", label: "Research Briefs", icon: Newspaper },
  { path: "/dashboard/documents", label: "Documents", icon: FileText },
  { path: "/dashboard/settings", label: "Settings", icon: Settings },
  { path: "/dashboard/wishlist", label: "Wishlist", icon: Heart },
];

const adminNavItems = [
  { path: "/admin/applications", label: "Applications", icon: ClipboardList },
];

export const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, loading: authLoading, signOut } = useAuth();
  const { isMember } = useMembership();
  const { isAdmin } = useUserRole();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Redirect if not authenticated
  if (!authLoading && !user) {
    navigate("/auth", { replace: true });
    return null;
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="space-y-4 w-64">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    );
  }

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={cn(
      "flex flex-col h-full bg-background border-r",
      mobile ? "w-full" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="h-4 w-4" />
          <span className="text-sm">Back to Shop</span>
        </Link>
        <div className="mt-4">
          <p className="font-semibold text-lg">
            {profile?.first_name || "Welcome"}
          </p>
          <p className="text-sm text-muted-foreground truncate">
            {user?.email}
          </p>
          {isMember && (
            <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
              <Hexagon className="h-3 w-3" />
              Foundry Club Member
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => mobile && setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
              {item.path === "/dashboard/membership" && isMember && (
                <span className="ml-auto w-2 h-2 rounded-full bg-green-500" />
              )}
            </Link>
          );
        })}

        {/* Admin Section */}
        {isAdmin && (
          <>
            <div className="pt-4 pb-2">
              <div className="flex items-center gap-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <Shield className="h-3 w-3" />
                Admin
              </div>
            </div>
            {adminNavItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => mobile && setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </>
        )}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-destructive"
          onClick={() => signOut()}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Desktop Sidebar */}
      <aside className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <Sidebar />
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-background border-b">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72">
            <Sidebar mobile />
          </SheetContent>
        </Sheet>
        
        <h1 className="font-semibold">{title || "Dashboard"}</h1>
        
        <div className="w-10" /> {/* Spacer for centering */}
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
