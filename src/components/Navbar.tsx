import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, User, LogOut, Search, Hexagon, LayoutDashboard, Package, FileText, Settings, Heart, Calculator } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useMembership } from "@/hooks/useMembership";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Cart } from "./Cart";
import { Input } from "./ui/input";
import { peptideSections } from "@/data/peptides";
import FoundryClubLink from "./FoundryClubLink";
import { StarButton } from "@/components/ui/star-button";
const Navbar = ({
  className
}: {
  className?: string;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const {
    user,
    profile,
    signOut
  } = useAuth();
  const {
    isMember
  } = useMembership();

  // Flatten all peptides for search and remove duplicates
  const allPeptides = peptideSections.flatMap(section => section.cards.map(card => ({
    ...card,
    category: section.title
  })));

  // Remove duplicates by slug
  const uniquePeptides = Array.from(new Map(allPeptides.map(p => [p.slug, p])).values());

  // Filter peptides based on search query
  const filteredPeptides = searchQuery.length > 0 ? uniquePeptides.filter(peptide => peptide.name.toLowerCase().includes(searchQuery.toLowerCase()) || peptide.benefit.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 8) : [];
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = '';
    }
  };
  const isFoundryClubPage = location.pathname === '/foundry-club';
  const isHomePage = location.pathname === '/';
  const isDarkHero = isFoundryClubPage;
  return <>
      {/* Foundry Club indicator bar */}
      {isFoundryClubPage && <div className="fixed top-0 left-0 right-0 z-[60] bg-charcoal border-b border-primary/20">
          <div className="flex items-center justify-center gap-2 py-1.5 text-xs text-white/80">
            <Hexagon className="h-3 w-3 text-primary" />
            <span>You're viewing: <span className="text-primary font-medium">The Foundry Club</span></span>
          </div>
        </div>}
      <header className={cn("fixed left-0 right-0 z-40 py-2 sm:py-3 md:py-4 transition-all duration-500", isFoundryClubPage ? "top-[28px]" : "top-0", isScrolled || isHomePage ? isFoundryClubPage ? "bg-charcoal/95 backdrop-blur-md shadow-lg shadow-black/20" : "bg-[hsl(30,25%,97%)]/90 backdrop-blur-md shadow-sm shadow-charcoal/5" : "bg-transparent", className)}>
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 my-[9px]">
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0 min-w-0" onClick={scrollToTop} aria-label="Peptide Foundry">
            {/* Short logo for mobile */}
            <img alt="Peptide Foundry Logo" width={40} height={40} className="h-10 w-auto object-contain md:hidden" src="/short-logo.svg" />
            {/* Full logo for desktop */}
            <img alt="Peptide Foundry Logo" width={140} height={56} className="hidden md:block h-[clamp(1.75rem,3.5vw,3rem)] w-auto object-contain" src="/lovable-uploads/da75d4b2-0e0d-4998-a153-a60a0882d732.webp" />
          </Link>

          {/* Search Bar - Desktop & Tablet */}
          <div className="hidden md:block flex-1 max-w-xs lg:max-w-md mx-2 lg:mx-8 relative">
            <div className="relative">
              <Search className={cn("absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4", isDarkHero ? "text-white/60" : "text-charcoal-light")} />
              <Input type="text" placeholder="Search peptides..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onFocus={() => setSearchOpen(true)} onBlur={() => setTimeout(() => setSearchOpen(false), 200)} className={cn("w-full pl-10 pr-4 transition-colors", isDarkHero ? "bg-white/15 border-white/30 text-white placeholder:text-white/60 focus:bg-white/25 focus:border-primary/30" : "bg-white/60 border-stone-warm focus:bg-white focus:border-primary/30")} />
            </div>
            {filteredPeptides.length > 0 && searchOpen && <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-stone-warm rounded-xl shadow-lg shadow-charcoal/5 max-h-96 overflow-y-auto z-50">
                {filteredPeptides.map(peptide => <button key={peptide.slug} onClick={() => {
              navigate(`/${peptide.slug}`);
              setSearchQuery("");
              setSearchOpen(false);
            }} className="w-full text-left px-4 py-3 hover:bg-stone-light border-b border-stone-warm/50 last:border-b-0 transition-colors">
                    <div className="font-medium text-charcoal">{peptide.name}</div>
                    <div className="text-sm text-charcoal-light">{peptide.benefit}</div>
                  </button>)}
              </div>}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center flex-shrink-0 space-x-2 lg:space-x-4 xl:space-x-8">
            <Link to="/" className={cn("nav-link whitespace-nowrap text-sm lg:text-base", location.pathname === "/" && !isDarkHero && "text-primary font-semibold", isDarkHero && "text-white hover:text-white/80 font-semibold")}>
              Home
            </Link>

            <Link to="/shop" className={cn("nav-link whitespace-nowrap text-sm lg:text-base", location.pathname === "/shop" && !isDarkHero && "text-primary font-semibold", isDarkHero && "text-white hover:text-white/80")}>
              Shop All
            </Link>

            <Link to="/about" className={cn("nav-link whitespace-nowrap text-sm lg:text-base", location.pathname === "/about" && !isDarkHero && "text-primary font-semibold", isDarkHero && "text-white hover:text-white/80")}>
              About
            </Link>
            <Link to="/contact" className={cn("nav-link whitespace-nowrap text-sm lg:text-base", location.pathname === "/contact" && !isDarkHero && "text-primary font-semibold", isDarkHero && "text-white hover:text-white/80")}>
              Contact
            </Link>
            
            {/* Premium Foundry Club nav item */}
            {isFoundryClubPage ? <div className="flex items-center gap-1 lg:gap-1.5 px-2 lg:px-3 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-primary font-semibold shadow-[0_0_12px_hsl(var(--primary)/0.5)] whitespace-nowrap text-sm lg:text-base">
                <Hexagon className="h-3.5 w-3.5 lg:h-4 lg:w-4 drop-shadow-[0_0_4px_hsl(var(--primary)/0.6)]" />
                Foundry Club
              </div> : <FoundryClubLink className="flex items-center gap-1 lg:gap-1.5 px-2 lg:px-3 py-1.5 rounded-full bg-charcoal border border-primary/40 text-primary font-medium hover:bg-charcoal/80 transition-all shadow-[0_0_12px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_16px_hsl(var(--primary)/0.6)] whitespace-nowrap text-sm lg:text-base">
                <Hexagon className="h-3.5 w-3.5 lg:h-4 lg:w-4 drop-shadow-[0_0_4px_hsl(var(--primary)/0.6)]" />
                Foundry Club
              </FoundryClubLink>}

            {/* Cart */}
            <Cart isFoundryClubPage={isFoundryClubPage} isDarkHero={isDarkHero} />

            {/* Account Button */}
            {user ? <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className={cn("flex items-center gap-1.5 lg:gap-2 max-w-[140px] lg:max-w-[180px]", isMember && "bg-charcoal border-primary/50 text-primary hover:bg-charcoal/90 hover:text-primary shadow-[0_0_12px_hsl(var(--primary)/0.4)]")}>
                    {isMember ? <Hexagon className="h-4 w-4 flex-shrink-0 drop-shadow-[0_0_4px_hsl(var(--primary)/0.8)]" /> : <User className="h-4 w-4 flex-shrink-0" />}
                    <span className="truncate text-sm">
                      {profile?.first_name?.trim() || (user.user_metadata as any)?.first_name?.trim() || user.email?.split("@")[0] || 'Account'}
                    </span>
                    {isMember && <span className="text-[10px] font-semibold opacity-80 flex-shrink-0 hidden lg:inline">Member</span>}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="flex items-center gap-2">
                    My Account
                    {isMember && <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center gap-1">
                        <Hexagon className="h-3 w-3" />
                        Member
                      </span>}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/dashboard/orders')}>
                    <Package className="h-4 w-4 mr-2" />
                    Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/dashboard/calculator')}>
                    <Calculator className="h-4 w-4 mr-2" />
                    Peptide Calculator
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/dashboard/membership')}>
                    <Hexagon className="h-4 w-4 mr-2" />
                    Foundry Club
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/dashboard/documents')}>
                    <FileText className="h-4 w-4 mr-2" />
                    Documents
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/dashboard/settings')}>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="text-destructive focus:text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> : <Link to="/sign-in">
                <Button variant="outline" size="sm" className={cn("flex items-center gap-2", isDarkHero && "bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white")}>
                  <User className="h-4 w-4" />
                  <span className="text-sm">Sign In</span>
                </Button>
              </Link>}
          </nav>

          {/* Mobile icons */}
          <div className="md:hidden flex items-center gap-1">
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              className={cn("relative", isDarkHero && "text-white hover:bg-white/10")}
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Account */}
            <Link to={user ? "/dashboard" : "/sign-in"}>
              <Button
                variant="ghost"
                size="icon"
                className={cn("relative", isDarkHero && "text-white hover:bg-white/10")}
                aria-label={user ? "Dashboard" : "Sign in"}
              >
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Cart */}
            <Cart isFoundryClubPage={isFoundryClubPage} isDarkHero={isDarkHero} />

            {/* Menu */}
            <button className={cn("p-2 focus:outline-none", isDarkHero ? "text-white" : "text-gray-700")} onClick={toggleMenu} aria-label={isMenuOpen ? "Close menu" : "Open menu"}>
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Search Dropdown */}
      <div className={cn(
        "fixed left-0 right-0 z-30 md:hidden bg-background/95 backdrop-blur-md border-b border-border shadow-lg transition-all duration-300",
        isFoundryClubPage ? "top-[92px]" : "top-[64px]",
        searchOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
      )}>
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search peptides..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 w-full h-11"
            />
          </div>
          {filteredPeptides.length > 0 && searchQuery.length > 0 && (
            <div className="mt-2 border rounded-lg max-h-64 overflow-y-auto bg-background">
              {filteredPeptides.map(peptide => (
                <button
                  key={peptide.slug}
                  onClick={() => {
                    navigate(`/${peptide.slug}`);
                    setSearchQuery("");
                    setSearchOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-muted/50 border-b last:border-b-0 transition-colors"
                >
                  <div className="font-medium">{peptide.name}</div>
                  <div className="text-sm text-muted-foreground line-clamp-1">{peptide.benefit}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={cn("fixed inset-0 z-[100] bg-white flex flex-col pt-6 px-6 md:hidden transition-all duration-300 ease-in-out", isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none")}>
        {/* Back/Close button */}
        <button onClick={toggleMenu} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 self-start">
          <X size={20} />
          <span className="text-sm font-medium">Close</span>
        </button>

        {/* Mobile Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input type="text" placeholder="Search peptides..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 pr-4 w-full py-3" />
          </div>
          {filteredPeptides.length > 0 && searchQuery.length > 0 && <div className="mt-2 border rounded-lg max-h-64 overflow-y-auto bg-white shadow-lg">
              {filteredPeptides.map(peptide => <button key={peptide.slug} onClick={() => {
            navigate(`/${peptide.slug}`);
            setSearchQuery("");
            setIsMenuOpen(false);
            document.body.style.overflow = '';
          }} className="w-full text-left px-4 py-3 hover:bg-muted/50 border-b last:border-b-0 transition-colors">
                  <div className="font-medium">{peptide.name}</div>
                  <div className="text-sm text-muted-foreground">{peptide.benefit}</div>
                </button>)}
            </div>}
        </div>

        <nav className="flex flex-col space-y-8 items-center mt-8 py-0 my-[6px]">
          <Link to="/" onClick={() => {
          setIsMenuOpen(false);
          document.body.style.overflow = '';
        }} className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100 my-0">
            Home
          </Link>
          <Link to="/shop" onClick={() => {
          setIsMenuOpen(false);
          document.body.style.overflow = '';
        }} className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100 my-[6px]">
            Shop All
          </Link>
          <Link to="/about" onClick={() => {
          setIsMenuOpen(false);
          document.body.style.overflow = '';
        }} className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100 my-[6px]">
            About
          </Link>
          <Link to="/contact" onClick={() => {
          setIsMenuOpen(false);
          document.body.style.overflow = '';
        }} className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100 my-[6px]">
            Contact
          </Link>
          <FoundryClubLink onClick={() => {
          setIsMenuOpen(false);
          document.body.style.overflow = '';
        }} className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg bg-charcoal border border-primary/40 my-[6px] flex items-center justify-center gap-2 text-primary shadow-[0_0_20px_hsl(var(--primary)/0.4)]">
            <Hexagon className="h-5 w-5 drop-shadow-[0_0_6px_hsl(var(--primary)/0.6)]" />
            Foundry Club
          </FoundryClubLink>

          {/* Mobile Account */}
          {user ? <>
              <Link to="/dashboard" onClick={() => {
            setIsMenuOpen(false);
            document.body.style.overflow = '';
          }} className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100 flex items-center justify-center gap-2">
                <LayoutDashboard className="h-5 w-5" />
                My Dashboard
                {isMember && <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs">
                    <Hexagon className="h-3 w-3" />
                  </span>}
              </Link>
              <button onClick={() => {
            signOut();
            setIsMenuOpen(false);
            document.body.style.overflow = '';
          }} className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100 text-destructive">
                Sign Out
              </button>
            </> : <Link to="/sign-in" onClick={() => {
            setIsMenuOpen(false);
            document.body.style.overflow = '';
          }} className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100 flex items-center justify-center gap-2">
                <User className="h-5 w-5" />
                Sign In
              </Link>}
        </nav>
      </div>
    </>;
};
export default Navbar;