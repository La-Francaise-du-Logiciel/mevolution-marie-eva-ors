import { NextResponse } from "next/server";
import { Resend } from "resend";

import { serverContactSchema } from "@/lib/schemas";
import { rateLimit } from "@/lib/rate-limit";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";

function getIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHtml(fields: {
  name: string;
  email: string;
  phone?: string;
  situation?: string;
  message: string;
}): string {
  const row = (label: string, value: string) =>
    `<tr>
      <td style="padding:6px 0;color:#7a857f;font:600 12px/1.4 Arial,sans-serif;text-transform:uppercase;letter-spacing:.08em;width:110px;vertical-align:top">${label}</td>
      <td style="padding:6px 0;color:#1f2d29;font:400 15px/1.6 Arial,sans-serif">${value}</td>
    </tr>`;

  return `<!doctype html><html><body style="margin:0;background:#f7f4ee;padding:24px">
    <table role="presentation" width="100%" style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #ece6db;border-radius:16px;border-collapse:separate;overflow:hidden">
      <tr><td style="background:#88489a;padding:22px 28px">
        <div style="color:#fff;font:700 18px/1.3 Arial,sans-serif">Nouveau message — Mévolution</div>
        <div style="color:rgba(255,255,255,.8);font:400 13px/1.4 Arial,sans-serif;margin-top:4px">Formulaire de contact du site</div>
      </td></tr>
      <tr><td style="padding:24px 28px">
        <table role="presentation" width="100%" style="border-collapse:collapse">
          ${row("Nom", escapeHtml(fields.name))}
          ${row("Email", escapeHtml(fields.email))}
          ${fields.phone ? row("Téléphone", escapeHtml(fields.phone)) : ""}
          ${fields.situation ? row("Situation", escapeHtml(fields.situation)) : ""}
          ${row("Message", escapeHtml(fields.message).replace(/\n/g, "<br>"))}
        </table>
      </td></tr>
    </table>
  </body></html>`;
}

export async function POST(req: Request) {
  const ip = getIp(req);
  const limited = rateLimit(`contact:${ip}`);
  if (!limited.ok) {
    return NextResponse.json(
      { status: "error", message: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let data: unknown;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ status: "error", message: "Invalid request." }, { status: 400 });
  }

  const body = (data ?? {}) as Record<string, unknown>;

  // Honeypot : si rempli, on simule un succès sans rien envoyer.
  const honeypot = typeof body.company === "string" ? body.company : "";
  if (honeypot.trim() !== "") {
    return NextResponse.json({ status: "ok", message: "Sent" });
  }

  const parsed = serverContactSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json({ status: "error", message: "Validation failed." }, { status: 400 });
  }

  const { name, email, phone, situation, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.email;
  const from = process.env.CONTACT_FROM_EMAIL;

  // Fallback dev : sans clé configurée, on n'envoie pas mais le formulaire réussit.
  if (!apiKey || !from) {
    console.warn("[contact] RESEND_API_KEY/CONTACT_FROM_EMAIL manquants — email non envoyé.", {
      name,
      email,
    });
    return NextResponse.json({ status: "ok", message: "Sent (dev)" });
  }

  const resend = new Resend(apiKey);
  const text = [
    `Nom : ${name}`,
    `Email : ${email}`,
    phone ? `Téléphone : ${phone}` : null,
    situation ? `Situation : ${situation}` : null,
    "",
    message,
  ]
    .filter((line) => line !== null)
    .join("\n");

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Nouveau message — ${name}`,
      html: buildHtml({ name, email, phone, situation, message }),
      text,
    });
    if (error) throw error;
    return NextResponse.json({ status: "ok", message: "Sent" });
  } catch (err) {
    console.error("[contact] Resend error:", err);
    return NextResponse.json(
      { status: "error", message: "Email delivery failed." },
      { status: 502 }
    );
  }
}
