"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void, breakpoint: number) {
  const media = window.matchMedia(`(max-width: ${breakpoint}px)`);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getSnapshot(breakpoint: number) {
  return window.matchMedia(`(max-width: ${breakpoint}px)`).matches;
}

function getServerSnapshot() {
  return false;
}

export function useIsMobile(breakpoint = 768) {
  return useSyncExternalStore(
    (onChange) => subscribe(onChange, breakpoint),
    () => getSnapshot(breakpoint),
    getServerSnapshot,
  );
}
