import type { Metadata } from "next";
import { MeetAbiContent } from "@/components/pages/MeetAbiContent";

export const metadata: Metadata = {
  title: "Meet Abi",
  description:
    "Meet Mrs Abimbola Olurin, founder of Dotch Flavour Foods — the story behind Ready Soups and authentic Nigerian flavour in the UK.",
};

export default function MeetAbiPage() {
  return <MeetAbiContent />;
}
