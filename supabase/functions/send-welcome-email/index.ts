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
      status: 200, // Return 200 so Supabase doesn't retry endlessly
    });
  }
});
