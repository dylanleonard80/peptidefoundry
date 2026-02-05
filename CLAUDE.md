# Peptide Foundry - Claude Code Context

## Project Overview
E-commerce platform for research peptides with a premium membership tier (Foundry Club). Built with React + TypeScript + Supabase.

## Tech Stack
- **Frontend:** React 18.3, TypeScript 5.5, Vite 5.4
- **Styling:** Tailwind CSS + shadcn/ui (Radix primitives)
- **State:** React Context (CartContext) + React Query
- **Routing:** React Router DOM 6
- **Backend:** Supabase (PostgreSQL + Auth + Edge Functions)
- **Payments:** Stripe
- **Animations:** Framer Motion, Lenis (smooth scroll)

## Project Structure
```
src/
├── components/       # Reusable components
│   ├── ui/          # shadcn/ui primitives (Button, Input, Sheet, etc.)
│   └── *.tsx        # Feature components (Navbar, Cart, PeptidesCatalog)
├── pages/           # Route pages
│   ├── dashboard/   # User dashboard pages
│   └── *.tsx        # Peptide pages, auth pages, etc.
├── contexts/        # React Context providers
├── hooks/           # Custom hooks (useAuth, useMembership, useCart)
├── data/            # Static data (peptides.ts, priceData.ts)
├── integrations/    # Supabase client setup
└── lib/             # Utilities (cn helper)

supabase/
├── functions/       # Edge Functions (serverless)
└── migrations/      # Database schema
```

## Key Files
| File | Purpose |
|------|---------|
| `src/contexts/CartContext.tsx` | Cart state, localStorage + Supabase sync |
| `src/hooks/useAuth.tsx` | Authentication, user profile |
| `src/hooks/useMembership.tsx` | Membership status, pricing (24hr cache) |
| `src/data/priceData.ts` | Centralized pricing (regular + member) |
| `src/data/peptides.ts` | Peptide catalog data |
| `src/components/Navbar.tsx` | Main navigation (desktop + mobile) |
| `src/components/Cart.tsx` | Shopping cart Sheet |

## Commands
```bash
npm run dev      # Start dev server (port 8080)
npm run build    # Production build
npm run lint     # ESLint
```

## Coding Patterns

### Imports - Use Path Aliases
```tsx
// Good
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

// Bad
import { Button } from "../../../components/ui/button";
```

### Styling - Tailwind + cn()
```tsx
import { cn } from "@/lib/utils";

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  className
)}>
```

### Mobile Responsiveness
```tsx
// Hide on mobile, show on desktop
className="hidden md:block"

// Show on mobile, hide on desktop
className="md:hidden"
```

### Component Structure
- UI primitives in `/components/ui/` (shadcn pattern)
- Feature components as standalone files
- Pages handle data fetching, components handle display

## Database Tables (Supabase)
- `profiles` - User info (name, email, address)
- `carts` - Shopping cart items (JSON)
- `orders` - Order history
- `health_profiles` - User health data
- `applications` - Membership applications
- `user_roles` - Role assignments (admin/provider/patient)

## Business Logic

### Pricing
- Regular prices in `peptidePrices` object
- Member prices in `memberPrices` object (~23% discount)
- Use `getPrices(slug)` and `getMemberPriceBySlug(slug, size)`

### Membership
- `useMembership()` returns `{ isMember, isLoading, ... }`
- 24-hour localStorage cache to reduce API calls
- Stripe subscription managed via Edge Functions

### Cart
- Anonymous: localStorage only
- Logged in: Synced with Supabase `carts` table
- Merges local cart on login

## Design System

### Colors (CSS Variables)
- Primary: Burnt orange `hsl(24, 72%, 50%)`
- Background: Warm cream `hsl(30, 25%, 97%)`
- Charcoal (dark): `hsl(25, 15%, 12%)`
- Gold accent: `#D4A84B`

### Fonts
- Sans: System default (Helvetica Neue)
- Serif/Display: Playfair Display
- Custom: Brockmann

### Common Classes
- `.glass-card` - Frosted glass effect
- `.card-organic` - Soft shadow card
- `.nav-link` - Navigation link with underline animation

## Mobile Considerations
- Short logo on mobile (`/short-logo.svg`), full logo on desktop
- Mobile nav has: Search, Account, Cart, Menu icons
- Search dropdown slides down below header
- Hamburger menu for full navigation

## Edge Functions
Located in `supabase/functions/`:
- `check-membership` - Verify membership status
- `create-membership-checkout` - Stripe checkout for membership
- `create-order-checkout` - Stripe checkout for orders
- `verify-order-payment` - Confirm payment success
- `customer-portal` - Stripe customer portal

## Common Issues & Solutions

### Cart not syncing
- Check `CartContext.tsx` - uses refs to prevent race conditions
- Verify Supabase auth state before sync

### Membership not showing
- Check 24hr cache in localStorage (`membership_cache`)
- Clear cache or wait for expiry

### Build warnings
- Large chunk warning is expected (900KB+ main bundle)
- Could add code-splitting for peptide pages if needed

## Don't Do
- Don't modify shadcn/ui primitives directly - extend via className
- Don't add prices outside priceData.ts
- Don't skip TypeScript types
- Don't use relative imports when @/ alias works
