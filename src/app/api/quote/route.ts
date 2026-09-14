import { NextResponse } from "next/server";
import { quoteEnquiryTypes, type QuoteEnquiryType } from "@/lib/catering";
import { sendQuoteEmails } from "@/lib/email/send";
import { getRequestIp, rateLimit, tooManyRequests } from "@/lib/rate-limit";

const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;
const ALLOWED_ATTACHMENT_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isQuoteEnquiryType(value: string): value is QuoteEnquiryType {
  return quoteEnquiryTypes.some((type) => type.value === value);
}

function readText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    const ip = getRequestIp(request);
    const limited = rateLimit(`quote:${ip}`, 5, 60_000);
    if (!limited.allowed) return tooManyRequests(limited.retryAfterSec);

    const formData = await request.formData();
    const consent = readText(formData, "consent") === "true";

    const fullName = readText(formData, "fullName");
    const organisation = readText(formData, "organisation");
    const email = readText(formData, "email").toLowerCase();
    const phone = readText(formData, "phone");
    const eventType = readText(formData, "eventType");
    const eventDate = readText(formData, "eventDate");
    const startTime = readText(formData, "startTime");
    const location = readText(formData, "location");
    const guestCount = readText(formData, "guestCount");
    const preferredMenu = readText(formData, "preferredMenu");
    const serviceStyle = readText(formData, "serviceStyle");
    const dietaryRequirements = readText(formData, "dietaryRequirements");
    const budgetRange = readText(formData, "budgetRange");
    const logisticsNeeds = readText(formData, "logisticsNeeds");
    const additionalInfo = readText(formData, "additionalInfo");

    if (!consent) {
      return NextResponse.json(
        { error: "Please agree to be contacted about this enquiry." },
        { status: 400 },
      );
    }

    if (fullName.length < 2) {
      return NextResponse.json({ error: "Please enter your full name." }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (phone.length < 7) {
      return NextResponse.json({ error: "Please enter a valid telephone number." }, { status: 400 });
    }

    if (!isQuoteEnquiryType(eventType)) {
      return NextResponse.json({ error: "Please choose a valid enquiry type." }, { status: 400 });
    }

    const eventTypeLabel =
      quoteEnquiryTypes.find((type) => type.value === eventType)?.label ?? eventType;

    let attachment:
      | {
          filename: string;
          content: Buffer;
          contentType?: string;
        }
      | undefined;

    const file = formData.get("referenceFile");
    if (file instanceof File && file.size > 0) {
      if (file.size > MAX_ATTACHMENT_BYTES) {
        return NextResponse.json(
          { error: "Attachment must be 5MB or smaller." },
          { status: 400 },
        );
      }

      if (file.type && !ALLOWED_ATTACHMENT_TYPES.has(file.type)) {
        return NextResponse.json(
          { error: "Attachment must be a PDF, JPG, PNG, or WEBP file." },
          { status: 400 },
        );
      }

      const bytes = Buffer.from(await file.arrayBuffer());
      attachment = {
        filename: file.name || "reference-file",
        content: bytes,
        contentType: file.type || undefined,
      };
    }

    const result = await sendQuoteEmails({
      fullName,
      organisation: organisation || undefined,
      email,
      phone,
      eventTypeLabel,
      eventDate: eventDate || undefined,
      startTime: startTime || undefined,
      location: location || undefined,
      guestCount: guestCount || undefined,
      preferredMenu: preferredMenu || undefined,
      serviceStyle: serviceStyle || undefined,
      dietaryRequirements: dietaryRequirements || undefined,
      budgetRange: budgetRange || undefined,
      logisticsNeeds: logisticsNeeds || undefined,
      additionalInfo: additionalInfo || undefined,
      attachment,
    });

    if (!result.notifyTeam.ok) {
      if (result.notifyTeam.skipped) {
        return NextResponse.json(
          {
            error:
              "Email is not configured on the server yet. Please WhatsApp us or email hello@dotchflavourfoods.com.",
          },
          { status: 503 },
        );
      }

      return NextResponse.json(
        {
          error:
            "Unable to send your quote request right now. Please try WhatsApp or email us directly.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Thank you for contacting Dotch Flavour. We have received your enquiry and aim to respond within one business day.",
    });
  } catch (error) {
    console.error("Quote request error:", error);
    return NextResponse.json(
      { error: "Unable to send your quote request. Please try again." },
      { status: 500 },
    );
  }
}
