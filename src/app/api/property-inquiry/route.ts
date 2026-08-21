import { NextResponse } from "next/server";
import { inquirySchema } from "@/lib/validation";
import { notifyAdminPropertyInquiry, sendPropertyInquiryConfirmation } from "@/lib/mailer";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Please check the form and try again.";
    return NextResponse.json({ error: firstError }, { status: 422 });
  }

  const { name, email, phone, message, developmentName, developmentSlug } = parsed.data;

  const supabase = createAdminClient();
  const { error: dbError } = await supabase.from("property_inquiries").insert({
    name,
    email,
    phone: phone || null,
    message,
    development_name: developmentName || null,
    development_slug: developmentSlug || null,
  });

  if (dbError) {
    console.error("Property inquiry DB insert failed:", dbError);
    return NextResponse.json(
      { error: "We couldn't send your inquiry right now. Please try WhatsApp instead." },
      { status: 500 }
    );
  }

  const results = await Promise.allSettled([
    notifyAdminPropertyInquiry({ name, email, phone, message, developmentName, developmentSlug }),
    sendPropertyInquiryConfirmation({ name, email, developmentName }),
  ]);

  results.forEach((result, i) => {
    if (result.status === "rejected") {
      console.error(
        `Property inquiry email ${i === 0 ? "(admin)" : "(user confirmation)"} failed:`,
        result.reason
      );
    }
  });

  return NextResponse.json({ success: true });
}