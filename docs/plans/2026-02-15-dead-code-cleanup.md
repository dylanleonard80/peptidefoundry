# Dead Code Cleanup Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remove ~35 unused files, 6 dead Edge Functions, and ~15 npm packages from the codebase without breaking the build.

**Architecture:** Batched deletion with `npm run build` verification after each batch. Files identified via exhaustive import-path analysis. Git-reversible at every step.

**Tech Stack:** React/TypeScript, Supabase Edge Functions, npm

---

### Task 1: Ensure Clean Git State

**Files:** None

**Step 1: Check git status**

Run: `git status`
Expected: Working tree clean (or only untracked files like `.claude/settings.json`)

**Step 2: If uncommitted changes exist, stash them**

Run: `git stash` (only if needed)

**Step 3: Verify build passes before any changes**

Run: `npm run build`
Expected: Build succeeds (large chunk warning ~939KB is normal and expected)

---

### Task 2: Delete Unused Components (14 files)

**Files:**
- Delete: `src/components/Newsletter.tsx`
- Delete: `src/components/FoundryClubSection.tsx`
- Delete: `src/components/Features.tsx`
- Delete: `src/components/CTA.tsx`
- Delete: `src/components/MadeByHumans.tsx`
- Delete: `src/components/PeptideJourneySection.tsx`
- Delete: `src/components/CursorSparkles.tsx`
- Delete: `src/components/HumanoidSection.tsx`
- Delete: `src/components/HowItWorks.tsx`
- Delete: `src/components/TermsContent.tsx`
- Delete: `src/components/AccessGate.tsx`
- Delete: `src/components/landing/TrustBadgeBar.tsx`
- Delete: `src/components/landing/ProcessTimeline.tsx`
- Delete: `src/components/landing/StickyCTA.tsx`

**Step 1: Delete all 14 files**

```bash
rm src/components/Newsletter.tsx \
   src/components/FoundryClubSection.tsx \
   src/components/Features.tsx \
   src/components/CTA.tsx \
   src/components/MadeByHumans.tsx \
   src/components/PeptideJourneySection.tsx \
   src/components/CursorSparkles.tsx \
   src/components/HumanoidSection.tsx \
   src/components/HowItWorks.tsx \
   src/components/TermsContent.tsx \
   src/components/AccessGate.tsx \
   src/components/landing/TrustBadgeBar.tsx \
   src/components/landing/ProcessTimeline.tsx \
   src/components/landing/StickyCTA.tsx
```

**Step 2: Check if landing/ directory is now empty; if so, remove it**

```bash
rmdir src/components/landing/ 2>/dev/null || true
```

**Step 3: Build-verify**

Run: `npm run build`
Expected: PASS. If any file was actually imported somewhere, the build will fail with a "module not found" error — investigate and restore that file.

**Step 4: Commit**

```bash
git add -A && git commit -m "chore: remove 14 unused component files"
```

---

### Task 3: Delete Unused shadcn/ui Primitives (17 files)

**Files:**
- Delete: `src/components/ui/aspect-ratio.tsx`
- Delete: `src/components/ui/pagination.tsx`
- Delete: `src/components/ui/input-otp.tsx`
- Delete: `src/components/ui/hover-card.tsx`
- Delete: `src/components/ui/resizable.tsx`
- Delete: `src/components/ui/navigation-menu.tsx`
- Delete: `src/components/ui/drawer.tsx`
- Delete: `src/components/ui/calendar.tsx`
- Delete: `src/components/ui/breadcrumb.tsx`
- Delete: `src/components/ui/command.tsx`
- Delete: `src/components/ui/menubar.tsx`
- Delete: `src/components/ui/context-menu.tsx`
- Delete: `src/components/ui/background-paths.tsx`
- Delete: `src/components/ui/slider.tsx`
- Delete: `src/components/ui/radio-group.tsx`
- Delete: `src/components/ui/toggle.tsx`
- Delete: `src/components/ui/toggle-group.tsx`

**Step 1: Delete all 17 files**

