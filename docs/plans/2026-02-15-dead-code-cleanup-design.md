# Dead Code Cleanup Design

Date: 2026-02-15

## Goal

Remove all unused code from the Peptide Foundry codebase — components, UI primitives, data files, pages, Stripe Edge Functions, and npm packages — without breaking anything.

## Approach

Batched deletion with build verification after each batch. Files were identified via exhaustive import-path analysis (96 tool calls across the full codebase).

## Batch 1 — Unused Components (14 files)

Zero imports found for any of these:

- `src/components/Newsletter.tsx`
- `src/components/FoundryClubSection.tsx`
- `src/components/Features.tsx`
- `src/components/CTA.tsx`
- `src/components/MadeByHumans.tsx`
- `src/components/PeptideJourneySection.tsx`
- `src/components/CursorSparkles.tsx`
- `src/components/HumanoidSection.tsx`
- `src/components/HowItWorks.tsx`
- `src/components/TermsContent.tsx`
- `src/components/AccessGate.tsx`
- `src/components/landing/TrustBadgeBar.tsx`
- `src/components/landing/ProcessTimeline.tsx`
- `src/components/landing/StickyCTA.tsx`

Build-verify after deletion.

## Batch 2 — Unused shadcn/ui Primitives (~17 files)

Scaffolded but never used by any feature component:

- `src/components/ui/aspect-ratio.tsx`
- `src/components/ui/pagination.tsx`
- `src/components/ui/input-otp.tsx`
- `src/components/ui/hover-card.tsx`
- `src/components/ui/resizable.tsx`
- `src/components/ui/navigation-menu.tsx`
- `src/components/ui/drawer.tsx`
- `src/components/ui/calendar.tsx`
- `src/components/ui/breadcrumb.tsx`
- `src/components/ui/command.tsx`
- `src/components/ui/menubar.tsx`
- `src/components/ui/context-menu.tsx`
- `src/components/ui/background-paths.tsx`
- `src/components/ui/slider.tsx`
- `src/components/ui/radio-group.tsx`
- `src/components/ui/toggle.tsx`
- `src/components/ui/toggle-group.tsx`

Build-verify after deletion.

## Batch 3 — Unused Data & Pages (2 files)

- `src/data/peptideBlends.ts` — replaced by `blendPageData.ts`, zero imports
- `src/pages/FAQ.tsx` — not wired into router, decision: remove

Build-verify after deletion.

## Batch 4 — Dead Stripe Edge Functions (6 functions)

All unused since PayPal migration. Delete from repo AND undeploy from Supabase project `lxkgqglqrmtpinxqsztc`:

- `supabase/functions/check-membership/`
- `supabase/functions/create-membership-checkout/`
- `supabase/functions/create-order-checkout/`
- `supabase/functions/create-payment-intent/`
- `supabase/functions/customer-portal/`
- `supabase/functions/verify-order-payment/`

## Batch 5 — npm Package Cleanup

Uninstall packages tied to deleted components:

```
@radix-ui/react-aspect-ratio
@radix-ui/react-hover-card
@radix-ui/react-navigation-menu
@radix-ui/react-menubar
@radix-ui/react-context-menu
@radix-ui/react-slider
@radix-ui/react-toggle
@radix-ui/react-toggle-group
@radix-ui/react-radio-group
input-otp
react-resizable-panels
vaul
react-day-picker
cmdk
date-fns-tz
```

Build-verify after uninstall.

## Safety

- Clean git state before starting (commit or stash any changes)
- `npm run build` after every batch
- If a batch fails build, investigate before proceeding
- All deletions are git-reversible

## Estimated Impact

- ~35 files deleted
- ~2,500-3,500 lines removed
- ~15 npm packages uninstalled
- 6 Edge Functions undeployed
