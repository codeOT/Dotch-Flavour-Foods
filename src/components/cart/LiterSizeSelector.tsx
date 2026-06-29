"use client";

import { literSizeOptions, type LiterSize } from "@/lib/liter-sizes";

type LiterSizeSelectorProps = {
  value: LiterSize;
  onChange: (liters: LiterSize) => void;
  className?: string;
};

export function LiterSizeSelector({ value, onChange, className = "" }: LiterSizeSelectorProps) {
  return (
    <div
      className={`flex flex-wrap gap-2 ${className}`}
      role="radiogroup"
      aria-label="Select portion size"
      onClick={(event) => event.stopPropagation()}
    >
      {literSizeOptions.map((option) => {
        const isSelected = value === option.liters;

        return (
          <button
            key={option.liters}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onChange(option.liters);
            }}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              isSelected
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "bg-surface text-title hover:bg-cream"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
