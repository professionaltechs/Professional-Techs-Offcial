import nodemailer from "nodemailer";

/**
 * Creates a nodemailer transporter using SMTP credentials from environment
 * variables. Configure these in `.env.local` (see `.env.local.example`):
 *
 *   SMTP_HOST=smtp.gmail.com
 *   SMTP_PORT=465
 *   SMTP_USER=professionalstechs@gmail.com
 *   SMTP_PASS=<16-character Gmail App Password>
 *   CONTACT_TO_EMAIL=professionalstechs@gmail.com
 *
 * IMPORTANT: SMTP_PASS must be a Gmail "App Password", not the normal
 * Gmail login password. Google blocks SMTP login with the regular
 * password for security reasons. To generate one:
 *   1. Turn on 2-Step Verification on the Google account.
 *   2. Go to https://myaccount.google.com/apppasswords
 *   3. Create an app password (name it e.g. "Website Contact Form").
 *   4. Copy the 16-character password into SMTP_PASS.
 */
export function getTransporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT) || 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error(
      "SMTP is not configured. Please set SMTP_USER and SMTP_PASS in your environment (.env.local)."
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465 (SSL), false for 587 (STARTTLS)
    auth: { user, pass },
  });
}

export function getContactToEmail() {
  return process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER || "professionalstechs@gmail.com";
}
