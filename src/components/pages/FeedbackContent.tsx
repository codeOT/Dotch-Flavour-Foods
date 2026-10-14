"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { ReviewStars } from "@/components/ready-soups/ReadySoupCards";
import { FEEDBACK_COMMENT_MAX, FEEDBACK_COMMENT_MIN } from "@/lib/feedback-constants";

type FeedbackPayload = {
  submitted: boolean;
  orderNumber: string;
  displayName: string;
  location: string;
  rating?: number;
  comment?: string;
  published?: boolean;
  error?: string;
};

const inputClassName =
  "box-border block w-full min-w-0 max-w-full rounded-lg border border-surface bg-white px-3.5 py-3 text-base text-title outline-none transition placeholder:text-title/40 focus:border-primary focus:ring-2 focus:ring-primary/15 sm:text-sm";

export function FeedbackContent({ token }: { token: string }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [payload, setPayload] = useState<FeedbackPayload | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/feedback/${encodeURIComponent(token)}`);
        const data = (await res.json()) as FeedbackPayload;
        if (!res.ok) {
          if (!cancelled) setError(data.error ?? "This feedback link is not valid.");
          return;
        }
        if (!cancelled) {
          setPayload(data);
          setDisplayName(data.displayName);
          setLocation(data.location);
          if (data.submitted) {
            setRating(data.rating ?? 5);
            setComment(data.comment ?? "");
          }
        }
      } catch {
        if (!cancelled) setError("Unable to load this feedback form.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [token]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/feedback/${encodeURIComponent(token)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, comment, displayName, location }),
      });
      const data = (await res.json()) as FeedbackPayload;
      if (!res.ok) {
        setError(data.error ?? "Unable to save your feedback.");
        return;
      }
      setPayload(data);
    } catch {
      setError("Unable to save your feedback.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <section className="py-16 sm:py-20">
        <div className="container-fluid max-w-xl">
          <div className="h-40 animate-pulse rounded-2xl bg-surface" />
        </div>
      </section>
    );
  }

  if (error && !payload) {
    return (
      <section className="py-16 sm:py-20">
        <div className="container-fluid max-w-xl">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">{error}</div>
        </div>
      </section>
    );
  }

  const submitted = Boolean(payload?.submitted);

  return (
    <section className="bg-surface/40 py-12 sm:py-20">
      <div className="container-fluid max-w-xl">
        <Reveal>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            Customer review
          </p>
          <h1 className="mb-2 text-3xl font-bold sm:text-4xl">
            {submitted ? "Thank you" : "How was your order?"}
          </h1>
          <p className="mb-8 text-sm text-title/70 sm:text-base">
            {submitted
              ? "Your rating and feedback are with us. We’ll only show them on the website if they’re approved."
              : `Leave a star rating and a short note for order ${payload?.orderNumber ?? ""}. This is the same style we use for reviews on the site.`}
          </p>
        </Reveal>

        {submitted ? (
          <blockquote className="rounded-2xl border border-surface bg-white p-6 shadow-sm">
            <ReviewStars rating={payload?.rating ?? rating} />
            <p className="my-4 text-sm leading-relaxed text-title/80">
              &ldquo;{payload?.comment}&rdquo;
            </p>
            <footer>
              <p className="font-semibold text-primary">{payload?.displayName}</p>
              {payload?.location ? <p className="text-xs text-title/50">{payload.location}</p> : null}
            </footer>
          </blockquote>
        ) : (
          <form
            onSubmit={(event) => void handleSubmit(event)}
            className="space-y-5 rounded-2xl border border-surface bg-white p-5 shadow-sm sm:p-8"
          >
            <fieldset>
              <legend className="mb-3 text-sm font-semibold">Rating</legend>
              <div className="flex gap-1" role="radiogroup" aria-label="Star rating">
                {[1, 2, 3, 4, 5].map((value) => {
                  const filled = value <= rating;
                  return (
                    <button
                      key={value}
                      type="button"
                      aria-label={`${value} star${value === 1 ? "" : "s"}`}
                      onClick={() => setRating(value)}
                      className="rounded-md p-1 transition hover:scale-105"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          filled ? "fill-secondary text-secondary" : "fill-none text-title/25"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div>
              <label htmlFor="comment" className="mb-1.5 block text-sm font-medium">
                Your feedback
              </label>
              <textarea
                id="comment"
                required
                minLength={FEEDBACK_COMMENT_MIN}
                maxLength={FEEDBACK_COMMENT_MAX}
                rows={5}
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                className={`${inputClassName} resize-y`}
                placeholder="What did you think of the flavour, packaging, and delivery?"
              />
              <p className="mt-1 text-xs text-title/50">
                {comment.length}/{FEEDBACK_COMMENT_MAX}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="displayName" className="mb-1.5 block text-sm font-medium">
                  Name on the review
                </label>
                <input
                  id="displayName"
                  required
                  value={displayName}
                  onChange={(event) => setDisplayName(event.target.value)}
                  className={inputClassName}
                  autoComplete="name"
                />
              </div>
              <div>
                <label htmlFor="location" className="mb-1.5 block text-sm font-medium">
                  Location <span className="text-title/50">(optional)</span>
                </label>
                <input
                  id="location"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  className={inputClassName}
                  placeholder="Manchester"
                />
              </div>
            </div>

            {error ? (
              <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            ) : null}

            <Button type="submit" loading={saving} disabled={saving} fullWidth>
              Send feedback
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
