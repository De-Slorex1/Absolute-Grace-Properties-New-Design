import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { notifyAdminLogin } from "@/lib/mailer";

export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Only send if there's a genuinely authenticated session — prevents
  // this endpoint being abused to spam the notification email.
  if (!user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  try {
    await notifyAdminLogin({
      email: user.email ?? "unknown",
      time: new Date().toLocaleString("en-NG", { timeZone: "Africa/Lagos" }),
    });
  } catch (err) {
    console.error("Login notification email failed:", err);
    // Don't fail the request over this — login itself already succeeded.
  }

  return NextResponse.json({ success: true });
}