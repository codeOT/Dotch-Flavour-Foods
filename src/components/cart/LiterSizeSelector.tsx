"use client";

import { getLiterSizeOptions, type LiterSize } from "@/lib/liter-sizes";

type LiterSizeSelectorProps = {
  value: LiterSize;
  onChange: (liters: LiterSize) => void;
  availableSizes?: readonly LiterSize[];
  className?: string;
};

export function LiterSizeSelector({
  value,
  onChange,
  availableSizes,
  className = "",
}: LiterSizeSelectorProps) {
  const options = getLiterSizeOptions(availableSizes);

  return (
    <div
      className={`flex flex-wrap gap-2 ${className}`}
      role="radiogroup"
      aria-label="Select portion size"
      onClick={(event) => event.stopPropagation()}
    >
      {options.map((option) => {
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
