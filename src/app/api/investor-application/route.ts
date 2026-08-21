import { NextResponse } from "next/server";
import { investorSchema } from "@/lib/validation";
import { notifyAdminInvestorApplication, sendInvestorApplicationConfirmation } from "@/lib/mailer";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = investorSchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Please check the form and try again.";
    return NextResponse.json({ error: firstError }, { status: 422 });
  }

  //hello

  const { name, email, phone, capacity, development, message } = parsed.data;

  const supabase = createAdminClient();
  const { error: dbError } = await supabase.from("investor_applications").insert({
    name,
    email,
    phone,
    capacity,
    development: development || null,
    message: message || null,
  });

  if (dbError) {
    console.error("Investor application DB insert failed:", dbError);
    return NextResponse.json(
      { error: "We couldn't save your application right now. Please try WhatsApp instead." },
      { status: 500 }
    );
  }

  const results = await Promise.allSettled([
    notifyAdminInvestorApplication({ name, email, phone, capacity, development, message }),
    sendInvestorApplicationConfirmation({ name, email }),
  ]);

  results.forEach((result, i) => {
    if (result.status === "rejected") {
      console.error(
        `Investor application email ${i === 0 ? "(admin)" : "(user confirmation)"} failed:`,
        result.reason
      );
    }
  });

  return NextResponse.json({ success: true });
}