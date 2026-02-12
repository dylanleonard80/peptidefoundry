-- Prevent duplicate orders from the same payment
-- First, handle any existing duplicates (keep the earliest)
DELETE FROM orders a USING orders b
WHERE a.id > b.id
AND a.stripe_payment_id IS NOT NULL
AND a.stripe_payment_id = b.stripe_payment_id;

-- Add unique constraint
ALTER TABLE orders ADD CONSTRAINT orders_stripe_payment_id_unique UNIQUE (stripe_payment_id);
