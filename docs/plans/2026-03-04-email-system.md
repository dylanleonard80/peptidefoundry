# Email System Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Send branded transactional emails (order confirmation, shipped, delivered, welcome, membership welcome) via Resend from existing Supabase Edge Functions.

**Architecture:** A shared module `_shared/emails.ts` contains the Resend client and all five HTML email template functions. Each existing Edge Function imports and calls the relevant send function in a try/catch that never throws. A new `send-welcome-email` function handles a Supabase DB webhook on `profiles` INSERT.

**Tech Stack:** Resend (`npm:resend`), Supabase Edge Functions (Deno), HTML string templates, Supabase DB Webhooks.

---

## Context

- Resend API key already set as Supabase secret `RESEND_API_KEY`
- Sending domain: `orders.peptidefoundry.com` (DNS verified)
- From: `orders@orders.peptidefoundry.com` | Reply-to: `support@peptidefoundry.com`
- `profiles.email` is always populated at signup via `handle_new_user` DB trigger
- Email failures must NEVER throw — log and continue

---

### Task 1: Create shared emails module

**Files:**
- Create: `supabase/functions/_shared/emails.ts`

**Step 1: Create the file with all templates**

```typescript
// supabase/functions/_shared/emails.ts
import { Resend } from "npm:resend";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const FROM = "orders@orders.peptidefoundry.com";
const REPLY_TO = "support@peptidefoundry.com";
const SITE_URL = "https://peptidefoundry.com";
// Update LOGO_URL to your actual deployed logo path after verifying it exists
const LOGO_URL = "https://peptidefoundry.com/logo.svg";

function wrap(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${title}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&display=swap');
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;background:#F5F0E8;color:#1F1713}
    .wrapper{max-width:600px;margin:0 auto;background:#F5F0E8}
    .header{background:#C4581A;padding:28px 24px;text-align:center}
    .header img{max-height:44px;display:inline-block}
    .body{padding:40px 36px}
    h1{font-family:'Playfair Display',Georgia,'Times New Roman',serif;font-size:26px;font-weight:600;color:#1F1713;margin-bottom:20px;line-height:1.3}
    p{font-size:15px;line-height:1.65;color:#3D3029;margin-bottom:16px}
    .cta{display:inline-block;background:#D4A84B;color:#fff!important;padding:14px 32px;border-radius:4px;text-decoration:none;font-weight:600;font-size:15px;margin:8px 0 20px}
    table.items{width:100%;border-collapse:collapse;margin:20px 0}
    table.items th{background:#1F1713;color:#F5F0E8;padding:10px 12px;text-align:left;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:.05em}
    table.items td{padding:10px 12px;border-bottom:1px solid #E8E0D5;font-size:14px;color:#3D3029}
    table.items tr:last-child td{border-bottom:none}
    .totals{width:100%;margin:12px 0 24px}
    .totals td{padding:5px 0;font-size:14px;color:#3D3029}
    .totals td:last-child{text-align:right;font-weight:600}
    .totals tr.grand td{font-size:16px;color:#1F1713;border-top:2px solid #1F1713;padding-top:10px}
    .address-box{background:#EDE8DF;border-radius:6px;padding:16px 20px;margin:16px 0;font-size:14px;line-height:1.7;color:#3D3029}
    .tracking-box{background:#1F1713;border-radius:6px;padding:20px 24px;margin:20px 0;text-align:center}
    .tracking-box p{color:#F5F0E8;font-size:13px;margin-bottom:4px}
    .tracking-box .tn{color:#D4A84B;font-size:20px;font-weight:700;letter-spacing:.05em;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif}
    .footer{padding:24px 36px;border-top:1px solid #E0D8CC;text-align:center;font-size:12px;color:#9E8E80;line-height:1.6}
    .footer a{color:#C4581A;text-decoration:none}
  </style>
</head>
<body>
<div class="wrapper">
  <div class="header">
    <img src="${LOGO_URL}" alt="Peptide Foundry" />
  </div>
  <div class="body">
    ${body}
  </div>
  <div class="footer">
    <p><strong>Peptide Foundry</strong></p>
    <p style="margin-top:8px">All products are for <strong>Research Use Only (RUO)</strong>.<br>Not for human consumption, diagnostic, or therapeutic use.</p>
    <p style="margin-top:8px">Questions? <a href="mailto:support@peptidefoundry.com">support@peptidefoundry.com</a></p>
  </div>
</div>
</body>
</html>`;
}

// ── Order Confirmation ────────────────────────────────────────────────────────

