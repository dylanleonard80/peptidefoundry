import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { Suspense, lazy } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { ScrollToTop } from "./components/ScrollToTop";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Analytics } from "@vercel/analytics/react";

const SmoothScrollProvider = ({ children }: { children: React.ReactNode }) => {
  useSmoothScroll();
  return <>{children}</>;
};

// Eagerly loaded pages (critical path)
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

// Lazy loaded pages
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderSuccess = lazy(() => import("./pages/OrderSuccess"));
const FoundryClub = lazy(() => import("./pages/FoundryClub"));

// Legal pages
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));
const ShippingPolicy = lazy(() => import("./pages/ShippingPolicy"));

// Dashboard pages
const DashboardIndex = lazy(() => import("./pages/dashboard/Index"));
const DashboardOrders = lazy(() => import("./pages/dashboard/Orders"));
const DashboardCalculator = lazy(() => import("./pages/dashboard/Calculator"));
const DashboardMembership = lazy(() => import("./pages/dashboard/Membership"));
const DashboardResearchBriefs = lazy(() => import("./pages/dashboard/ResearchBriefs"));
const DashboardResearchAudit = lazy(() => import("./pages/dashboard/ResearchAudit"));
const DashboardDocuments = lazy(() => import("./pages/dashboard/Documents"));
const DashboardSettings = lazy(() => import("./pages/dashboard/Settings"));

// Category pages
const BuildMuscle = lazy(() => import("./pages/BuildMuscle"));
const LoseFat = lazy(() => import("./pages/LoseFat"));
const Recovery = lazy(() => import("./pages/Recovery"));
const Libido = lazy(() => import("./pages/Libido"));

const AntiAging = lazy(() => import("./pages/AntiAging"));

// Individual peptide pages
const BPC157 = lazy(() => import("./pages/BPC157"));
const TB500 = lazy(() => import("./pages/TB500"));
const CJC1295Ipamorelin = lazy(() => import("./pages/CJC1295Ipamorelin"));

const Melanotan2 = lazy(() => import("./pages/Melanotan2"));
const Epithalon = lazy(() => import("./pages/Epithalon"));
const BPC157TB500 = lazy(() => import("./pages/BPC157TB500"));

const GLOW = lazy(() => import("./pages/GLOW"));
const KLOW = lazy(() => import("./pages/KLOW"));
const Ipamorelin = lazy(() => import("./pages/Ipamorelin"));
const IGF1LR3 = lazy(() => import("./pages/IGF1LR3"));

const Tesamorelin = lazy(() => import("./pages/Tesamorelin"));

const Sermorelin = lazy(() => import("./pages/Sermorelin"));
const AOD9604 = lazy(() => import("./pages/AOD9604"));
const Cagrilintide = lazy(() => import("./pages/Cagrilintide"));
const GLP3RT = lazy(() => import("./pages/GLP3RT"));
const MOTSC = lazy(() => import("./pages/MOTSC"));

const DSIP = lazy(() => import("./pages/DSIP"));
const GHKCu = lazy(() => import("./pages/GHKCu"));
const Selank = lazy(() => import("./pages/Selank"));
const Semax = lazy(() => import("./pages/Semax"));
const NADBuffered = lazy(() => import("./pages/NADBuffered"));
const Glutathione = lazy(() => import("./pages/Glutathione"));
const PT141 = lazy(() => import("./pages/PT141"));
const GLP1SG = lazy(() => import("./pages/GLP1SG"));
const GLP1TZ = lazy(() => import("./pages/GLP1TZ"));
const TesamorelinIpamorelin = lazy(() => import("./pages/TesamorelinIpamorelin"));

// Admin pages
const AdminIndex = lazy(() => import("./pages/admin/Index"));
const AdminSales = lazy(() => import("./pages/admin/SalesOverview"));
const AdminOrders = lazy(() => import("./pages/admin/OrderManagement"));
const AdminInventory = lazy(() => import("./pages/admin/Inventory"));
const AdminActivity = lazy(() => import("./pages/admin/Activity"));
const AdminMemberships = lazy(() => import("./pages/admin/Memberships"));

