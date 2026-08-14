import { NextResponse } from "next/server";
import { investorSchema } from "@/lib/validation";
import { sendAdminNotification } from "@/lib/mailer";

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

  const { name, email, phone, capacity, development, message } = parsed.data;

  try {
    await sendAdminNotification({
      subject: `New Investor Application — ${name}`,
      html: `
        <h2>New Investor Application</h2>
        <p><strong>Name / Company:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Investment Capacity:</strong> ${capacity}</p>
        <p><strong>Preferred Development:</strong> ${development || "No preference"}</p>
        <p><strong>Message:</strong><br/>${message ? message.replace(/\n/g, "<br/>") : "—"}</p>
      `,
    });
  } catch (err) {
    console.error("Investor application email failed:", err);
    return NextResponse.json(
      { error: "We couldn't send your application right now. Please try WhatsApp instead." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}