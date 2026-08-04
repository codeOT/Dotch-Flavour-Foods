"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { quoteEnquiryTypes, type QuoteEnquiryType } from "@/lib/catering";
import { siteConfig } from "@/lib/site";

const inputClassName =
  "box-border block w-full min-w-0 max-w-full rounded-xl border border-surface bg-white px-3.5 py-3 text-base text-title outline-none transition placeholder:text-title/40 focus:border-primary focus:ring-2 focus:ring-primary/15 sm:text-sm";

const serviceStyles = [
  "Buffet / trays",
  "Plated service",
  "Ready Soup bundles",
  "Drop-off only",
  "Staffed service",
  "Not sure yet",
] as const;

function isQuoteEnquiryType(value: string | null): value is QuoteEnquiryType {
  return quoteEnquiryTypes.some((type) => type.value === value);
}

const emptyForm = {
  fullName: "",
  organisation: "",
  email: "",
  phone: "",
  eventType: "catering" as QuoteEnquiryType,
  eventDate: "",
  startTime: "",
  location: "",
  guestCount: "",
  preferredMenu: "",
  serviceStyle: "",
  dietaryRequirements: "",
  budgetRange: "",
  logisticsNeeds: "",
  additionalInfo: "",
};

export function QuoteRequestContent() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState(emptyForm);
  const [referenceFile, setReferenceFile] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const type = searchParams.get("type");
    if (isQuoteEnquiryType(type)) {
      setForm((current) => ({ ...current, eventType: type }));
    }
  }, [searchParams]);

  function updateField<K extends keyof typeof emptyForm>(key: K, value: (typeof emptyForm)[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function resetForm() {
    setForm(emptyForm);
    setReferenceFile(null);
    setConsent(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent) {
      setStatus("error");
      setFeedback("Please agree to be contacted about this enquiry.");
      return;
    }

    setStatus("success");
    setFeedback(
      "Thank you for contacting Dotch Flavour. We have received your enquiry and aim to respond within one business day.",
    );
    resetForm();
  }

  return (
    <section className="w-full min-w-0 overflow-x-clip bg-white py-10 sm:py-16">
      <div className="container-fluid w-full min-w-0 max-w-3xl">
        <Reveal className="mb-8 text-center sm:mb-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary">
            Enquiries
          </p>
          <h1 className="text-[clamp(1.5rem,6vw,2.25rem)] font-bold text-title">
            Request a quote
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-title/70 sm:text-base">
            For catering, corporate events, experiences, and wholesale interest. Ready Soups shop
            orders can be placed online; fresh customisations are best via{" "}
            <a
              href={`https://wa.me/${siteConfig.contact.phone.replace(/\D/g, "")}`}
              className="font-semibold text-primary hover:underline"
            >
              WhatsApp
            </a>
            . See our{" "}
            <Link href="/catering-booking-policy" className="font-semibold text-primary hover:underline">
              Catering Booking Policy
            </Link>
            .
          </p>
        </Reveal>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-primary/20 bg-primary/5 p-5 text-center sm:p-8"
          >
            <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white">
              <Check className="h-7 w-7" />
            </span>
            <h2 className="text-xl font-bold text-title">Request sent</h2>
            <p className="mt-3 text-sm text-title/70">{feedback}</p>
            <Button type="button" className="mt-6" fullWidth onClick={() => setStatus("idle")}>
              Send another enquiry
            </Button>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="box-border w-full min-w-0 max-w-full space-y-6 rounded-2xl border border-surface bg-white p-4 shadow-sm sm:space-y-8 sm:p-8"
          >
            <fieldset className="min-w-0 space-y-4">
              <legend className="mb-1 text-sm font-semibold uppercase tracking-wider text-secondary">
                Contact details
              </legend>
              <div className="grid w-full min-w-0 grid-cols-1 gap-4 md:grid-cols-2">
                <label className="block min-w-0 space-y-1.5">
                  <span className="text-sm font-medium text-title">Full name</span>
                  <input
                    required
                    value={form.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                    className={inputClassName}
                    autoComplete="name"
                  />
                </label>
                <label className="block min-w-0 space-y-1.5">
                  <span className="text-sm font-medium text-title">
                    Organisation{" "}
                    <span className="font-normal text-title/45">(if applicable)</span>
                  </span>
                  <input
                    value={form.organisation}
                    onChange={(e) => updateField("organisation", e.target.value)}
                    placeholder="Company or group name"
                    className={inputClassName}
                    autoComplete="organization"
                  />
                </label>
              </div>
              <div className="grid w-full min-w-0 grid-cols-1 gap-4 md:grid-cols-2">
                <label className="block min-w-0 space-y-1.5">
                  <span className="text-sm font-medium text-title">Email address</span>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className={inputClassName}
                    autoComplete="email"
                  />
                </label>
                <label className="block min-w-0 space-y-1.5">
                  <span className="text-sm font-medium text-title">Telephone number</span>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className={inputClassName}
                    autoComplete="tel"
                  />
                </label>
              </div>
            </fieldset>

            <fieldset className="min-w-0 space-y-4">
              <legend className="text-sm font-semibold uppercase tracking-wider text-secondary">
                Event details
              </legend>
              <label className="block min-w-0 space-y-1.5">
                <span className="text-sm font-medium text-title">Event type</span>
                <select
                  required
                  value={form.eventType}
                  onChange={(e) => updateField("eventType", e.target.value as QuoteEnquiryType)}
                  className={inputClassName}
                >
                  {quoteEnquiryTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </label>
              <div className="grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                <label className="block min-w-0 space-y-1.5">
                  <span className="text-sm font-medium text-title">Event date</span>
                  <input
                    type="date"
                    value={form.eventDate}
                    onChange={(e) => updateField("eventDate", e.target.value)}
                    className={inputClassName}
                  />
                </label>
                <label className="block min-w-0 space-y-1.5">
                  <span className="text-sm font-medium text-title">Start time</span>
                  <input
                    type="time"
                    value={form.startTime}
                    onChange={(e) => updateField("startTime", e.target.value)}
                    className={inputClassName}
                  />
                </label>
                <label className="block min-w-0 space-y-1.5 sm:col-span-2 md:col-span-1">
                  <span className="text-sm font-medium text-title">Estimated guests</span>
                  <input
                    value={form.guestCount}
                    onChange={(e) => updateField("guestCount", e.target.value)}
                    placeholder="e.g. 40"
                    className={inputClassName}
                  />
                </label>
              </div>
              <label className="block min-w-0 space-y-1.5">
                <span className="text-sm font-medium text-title">Location</span>
                <input
                  value={form.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  placeholder="Venue name, address or postcode"
                  className={inputClassName}
                />
              </label>
            </fieldset>

            <fieldset className="min-w-0 space-y-4">
              <legend className="text-sm font-semibold uppercase tracking-wider text-secondary">
                Menu &amp; service
              </legend>
              <label className="block min-w-0 space-y-1.5">
                <span className="text-sm font-medium text-title">Preferred menu</span>
                <textarea
                  rows={3}
                  value={form.preferredMenu}
                  onChange={(e) => updateField("preferredMenu", e.target.value)}
                  placeholder="Dishes, flavours, Ready Soup bundles, or any must-haves"
                  className={inputClassName}
                />
              </label>
              <label className="block min-w-0 space-y-1.5">
                <span className="text-sm font-medium text-title">Service style</span>
                <select
                  value={form.serviceStyle}
                  onChange={(e) => updateField("serviceStyle", e.target.value)}
                  className={inputClassName}
                >
                  <option value="">Select a service style</option>
                  {serviceStyles.map((style) => (
                    <option key={style} value={style}>
                      {style}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block min-w-0 space-y-1.5">
                <span className="text-sm font-medium text-title">
                  Dietary and allergen requirements
                </span>
                <textarea
                  rows={3}
                  value={form.dietaryRequirements}
                  onChange={(e) => updateField("dietaryRequirements", e.target.value)}
                  placeholder="Allergies, intolerances, vegetarian/vegan needs, or religious dietary requirements"
                  className={inputClassName}
                />
              </label>
              <label className="block min-w-0 space-y-1.5">
                <span className="text-sm font-medium text-title">Budget range</span>
                <input
                  value={form.budgetRange}
                  onChange={(e) => updateField("budgetRange", e.target.value)}
                  placeholder="e.g. £200–£500, or per head"
                  className={inputClassName}
                />
              </label>
            </fieldset>

            <fieldset className="min-w-0 space-y-4">
              <legend className="text-sm font-semibold uppercase tracking-wider text-secondary">
                Logistics &amp; extras
              </legend>
              <label className="block min-w-0 space-y-1.5">
                <span className="text-sm font-medium text-title">
                  Delivery, collection, staffing or setup needs
                </span>
                <textarea
                  rows={3}
                  value={form.logisticsNeeds}
                  onChange={(e) => updateField("logisticsNeeds", e.target.value)}
                  placeholder="Delivery window, collection, staffing, setup, parking or access notes"
                  className={inputClassName}
                />
              </label>
              <label className="block min-w-0 space-y-1.5">
                <span className="text-sm font-medium text-title">Additional information</span>
                <textarea
                  rows={4}
                  value={form.additionalInfo}
                  onChange={(e) => updateField("additionalInfo", e.target.value)}
                  placeholder="Anything else we should know about the occasion"
                  className={inputClassName}
                />
              </label>
              <label className="block min-w-0 space-y-1.5">
                <span className="text-sm font-medium text-title">
                  Inspiration / reference{" "}
                  <span className="font-normal text-title/45">(optional)</span>
                </span>
                <div className="min-w-0 overflow-hidden rounded-xl border border-dashed border-surface bg-surface/10 px-3 py-4 sm:px-4 sm:py-5">
                  <div className="flex min-w-0 flex-col gap-3">
                    <div className="flex items-start gap-3 text-sm text-title/70">
                      <Upload className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>PDF, JPG, or PNG — max 5MB</span>
                    </div>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,.webp"
                      onChange={(e) => setReferenceFile(e.target.files?.[0] ?? null)}
                      className="block w-full min-w-0 max-w-full text-sm text-title/70 file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white"
                    />
                  </div>
                  {referenceFile && (
                    <p className="mt-3 break-all text-xs text-title/55">
                      Selected: {referenceFile.name}
                    </p>
                  )}
                </div>
              </label>
            </fieldset>

            <label className="flex cursor-pointer items-start gap-3 text-sm text-title/70">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-surface accent-primary"
              />
              <span className="min-w-0">
                I agree to be contacted by Dotch Flavour Foods about this enquiry. See our{" "}
                <Link href="/privacy-policy" className="text-primary hover:underline">
                  privacy policy
                </Link>
                .
              </span>
            </label>

            {status === "error" && feedback && (
              <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {feedback}
              </p>
            )}

            <Button type="submit" fullWidth>
              Submit quote request
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
