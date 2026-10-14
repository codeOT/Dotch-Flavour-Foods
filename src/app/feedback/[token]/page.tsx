import type { Metadata } from "next";
import { FeedbackContent } from "@/components/pages/FeedbackContent";

export const metadata: Metadata = {
  title: "Leave feedback",
  robots: { index: false, follow: false },
};

type PageProps = {
  params: Promise<{ token: string }>;
};

export default async function FeedbackPage({ params }: PageProps) {
  const { token } = await params;
  return <FeedbackContent token={token} />;
}
