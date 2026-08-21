import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const { error } = await resend.emails.send({
    from: `Absolute Grace Properties <${process.env.FROM_EMAIL}>`,
    to,
    replyTo,
    subject,
    html,
  });

  if (error) throw new Error(error.message);
}

function wrapper(bodyHtml: string) {
  return `
    <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto; color: #1c1930;">
      <div style="padding: 24px 0; border-bottom: 2px solid #4f3cc9; margin-bottom: 24px;">
        <span style="font-size: 18px; font-weight: 700; color: #4f3cc9;">Absolute Grace Properties</span>
      </div>
      ${bodyHtml}
      <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #e0dce8; font-size: 12px; color: #8b85a0;">
        Absolute Grace Properties · No 24, Adeyi Avenue, Old Bodija, Ibadan, Oyo State
      </div>
    </div>
  `;
}

// ── Admin-facing notifications ──────────────────────────────

export async function notifyAdminInvestorApplication(data: {
  name: string;
  email: string;
  phone: string;
  capacity: string;
  development?: string;
  message?: string;
}) {
  await sendEmail({
    to: process.env.ADMIN_EMAIL!,
    replyTo: data.email,
    subject: `New Investor Application — ${data.name}`,
    html: wrapper(`
      <h2 style="margin-top:0;">New Investor Application</h2>
      <p><strong>Name / Company:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Investment Capacity:</strong> ${data.capacity}</p>
      <p><strong>Preferred Development:</strong> ${data.development || "No preference"}</p>
      <p><strong>Message:</strong><br/>${data.message ? data.message.replace(/\n/g, "<br/>") : "—"}</p>
    `),
  });
}

export async function notifyAdminPropertyInquiry(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  developmentName?: string;
  developmentSlug?: string;
}) {
  await sendEmail({
    to: process.env.ADMIN_EMAIL!,
    replyTo: data.email,
    subject: `New Property Inquiry — ${data.developmentName ?? "General"}`,
    html: wrapper(`
      <h2 style="margin-top:0;">New Property Inquiry</h2>
      <p><strong>Development:</strong> ${data.developmentName ?? "—"} ${data.developmentSlug ? `(${data.developmentSlug})` : ""}</p>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || "—"}</p>
      <p><strong>Message:</strong><br/>${data.message.replace(/\n/g, "<br/>")}</p>
    `),
  });
}

export async function notifyAdminLogin(data: { email: string; time: string }) {
  await sendEmail({
    to: process.env.ADMIN_EMAIL!,
    subject: `Admin login — ${data.email}`,
    html: wrapper(`
      <h2 style="margin-top:0;">Admin Dashboard Login</h2>
      <p><strong>Account:</strong> ${data.email}</p>
      <p><strong>Time:</strong> ${data.time}</p>
      <p style="color:#8b85a0; font-size:13px;">If this wasn't you, please change your password immediately.</p>
    `),
  });
}

export async function notifyAdminNewListing(data: {
  name: string;
  slug: string;
  createdBy: string;
  published: boolean;
}) {
  await sendEmail({
    to: process.env.ADMIN_EMAIL!,
    subject: `New listing created — ${data.name}`,
    html: wrapper(`
      <h2 style="margin-top:0;">New Listing Created</h2>
      <p><strong>Development:</strong> ${data.name}</p>
      <p><strong>Slug:</strong> ${data.slug}</p>
      <p><strong>Created by:</strong> ${data.createdBy}</p>
      <p><strong>Status:</strong> ${data.published ? "Published (live now)" : "Draft (not yet visible)"}</p>
    `),
  });
}

// ── User-facing confirmations ──────────────────────────────

export async function sendInvestorApplicationConfirmation(data: { name: string; email: string }) {
  await sendEmail({
    to: data.email,
    subject: "We've received your investor application",
    html: wrapper(`
      <h2 style="margin-top:0;">Thanks, ${data.name.split(" ")[0]}</h2>
      <p>We've received your investor application at Absolute Grace Properties. A member of our team will reach out within 24 hours to discuss next steps.</p>
      <p>If you'd like to speak with us sooner, you're welcome to reach out directly on WhatsApp at any time.</p>
    `),
  });
}

export async function sendPropertyInquiryConfirmation(data: {
  name: string;
  email: string;
  developmentName?: string;
}) {
  await sendEmail({
    to: data.email,
    subject: "We've received your inquiry",
    html: wrapper(`
      <h2 style="margin-top:0;">Thanks, ${data.name.split(" ")[0]}</h2>
      <p>We've received your inquiry${data.developmentName ? ` about <strong>${data.developmentName}</strong>` : ""} and will respond within 24 hours.</p>
      <p>If you'd like a faster response, feel free to message us directly on WhatsApp.</p>
    `),
  });
}