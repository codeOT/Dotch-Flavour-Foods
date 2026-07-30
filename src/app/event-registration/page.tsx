import type { Metadata } from "next";
import { EventRegistrationContent } from "@/components/pages/EventRegistrationContent";
import { currentEvent } from "@/lib/events";

export const metadata: Metadata = {
  title: "Event Registration",
  description: `Register your interest for ${currentEvent.name} — part of the Dotch Flavour Experience.`,
};

export default function EventRegistrationPage() {
  return <EventRegistrationContent />;
}