export async function sendOrderConfirmation(data: {
  to: string;
  firstName: string;
  orderNumber: string;
  items: Array<{ name: string; size: string; quantity: number; price: number }>;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  shippingAddress: { street: string; city: string; state: string; zip: string };
}) {
  const itemRows = data.items.map(item => `
    <tr>
      <td>${item.name}</td>
      <td>${item.size}</td>
      <td style="text-align:center">${item.quantity}</td>
      <td style="text-align:right">$${item.price.toFixed(2)}</td>
    </tr>`).join("");

  const discountRow = data.discount > 0
    ? `<tr><td style="color:#C4581A">Discount</td><td style="text-align:right;color:#C4581A">-$${data.discount.toFixed(2)}</td></tr>`
    : "";

  const body = `
    <h1>Order Confirmed</h1>
    <p>Hi ${data.firstName || "there"},</p>
    <p>Thank you for your order. We've received it and it's being prepared for shipment. You'll get another email when it ships.</p>

    <p style="font-size:13px;color:#9E8E80;margin-bottom:4px">ORDER NUMBER</p>
    <p style="font-size:20px;font-weight:700;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#1F1713;margin-bottom:24px;letter-spacing:.05em">${data.orderNumber}</p>

    <table class="items">
      <thead><tr><th>Product</th><th>Size</th><th style="text-align:center">Qty</th><th style="text-align:right">Price</th></tr></thead>
      <tbody>${itemRows}</tbody>
    </table>

    <table class="totals">
      <tr><td>Subtotal</td><td>$${data.subtotal.toFixed(2)}</td></tr>
      ${discountRow}
      <tr><td>Shipping</td><td>$${data.shipping.toFixed(2)}</td></tr>
      <tr><td>Tax</td><td>$${data.tax.toFixed(2)}</td></tr>
      <tr class="grand"><td>Total</td><td>$${data.total.toFixed(2)}</td></tr>
    </table>

    <p style="font-size:13px;color:#9E8E80;margin-bottom:6px">SHIPPING TO</p>
    <div class="address-box">
      ${data.shippingAddress.street}<br>
      ${data.shippingAddress.city}, ${data.shippingAddress.state} ${data.shippingAddress.zip}
    </div>

    <a href="${SITE_URL}/dashboard/orders" class="cta">View Your Order</a>`;

  return resend.emails.send({
    from: FROM,
    reply_to: REPLY_TO,
    to: data.to,
    subject: `Order Confirmed — ${data.orderNumber}`,
    html: wrap("Order Confirmed", body),
  });
}

// ── Order Shipped ─────────────────────────────────────────────────────────────

export async function sendOrderShipped(data: {
  to: string;
  firstName: string;
  orderNumber: string;
  trackingNumber: string;
  carrier: string;
  trackingUrl?: string;
}) {
  const trackingLink = data.trackingUrl || `https://tools.usps.com/go/TrackConfirmAction?tLabels=${data.trackingNumber}`;

  const body = `
    <h1>Your Order Is On Its Way</h1>
    <p>Hi ${data.firstName || "there"},</p>
    <p>Great news — your order <strong>${data.orderNumber}</strong> has shipped via <strong>${data.carrier || "carrier"}</strong>.</p>

    <div class="tracking-box">
      <p>TRACKING NUMBER</p>
      <div class="tn">${data.trackingNumber}</div>
    </div>

    <a href="${trackingLink}" class="cta">Track Your Package</a>

    <p style="font-size:13px;color:#9E8E80;margin-top:8px">If the tracking link doesn't work for your carrier, visit your carrier's website and enter the tracking number above.</p>`;

  return resend.emails.send({
    from: FROM,
    reply_to: REPLY_TO,
    to: data.to,
    subject: `Your Order Has Shipped — ${data.orderNumber}`,
    html: wrap("Your Order Has Shipped", body),
  });
}

// ── Order Delivered ───────────────────────────────────────────────────────────

export async function sendOrderDelivered(data: {
  to: string;
  firstName: string;
  orderNumber: string;
}) {
  const body = `
    <h1>Your Order Has Arrived</h1>
    <p>Hi ${data.firstName || "there"},</p>
    <p>Your order <strong>${data.orderNumber}</strong> has been delivered. We hope everything arrived in perfect condition.</p>
    <p>If anything looks off or you have questions, don't hesitate to reach out — we're happy to help.</p>

    <a href="${SITE_URL}/catalog" class="cta">Shop Again</a>`;

  return resend.emails.send({
    from: FROM,
    reply_to: REPLY_TO,
    to: data.to,
    subject: `Your Order Has Been Delivered — ${data.orderNumber}`,
    html: wrap("Delivered", body),
  });
}

