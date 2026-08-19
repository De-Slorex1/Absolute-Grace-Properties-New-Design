import { NextResponse } from "next/server";
import { inquirySchema } from "@/lib/validation";
import { sendAdminNotification } from "@/lib/mailer";
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

  try {
    await sendAdminNotification({
      subject: `New Property Inquiry — ${developmentName ?? "General"}`,
      html: `
        <h2>New Property Inquiry</h2>
        <p><strong>Development:</strong> ${developmentName ?? "—"} ${developmentSlug ? `(${developmentSlug})` : ""}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "—"}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });
  } catch (err) {
    console.error("Property inquiry email failed (saved to DB regardless):", err);
  }

  return NextResponse.json({ success: true });
}