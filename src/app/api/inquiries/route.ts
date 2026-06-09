import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message, subject, source } = body;

    await resend.emails.send({
      from: "ENTEG Inquiries <onboarding@resend.dev>",
      to: process.env.RESEND_TO_EMAIL!,
      subject: `New Inquiry: ${subject || "Contact Form"}`,
      html: `
        <h2>New Inquiry from ENTEG Website</h2>
        <p><strong>Source:</strong> ${source}</p>
        <p><strong>Subject:</strong> ${subject || "General Contact"}</p>
        <hr />
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