// ── Welcome ───────────────────────────────────────────────────────────────────

export async function sendWelcome(data: {
  to: string;
  firstName: string;
}) {
  const body = `
    <h1>Welcome to Peptide Foundry</h1>
    <p>Hi ${data.firstName || "there"},</p>
    <p>Your account is ready. We're glad to have you.</p>
    <p>Peptide Foundry offers a curated catalog of research-grade peptides for scientific and laboratory use. All products are for <strong>Research Use Only</strong> — not for human consumption.</p>
    <p>When you're ready, explore the full catalog. And if you're interested in member pricing and exclusive access, take a look at <strong>Foundry Club</strong> membership.</p>

    <a href="${SITE_URL}/catalog" class="cta">Browse the Catalog</a>`;

  return resend.emails.send({
    from: FROM,
    reply_to: REPLY_TO,
    to: data.to,
    subject: "Welcome to Peptide Foundry",
    html: wrap("Welcome", body),
  });
}

// ── Foundry Club Welcome ──────────────────────────────────────────────────────

export async function sendMembershipWelcome(data: {
  to: string;
  firstName: string;
}) {
  const body = `
    <h1>Welcome to Foundry Club</h1>
    <p>Hi ${data.firstName || "there"},</p>
    <p>Your Foundry Club membership is now active. Here's what you get:</p>
    <ul style="margin:16px 0 20px 20px;font-size:15px;line-height:2;color:#3D3029">
      <li>Member pricing on the full catalog (~23% discount)</li>
      <li>Priority access to new products</li>
      <li>Exclusive member-only offerings</li>
    </ul>
    <p>Member prices are applied automatically when you're signed in. Start shopping now.</p>

    <a href="${SITE_URL}/catalog" class="cta">Shop as a Member</a>`;

  return resend.emails.send({
    from: FROM,
    reply_to: REPLY_TO,
    to: data.to,
    subject: "Your Foundry Club Membership Is Active",
    html: wrap("Welcome to Foundry Club", body),
  });
}
```

**Step 2: Verify the logo URL**

Open your browser and visit `https://peptidefoundry.com/logo.svg`. If it doesn't load, find the correct public logo path in your site's `/public` folder and update `LOGO_URL` in `emails.ts`.

**Step 3: Deploy (no function to deploy — shared module is imported at build time)**

No deployment needed for this step. Proceed to Task 2.

---

### Task 2: Create send-welcome-email Edge Function

**Files:**
- Create: `supabase/functions/send-welcome-email/index.ts`

**Step 1: Create the function**

```typescript
// supabase/functions/send-welcome-email/index.ts
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { sendWelcome } from "../_shared/emails.ts";

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[SEND-WELCOME-EMAIL] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type" },
    });
  }

  try {
    const payload = await req.json();
    // Supabase DB webhook payload: { type, table, record, schema, old_record }
    const record = payload.record;

    if (!record?.email) {
      logStep("No email in record, skipping", { record });
      return new Response(JSON.stringify({ ok: true, skipped: true }), { status: 200 });
    }

    logStep("Sending welcome email", { email: record.email, firstName: record.first_name });

    await sendWelcome({
      to: record.email,
      firstName: record.first_name || "",
    });

    logStep("Welcome email sent", { email: record.email });

    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: msg });
    return new Response(JSON.stringify({ ok: false, error: msg }), {
      headers: { "Content-Type": "application/json" },
      status: 200, // Return 200 so Supabase doesn't retry
    });
  }
});
```

**Step 2: Deploy the function**

```bash
supabase functions deploy send-welcome-email --project-ref lxkgqglqrmtpinxqsztc
```

Expected: `Deployed Function send-welcome-email`

**Step 3: Commit**

```bash
git add supabase/functions/send-welcome-email/
git commit -m "feat: add send-welcome-email edge function"
```

---

### Task 3: Add order confirmation to capture-paypal-order

**Files:**
- Modify: `supabase/functions/capture-paypal-order/index.ts`

**Step 1: Add the import at the top of the file**

After the existing imports (after line 3), add:

```typescript
import { sendOrderConfirmation } from "../_shared/emails.ts";
```

**Step 2: Add the profile query + email send after the order is inserted**

Find this block (around line 349):
```typescript
logStep("Order created", { orderId: order.id, orderNumber });
```

