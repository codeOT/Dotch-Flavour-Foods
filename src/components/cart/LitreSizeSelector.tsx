"use client";

import { getLitreSizeOptions, type LitreSize, type PricesByLitre } from "@/lib/litre-sizes";

type LitreSizeSelectorProps = {
  value: LitreSize;
  onChange: (litres: LitreSize) => void;
  availableSizes?: readonly LitreSize[];
  pricesByLitre?: PricesByLitre;
  className?: string;
};

export function LitreSizeSelector({
  value,
  onChange,
  availableSizes,
  pricesByLitre,
  className = "",
}: LitreSizeSelectorProps) {
  const options = getLitreSizeOptions(availableSizes, pricesByLitre);

  return (
    <div
      className={`flex flex-wrap gap-2 ${className}`}
      role="radiogroup"
      aria-label="Select portion size"
      onClick={(event) => event.stopPropagation()}
    >
      {options.map((option) => {
        const isSelected = value === option.litres;

        return (
          <button
            key={option.litres}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onChange(option.litres);
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
