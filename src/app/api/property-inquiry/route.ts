import { NextResponse } from "next/server";
import { inquirySchema } from "@/lib/validation";
import { sendAdminNotification } from "@/lib/mailer";

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
    console.error("Property inquiry email failed:", err);
    return NextResponse.json(
      { error: "We couldn't send your inquiry right now. Please try WhatsApp instead." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}