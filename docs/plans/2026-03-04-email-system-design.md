# Email System Design
**Date:** 2026-03-04
**Status:** Approved

## Overview

Transactional email system for Peptide Foundry using Resend. Sends branded HTML emails for order lifecycle events, new user welcome, and Foundry Club membership activation.

## Email Provider

- **Service:** Resend
- **Sending domain:** `orders.peptidefoundry.com` (DNS verified on GoDaddy)
- **From address:** `orders@orders.peptidefoundry.com`
- **Reply-to:** `support@peptidefoundry.com`
- **API key secret:** `RESEND_API_KEY` (set in Supabase project secrets)

## Emails

| Email | Trigger | Data source |
|---|---|---|
| Order confirmation | `capture-paypal-order` — after DB insert | order row + `profiles` |
| Order shipped | `purchase-shipping-label` — after label purchased | order row + `profiles` + Shippo response |
| Order delivered | `shippo-webhook` — when `trackingStatus === "DELIVERED"` | order row + `profiles` |
| Welcome | DB webhook on `profiles` INSERT | webhook payload (has `email`, `first_name`) |
| Foundry Club welcome | `paypal-webhook` — on subscription activation | subscription data + `profiles` |

## Architecture

### Shared module
`supabase/functions/_shared/emails.ts`
- Initializes Resend client with `RESEND_API_KEY`
- Exports typed send functions: `sendOrderConfirmation`, `sendOrderShipped`, `sendOrderDelivered`, `sendWelcome`, `sendMembershipWelcome`
- Each function accepts typed data, builds HTML template, calls Resend API
- Templates: plain HTML string literals (no React Email — Deno incompatible)

### New Edge Function
`supabase/functions/send-welcome-email/index.ts`
- Handles Supabase Database Webhook POST on `profiles` INSERT
- Extracts `first_name` and `email` from webhook payload
- Calls `sendWelcome()`

### Modified Edge Functions
- `capture-paypal-order` — add `sendOrderConfirmation()` after order insert
- `purchase-shipping-label` — add `sendOrderShipped()` after label purchased
- `shippo-webhook` — add `sendOrderDelivered()` after status update
- `paypal-webhook` — add `sendMembershipWelcome()` on subscription activation

## Data Flow

All functions fetch customer data from `profiles` table:
```sql
SELECT first_name, email FROM profiles WHERE id = user_id
```
The `handle_new_user` DB trigger populates `profiles.email` at signup, so this is always reliable.

For the welcome email, the DB webhook payload contains the new `profiles` row directly — no extra query needed.

## Email Design

All emails share:
- Burnt orange header bar (`hsl(24, 72%, 50%)`)
- Logo centered in header
- Cream background (`hsl(30, 25%, 97%)`)
- Playfair Display headings
- Charcoal body text (`hsl(25, 15%, 12%)`)
- Gold CTA buttons (`#D4A84B`)
- Footer with RUO disclaimer and support email

### Template content

**Order Confirmation**
- Order number, thank you message
- Itemized table: name, size, qty, unit price
- Subtotal / shipping / tax / discount / total
- Shipping address
- CTA: "View Your Order" → order history dashboard

**Order Shipped**
- Tracking number + carrier
- CTA: "Track Your Package" → carrier tracking URL
- Estimated delivery if available
- Order number for reference

**Order Delivered**
- Warm "your order arrived" message
- Order number
- CTA: "Shop Again" → catalog

**Welcome**
- Brand intro, warm welcome
- RUO research disclaimer
- CTA: "Browse the Catalog"
- Mention of Foundry Club

**Foundry Club Welcome**
- Congratulations message
- Member benefits summary (discount pricing, priority access)
- CTA: "Shop as a Member" → catalog

## Error Handling

Email failures are always caught and logged but never throw — they must not disrupt payment, shipping, or auth flows. Pattern in every function:

```typescript
try {
  await sendOrderConfirmation(data);
} catch (emailErr) {
  logStep("Warning: Failed to send confirmation email", { error: emailErr.message });
}
```

## Supabase Database Webhook Setup

- Table: `public.profiles`
- Event: `INSERT`
- Target URL: `{SUPABASE_URL}/functions/v1/send-welcome-email`
- Must include `Authorization: Bearer {SUPABASE_ANON_KEY}` header
- Configured in: Supabase Dashboard → Database → Webhooks

## Environment Variables

| Secret | Value |
|---|---|
| `RESEND_API_KEY` | Set — Resend API key for `orders.peptidefoundry.com` |