```bash
rm src/components/ui/aspect-ratio.tsx \
   src/components/ui/pagination.tsx \
   src/components/ui/input-otp.tsx \
   src/components/ui/hover-card.tsx \
   src/components/ui/resizable.tsx \
   src/components/ui/navigation-menu.tsx \
   src/components/ui/drawer.tsx \
   src/components/ui/calendar.tsx \
   src/components/ui/breadcrumb.tsx \
   src/components/ui/command.tsx \
   src/components/ui/menubar.tsx \
   src/components/ui/context-menu.tsx \
   src/components/ui/background-paths.tsx \
   src/components/ui/slider.tsx \
   src/components/ui/radio-group.tsx \
   src/components/ui/toggle.tsx \
   src/components/ui/toggle-group.tsx
```

**Step 2: Build-verify**

Run: `npm run build`
Expected: PASS. If any UI primitive was imported by a feature component, the build will fail — restore that file and remove it from the deletion list.

**Step 3: Commit**

```bash
git add -A && git commit -m "chore: remove 17 unused shadcn/ui primitives"
```

---

### Task 4: Delete Unused Data & Pages (2 files)

**Files:**
- Delete: `src/data/peptideBlends.ts`
- Delete: `src/pages/FAQ.tsx`

**Step 1: Delete both files**

```bash
rm src/data/peptideBlends.ts src/pages/FAQ.tsx
```

**Step 2: Build-verify**

Run: `npm run build`
Expected: PASS.

**Step 3: Commit**

```bash
git add -A && git commit -m "chore: remove unused peptideBlends data and unrouted FAQ page"
```

---

### Task 5: Delete Dead Stripe Edge Functions (6 functions)

**Files:**
- Delete: `supabase/functions/check-membership/`
- Delete: `supabase/functions/create-membership-checkout/`
- Delete: `supabase/functions/create-order-checkout/`
- Delete: `supabase/functions/create-payment-intent/`
- Delete: `supabase/functions/customer-portal/`
- Delete: `supabase/functions/verify-order-payment/`

**Step 1: Delete the function directories from the repo**

```bash
rm -rf supabase/functions/check-membership \
       supabase/functions/create-membership-checkout \
       supabase/functions/create-order-checkout \
       supabase/functions/create-payment-intent \
       supabase/functions/customer-portal \
       supabase/functions/verify-order-payment
```

**Step 2: Build-verify**

Run: `npm run build`
Expected: PASS (Edge Functions are not part of the frontend build, but verify anyway).

**Step 3: Undeploy from Supabase**

Use the Supabase MCP tools to list Edge Functions on project `lxkgqglqrmtpinxqsztc`, then delete each of the 6 Stripe-related functions. Note: Supabase MCP may not have a delete-edge-function tool — if not, flag for manual deletion via Supabase dashboard.

**Step 4: Commit**

```bash
git add -A && git commit -m "chore: remove 6 dead Stripe Edge Functions"
```

---

### Task 6: Uninstall Unused npm Packages (15 packages)

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`

**Step 1: Uninstall all packages in one command**

```bash
npm uninstall @radix-ui/react-aspect-ratio \
              @radix-ui/react-hover-card \
              @radix-ui/react-navigation-menu \
              @radix-ui/react-menubar \
              @radix-ui/react-context-menu \
              @radix-ui/react-slider \
              @radix-ui/react-toggle \
              @radix-ui/react-toggle-group \
              @radix-ui/react-radio-group \
              input-otp \
              react-resizable-panels \
              vaul \
              react-day-picker \
              cmdk \
              date-fns-tz
```

**Step 2: Build-verify**

Run: `npm run build`
Expected: PASS. If any package is still needed as a transitive dependency, the build will fail — reinstall that specific package.

**Step 3: Commit**

```bash
git add package.json package-lock.json && git commit -m "chore: uninstall 15 unused npm packages"
```

---

### Task 7: Final Verification

**Step 1: Full build**

Run: `npm run build`
Expected: PASS with chunk size similar to or smaller than before (~939KB or less).

**Step 2: Dev server smoke test**

Run: `npm run dev`
Expected: Server starts on port 8080 without errors.

**Step 3: Verify git log shows all cleanup commits**

Run: `git log --oneline -6`
Expected: 5 cleanup commits in order.
