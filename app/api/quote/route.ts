import { NextResponse } from "next/server";
import { z } from "zod";
import { getTransporter, getContactToEmail } from "@/lib/mailer";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().min(2),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  requirements: z.string().min(10),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const transporter = getTransporter();
    const to = getContactToEmail();

    await transporter.sendMail({
      from: `"Professional Techs Website" <${process.env.SMTP_USER}>`,
      to,
      replyTo: data.email,
      subject: `New Quote Request: ${data.service}`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone || "-"}`,
        `Company: ${data.company || "-"}`,
        `Service: ${data.service}`,
        `Budget: ${data.budget || "-"}`,
        `Timeline: ${data.timeline || "-"}`,
        "",
        "Requirements:",
        data.requirements,
      ].join("\n"),
      html: `
        <div style="font-family: sans-serif; font-size: 14px; line-height: 1.6;">
          <h2>New Quote Request</h2>
          <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(data.phone || "-")}</p>
          <p><strong>Company:</strong> ${escapeHtml(data.company || "-")}</p>
          <p><strong>Service Interested In:</strong> ${escapeHtml(data.service)}</p>
          <p><strong>Budget:</strong> ${escapeHtml(data.budget || "-")}</p>
          <p><strong>Timeline:</strong> ${escapeHtml(data.timeline || "-")}</p>
          <p><strong>Requirements:</strong></p>
          <p>${escapeHtml(data.requirements).replace(/\n/g, "<br/>")}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Quote form error:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to send request. Please try again." },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
