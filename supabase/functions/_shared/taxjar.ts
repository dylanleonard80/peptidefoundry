/**
 * Shared TaxJar tax calculation helper for edge functions.
 * Reads TAXJAR_API_KEY and TAXJAR_FROM_* env vars.
 * Fails gracefully to $0 on any error.
 */

interface TaxLineItem {
  quantity: number;
  unit_price: number;
  product_tax_code?: string;
}

interface TaxAddress {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
}

interface CalculateTaxParams {
  toAddress: TaxAddress;
  shipping: number;
  lineItems: TaxLineItem[];
}

export async function calculateTax(params: CalculateTaxParams): Promise<number> {
  const apiKey = Deno.env.get("TAXJAR_API_KEY");
  if (!apiKey) {
    console.log("[TaxJar] No API key configured, returning $0 tax");
    return 0;
  }

  const { toAddress, shipping, lineItems } = params;

  // Need at least state + zip to calculate tax
  if (!toAddress.state || !toAddress.zip) {
    console.log("[TaxJar] Incomplete address, returning $0 tax");
    return 0;
  }

  try {
    const body: Record<string, any> = {
      from_country: "US",
      from_state: Deno.env.get("TAXJAR_FROM_STATE") || "FL",
      from_city: Deno.env.get("TAXJAR_FROM_CITY") || "Tampa",
      from_zip: Deno.env.get("TAXJAR_FROM_ZIP") || "33602",
      from_street: Deno.env.get("TAXJAR_FROM_STREET") || "",
      to_country: "US",
      to_state: toAddress.state,
      to_city: toAddress.city || "",
      to_zip: toAddress.zip,
      to_street: toAddress.street || "",
      shipping: shipping,
      line_items: lineItems.map((item, idx) => ({
        id: String(idx + 1),
        quantity: item.quantity,
        unit_price: item.unit_price,
        ...(item.product_tax_code ? { product_tax_code: item.product_tax_code } : {}),
      })),
    };

    const res = await fetch("https://api.taxjar.com/v2/taxes", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`[TaxJar] API error: ${res.status} ${text}`);
      return 0;
    }

    const data = await res.json();
    const tax = Math.round((Number(data.tax?.amount_to_collect) || 0) * 100) / 100;
    console.log(`[TaxJar] Calculated tax: $${tax.toFixed(2)}`);
    return tax;
  } catch (err) {
    console.error("[TaxJar] Calculation failed:", err);
    return 0;
  }
}
