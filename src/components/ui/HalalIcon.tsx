export const HALAL_LOGO_SRC = "/assets/images/halal-mark.png";

type HalalIconProps = {
  className?: string;
  title?: string;
};

const maskStyle = {
  WebkitMaskImage: `url(${HALAL_LOGO_SRC})`,
  maskImage: `url(${HALAL_LOGO_SRC})`,
  WebkitMaskSize: "contain",
  maskSize: "contain",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
} as const;

/** Halal mark from the provided logo, filled with brand orange. */
export function HalalIcon({ className = "h-5 w-5", title = "Halal" }: HalalIconProps) {
  return (
    <span
      role="img"
      aria-label={title}
      title={title}
      className={`inline-block shrink-0 bg-secondary ${className}`}
      style={maskStyle}
    />
  );
}

type HalalBadgeProps = {
  className?: string;
  /** Kept for call-site compatibility. */
  iconClassName?: string;
  size?: number;
};

export function HalalBadge({ className = "", size = 28 }: HalalBadgeProps) {
  return (
    <span
      role="img"
      aria-label="Halal"
      className={`inline-block shrink-0 bg-secondary ${className}`}
      style={{ width: size, height: size, ...maskStyle }}
    />
  );
}
