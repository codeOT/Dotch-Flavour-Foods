"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import {
  useState,
  type ButtonHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";

type ButtonVariant = "primary" | "outline" | "white";

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  href?: string;
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  onNavigate?: () => void;
  /** Controlled loading state (e.g. form submission) */
  loading?: boolean;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/25",
  outline:
    "border-2 border-primary text-primary hover:bg-primary hover:text-white",
  white: "bg-white text-primary hover:bg-surface",
};

const motionProps = {
  whileHover: { scale: 1.04, y: -2 },
  whileTap: { scale: 0.97 },
} as const;

function ButtonSpinner() {
  return <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden />;
}

export function Button({
  href,
  variant = "primary",
  children,
  className = "",
  fullWidth = false,
  onNavigate,
  loading,
  type = "button",
  disabled,
  onClick,
  ...props
}: ButtonProps) {
  const [internalLoading, setInternalLoading] = useState(false);
  const isBusy = Boolean(loading || internalLoading);
  const isDisabled = Boolean(disabled || isBusy);

  const classes = `inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold uppercase tracking-wide transition ${
    fullWidth ? "w-full sm:w-auto" : ""
  } ${variants[variant]} ${
    isBusy ? "pointer-events-none cursor-wait opacity-80" : ""
  } ${isDisabled && !isBusy ? "cursor-not-allowed opacity-60" : ""} ${className}`;
  const wrapperClass = fullWidth ? "block w-full sm:inline-block sm:w-auto" : "inline-block";

  const content = (
    <>
      {isBusy && <ButtonSpinner />}
      <span className={isBusy ? "opacity-90" : undefined}>{children}</span>
    </>
  );

  if (href) {
    const isExternal = /^https?:\/\//.test(href);

    const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
      if (isBusy) {
        event.preventDefault();
        return;
      }
      setInternalLoading(true);
      onNavigate?.();
    };

    if (isExternal) {
      return (
        <motion.div {...motionProps} className={wrapperClass}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={classes}
            aria-busy={isBusy}
            onClick={handleLinkClick}
          >
            {content}
          </a>
        </motion.div>
      );
    }

    return (
      <motion.div {...motionProps} className={wrapperClass}>
        <Link
          href={href}
          className={classes}
          aria-busy={isBusy}
          onClick={handleLinkClick}
        >
          {content}
        </Link>
      </motion.div>
    );
  }

  const handleButtonClick = async (event: MouseEvent<HTMLButtonElement>) => {
    if (isBusy) {
      event.preventDefault();
      return;
    }

    setInternalLoading(true);

    try {
      await onClick?.(event);
    } finally {
      // Controlled loading stays managed by the parent.
      if (loading === undefined) {
        // Keep spinner briefly for submit so the click feels responsive.
        const delay = type === "submit" ? 700 : 350;
        window.setTimeout(() => setInternalLoading(false), delay);
      } else {
        setInternalLoading(false);
      }
    }
  };

  return (
    <motion.div {...motionProps} className={wrapperClass}>
      <button
        type={type}
        className={classes}
        disabled={isDisabled}
        aria-busy={isBusy}
        onClick={handleButtonClick}
        {...props}
      >
        {content}
      </button>
    </motion.div>
  );
}
