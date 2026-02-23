-- Add tax column to orders for TaxJar sales tax tracking
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS tax numeric(10,2) NOT NULL DEFAULT 0;
