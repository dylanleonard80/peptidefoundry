-- Fix: Drop the RESTRICTIVE RLS policy that blocks ALL order reads.
-- The "Deny anonymous access to orders" policy (TO anon) already correctly
-- blocks the anon role. This "Deny public access" policy defaults to TO PUBLIC
-- (all roles), and as a RESTRICTIVE policy with USING(false) it unconditionally
-- blocks ALL reads — nullifying every permissive SELECT policy on the table.
DROP POLICY IF EXISTS "Deny public access to orders" ON public.orders;
