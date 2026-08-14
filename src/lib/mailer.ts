import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendAdminNotification({
  subject,
  html,
}: {
  subject: string;
  html: string;
}) {
  const { error } = await resend.emails.send({
    from: `Absolute Grace Properties <${process.env.FROM_EMAIL}>`,
    to: process.env.ADMIN_EMAIL!,
    subject,
    html,
  });

  if (error) {
    throw new Error(error.message);
  }
}