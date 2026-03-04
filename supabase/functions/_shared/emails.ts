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
