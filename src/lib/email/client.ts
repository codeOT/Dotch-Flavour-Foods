import { Resend } from "resend";
import { siteConfig } from "@/lib/site";

let client: Resend | null = null;

export function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!client) client = new Resend(apiKey);
  return client;
}

export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

export function getEmailFrom() {
  const raw =
    process.env.EMAIL_FROM?.trim() ||
    `Dotch Flavour Foods <${siteConfig.contact.email}>`;
  return raw.replace(/^["']|["']$/g, "").trim();
}

export function getEmailReplyTo() {
  const raw = process.env.EMAIL_REPLY_TO?.trim() || siteConfig.contact.email;
  return raw.replace(/^["']|["']$/g, "").trim();
}

export type SendEmailResult =
  | { ok: true; id?: string }
  | { ok: false; skipped?: boolean; error: string };

export async function sendEmail(options: {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  idempotencyKey?: string;
}): Promise<SendEmailResult> {
  const resend = getResend();
  if (!resend) {
    console.warn("RESEND_API_KEY is not set — email skipped:", options.subject);
    return { ok: false, skipped: true, error: "Email is not configured." };
  }

  const primaryFrom = getEmailFrom();
  const fallbackFrom = "Dotch Flavour Foods <onboarding@resend.dev>";
  const fromCandidates = [primaryFrom];
  if (!primaryFrom.includes("@resend.dev")) {
    fromCandidates.push(fallbackFrom);
  }

  let lastError = "Unable to send email.";

  for (const from of fromCandidates) {
    try {
      const { data, error } = await resend.emails.send(
        {
          from,
          to: options.to,
          subject: options.subject,
          html: options.html,
          text: options.text,
          replyTo: options.replyTo || getEmailReplyTo(),
        },
        options.idempotencyKey
          ? { idempotencyKey: `${options.idempotencyKey}:${from.includes("@resend.dev") ? "fallback" : "primary"}` }
          : undefined,
      );

      if (error) {
        lastError = error.message;
        console.error("Resend error:", { from, error });
        // Retry with Resend's test sender when the custom domain is not verified yet.
        if (
          from !== fallbackFrom &&
          /domain is not verified|invalid_from_address|validation_error/i.test(
            `${error.name} ${error.message}`,
          )
        ) {
          continue;
        }
        return { ok: false, error: lastError };
      }

      if (from !== primaryFrom) {
        console.warn(
          `Email sent via fallback from-address (${from}). Verify your domain at https://resend.com/domains to use ${primaryFrom}.`,
        );
      }

      return { ok: true, id: data?.id };
    } catch (error) {
      lastError = error instanceof Error ? error.message : "Unable to send email.";
      console.error("Resend send failed:", { from, error });
    }
  }

  return { ok: false, error: lastError };
}