// Supplies
const BacteriostaticWater = lazy(() => import("./pages/BacteriostaticWater"));
const ShopAll = lazy(() => import("./pages/ShopAll"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <SmoothScrollProvider>
          <Toaster />
          <Sonner />
          <Analytics />
          <BrowserRouter>
            <ScrollToTop />
            <ErrorBoundary>
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                {/* Home page - peptide catalog */}
                <Route path="/" element={<Index />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

                {/* Core pages */}
                <Route path="/shop" element={<ShopAll />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/foundry-club" element={<FoundryClub />} />

                {/* Legal pages */}
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/refund-policy" element={<RefundPolicy />} />
                <Route path="/shipping-policy" element={<ShippingPolicy />} />

                {/* Dashboard pages */}
                <Route path="/dashboard" element={<DashboardIndex />} />
                <Route path="/dashboard/orders" element={<DashboardOrders />} />
                <Route path="/dashboard/calculator" element={<DashboardCalculator />} />
                <Route path="/dashboard/membership" element={<DashboardMembership />} />
                <Route path="/dashboard/research-briefs" element={<DashboardResearchBriefs />} />
                <Route path="/dashboard/research-audit" element={<DashboardResearchAudit />} />
                <Route path="/dashboard/documents" element={<DashboardDocuments />} />
                <Route path="/dashboard/settings" element={<DashboardSettings />} />

                {/* Category pages */}
                <Route path="/build-muscle" element={<BuildMuscle />} />
                <Route path="/lose-fat" element={<LoseFat />} />
                <Route path="/recovery" element={<Recovery />} />
                <Route path="/libido" element={<Libido />} />
                <Route path="/anti-aging" element={<AntiAging />} />

                {/* Peptide pages */}
                <Route path="/bpc-157" element={<BPC157 />} />
                <Route path="/tb-500" element={<TB500 />} />
                <Route path="/cjc-1295-ipamorelin" element={<CJC1295Ipamorelin />} />
                <Route path="/melanotan-2" element={<Melanotan2 />} />
                <Route path="/epithalon" element={<Epithalon />} />
                <Route path="/bpc-157-tb-500" element={<BPC157TB500 />} />
                <Route path="/glow" element={<GLOW />} />
                <Route path="/klow" element={<KLOW />} />
                <Route path="/ipamorelin" element={<Ipamorelin />} />
                <Route path="/igf-1-lr3" element={<IGF1LR3 />} />
                <Route path="/tesamorelin" element={<Tesamorelin />} />
                <Route path="/sermorelin" element={<Sermorelin />} />
                <Route path="/aod-9604" element={<AOD9604 />} />
                <Route path="/cagrilintide" element={<Cagrilintide />} />
                <Route path="/retatrutide" element={<GLP3RT />} />
                <Route path="/mots-c" element={<MOTSC />} />
                <Route path="/dsip" element={<DSIP />} />
                <Route path="/ghk-cu" element={<GHKCu />} />
                <Route path="/selank" element={<Selank />} />
                <Route path="/semax" element={<Semax />} />
                <Route path="/nad-buffered" element={<NADBuffered />} />
                <Route path="/glutathione" element={<Glutathione />} />
                <Route path="/pt-141" element={<PT141 />} />
                <Route path="/glp-1sg" element={<GLP1SG />} />
                <Route path="/glp-1tz" element={<GLP1TZ />} />
                <Route path="/tesamorelin-ipamorelin" element={<TesamorelinIpamorelin />} />

                {/* Admin pages */}
                <Route path="/admin" element={<AdminIndex />} />
                <Route path="/admin/sales" element={<AdminSales />} />
                <Route path="/admin/orders" element={<AdminOrders />} />
                <Route path="/admin/inventory" element={<AdminInventory />} />
                <Route path="/admin/activity" element={<AdminActivity />} />
                <Route path="/admin/memberships" element={<AdminMemberships />} />

                {/* Supplies */}
                <Route path="/bacteriostatic-water" element={<BacteriostaticWater />} />

                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </BrowserRouter>
        </SmoothScrollProvider>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
