"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

type ButtonVariant = "primary" | "outline" | "white";

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  href?: string;
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  onNavigate?: () => void;
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

export function Button({
  href,
  variant = "primary",
  children,
  className = "",
  fullWidth = false,
  onNavigate,
  type = "button",
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-semibold uppercase tracking-wide transition ${fullWidth ? "w-full sm:w-auto" : ""} ${variants[variant]} ${className}`;
  const wrapperClass = fullWidth ? "block w-full sm:inline-block sm:w-auto" : "inline-block";

  if (href) {
    return (
      <motion.div {...motionProps} className={wrapperClass}>
        <Link href={href} className={classes} onClick={onNavigate}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div {...motionProps} className={wrapperClass}>
      <button type={type} className={classes} {...props}>
        {children}
      </button>
    </motion.div>
  );
}
