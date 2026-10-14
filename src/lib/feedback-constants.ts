export const FEEDBACK_COMMENT_MIN = 10;
export const FEEDBACK_COMMENT_MAX = 800;

export type PublicReview = {
  id: string;
  name: string;
  location: string;
  rating: number;
  quote: string;
};

export function formatDisplayName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "Customer";
  if (parts.length === 1) return parts[0];
  const lastInitial = parts[parts.length - 1].charAt(0).toUpperCase();
  return `${parts[0]} ${lastInitial}.`;
}