Add the email send immediately after it:

```typescript
logStep("Order created", { orderId: order.id, orderNumber });

// Send order confirmation email
try {
  const { data: profile } = await supabaseClient
    .from('profiles')
    .select('email, first_name')
    .eq('id', userId)
    .maybeSingle();

  if (profile?.email) {
    await sendOrderConfirmation({
      to: profile.email,
      firstName: profile.first_name || "",
      orderNumber,
      items: orderItems.map(i => ({
        name: i.peptide_name,
        size: i.size,
        quantity: i.quantity,
        price: i.price,
      })),
      subtotal: Math.round(expectedSubtotal * 100) / 100,
      shipping: Math.round(shippingAmount * 100) / 100,
      tax: taxAmount,
      discount: Math.round(discountAmount * 100) / 100,
      total: Math.round(expectedTotal * 100) / 100,
      shippingAddress: {
        street: shippingAddress.street,
        city: shippingAddress.city,
        state: shippingAddress.state,
        zip: shippingAddress.zip,
      },
    });
    logStep("Order confirmation email sent", { email: profile.email });
  } else {
    logStep("Warning: No profile email found, skipping confirmation email", { userId });
  }
} catch (emailErr) {
  logStep("Warning: Failed to send order confirmation email", {
    error: emailErr instanceof Error ? emailErr.message : String(emailErr),
  });
}
```

**Step 3: Deploy**

```bash
supabase functions deploy capture-paypal-order --project-ref lxkgqglqrmtpinxqsztc
```

Expected: `Deployed Function capture-paypal-order`

**Step 4: Commit**

```bash
git add supabase/functions/capture-paypal-order/index.ts supabase/functions/_shared/emails.ts
git commit -m "feat: send order confirmation email on payment capture"
```

---

### Task 4: Add shipped email to purchase-shipping-label

**Files:**
- Modify: `supabase/functions/purchase-shipping-label/index.ts`

**Step 1: Add import after existing imports**

```typescript
import { sendOrderShipped } from "../_shared/emails.ts";
```

**Step 2: Add order + profile query before the Shippo label purchase**

Find this block (around line 44):
```typescript
const { orderId, rateId, carrier, serviceName } = await req.json();
if (!orderId || !rateId) throw new Error("Missing orderId or rateId");
```

Add the fetch after that line:

```typescript
const { orderId, rateId, carrier, serviceName } = await req.json();
if (!orderId || !rateId) throw new Error("Missing orderId or rateId");

// Fetch order to get user_id and order_number for email
const { data: orderForEmail } = await supabaseClient
  .from('orders')
  .select('user_id, order_number')
  .eq('id', orderId)
  .maybeSingle();
```

**Step 3: Add email send after the DB update succeeds**

Find this block (around line 105):
```typescript
logStep("Order updated to shipped", { orderId });
```

Add immediately after it:

```typescript
logStep("Order updated to shipped", { orderId });

// Send shipped email
try {
  if (orderForEmail?.user_id) {
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('email, first_name')
      .eq('id', orderForEmail.user_id)
      .maybeSingle();

    if (profile?.email) {
      await sendOrderShipped({
        to: profile.email,
        firstName: profile.first_name || "",
        orderNumber: orderForEmail.order_number,
        trackingNumber,
        carrier: carrier || txn.provider || "",
        trackingUrl: txn.tracking_url_provider || undefined,
      });
      logStep("Shipped email sent", { email: profile.email });
    }
  }
} catch (emailErr) {
  logStep("Warning: Failed to send shipped email", {
    error: emailErr instanceof Error ? emailErr.message : String(emailErr),
  });
}
```

**Step 4: Deploy**

```bash
supabase functions deploy purchase-shipping-label --project-ref lxkgqglqrmtpinxqsztc
```

**Step 5: Commit**

```bash
git add supabase/functions/purchase-shipping-label/index.ts
git commit -m "feat: send shipped email when shipping label is purchased"
```

---

### Task 5: Add delivered email to shippo-webhook

**Files:**
- Modify: `supabase/functions/shippo-webhook/index.ts`

**Step 1: Add import after existing imports**

```typescript
import { sendOrderDelivered } from "../_shared/emails.ts";
```

**Step 2: Update the `.select()` to include user_id**

Find (around line 58):
```typescript
.select("id, order_number")
```

Replace with:
```typescript
.select("id, order_number, user_id")
```

**Step 3: Add email send after the delivered DB update**

