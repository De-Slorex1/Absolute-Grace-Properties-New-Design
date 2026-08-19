import { NextResponse } from "next/server";
import { investorSchema } from "@/lib/validation";
import { sendAdminNotification } from "@/lib/mailer";
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
    // The submission is already safely saved in the DB — don't fail the request
    // just because the notification email had a hiccup.
    console.error("Investor application email failed (saved to DB regardless):", err);
  }

  return NextResponse.json({ success: true });
}