Find this block (around line 64):
```typescript
logStep("Order delivered", { orderId: data.id, orderNumber: data.order_number });
```

Add immediately after it:

```typescript
logStep("Order delivered", { orderId: data.id, orderNumber: data.order_number });

// Send delivered email
try {
  if (data.user_id) {
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('email, first_name')
      .eq('id', data.user_id)
      .maybeSingle();

    if (profile?.email) {
      await sendOrderDelivered({
        to: profile.email,
        firstName: profile.first_name || "",
        orderNumber: data.order_number,
      });
      logStep("Delivered email sent", { email: profile.email });
    }
  }
} catch (emailErr) {
  logStep("Warning: Failed to send delivered email", {
    error: emailErr instanceof Error ? emailErr.message : String(emailErr),
  });
}
```

**Step 4: Deploy**

```bash
supabase functions deploy shippo-webhook --project-ref lxkgqglqrmtpinxqsztc
```

**Step 5: Commit**

```bash
git add supabase/functions/shippo-webhook/index.ts
git commit -m "feat: send delivered email on Shippo delivery webhook"
```

---

### Task 6: Add membership welcome to paypal-webhook

**Files:**
- Modify: `supabase/functions/paypal-webhook/index.ts`

**Step 1: Add import after existing imports**

```typescript
import { sendMembershipWelcome } from "../_shared/emails.ts";
```

**Step 2: Add email send inside the `BILLING.SUBSCRIPTION.ACTIVATED` case**

Find this block (around line 171):
```typescript
logStep("Membership activated", { userId, subscriptionId, periodEnd: periodEnd.toISOString() });
```

Add immediately after it (still inside the `if (!error)` block):

```typescript
logStep("Membership activated", { userId, subscriptionId, periodEnd: periodEnd.toISOString() });

// Send membership welcome email
try {
  const { data: profile } = await supabaseClient
    .from('profiles')
    .select('email, first_name')
    .eq('id', userId)
    .maybeSingle();

  if (profile?.email) {
    await sendMembershipWelcome({
      to: profile.email,
      firstName: profile.first_name || "",
    });
    logStep("Membership welcome email sent", { email: profile.email });
  }
} catch (emailErr) {
  logStep("Warning: Failed to send membership welcome email", {
    error: emailErr instanceof Error ? emailErr.message : String(emailErr),
  });
}
```

**Step 3: Deploy**

```bash
supabase functions deploy paypal-webhook --project-ref lxkgqglqrmtpinxqsztc
```

**Step 4: Commit**

```bash
git add supabase/functions/paypal-webhook/index.ts
git commit -m "feat: send membership welcome email on subscription activation"
```

---

### Task 7: Configure DB Webhook for welcome email

**This is done in the Supabase Dashboard — no code changes.**

**Step 1: Open Supabase Dashboard**

Go to: https://supabase.com/dashboard/project/lxkgqglqrmtpinxqsztc/database/hooks

**Step 2: Create the webhook**

Click "Create a new hook" and fill in:

| Field | Value |
|---|---|
| Name | `on_profile_created_send_welcome` |
| Table | `public.profiles` |
| Events | `INSERT` |
| Type | `Edge Functions` |
| Edge Function | `send-welcome-email` |
| HTTP method | `POST` |

Click Save.

**Step 3: Verify it appears in the list**

The webhook should show as active. This completes the welcome email setup — it will fire automatically whenever a new user signs up.

---

### Task 8: Verify logo URL and smoke test

**Step 1: Verify logo URL**

Open `https://peptidefoundry.com/logo.svg` in a browser. If it 404s, check `/public` in the repo for the correct filename and update `LOGO_URL` in `_shared/emails.ts`, then redeploy all functions:

```bash
supabase functions deploy capture-paypal-order purchase-shipping-label shippo-webhook paypal-webhook send-welcome-email --project-ref lxkgqglqrmtpinxqsztc
```

**Step 2: Test welcome email via a new test signup**

Create a new test account on the site. Within ~5 seconds a welcome email should arrive at that address. Check:
- Resend Dashboard → Emails tab for delivery status
- Supabase Dashboard → Edge Function logs for `send-welcome-email`

**Step 3: Check Resend dashboard for any domain verification issues**

Go to Resend Dashboard → Domains. Confirm `orders.peptidefoundry.com` shows status `Verified`. If it shows `Pending`, DNS hasn't propagated yet (can take up to 48 hours, usually minutes).

**Step 4: Commit final state**

```bash
git add -A
git commit -m "feat: complete email system with Resend integration"
```
