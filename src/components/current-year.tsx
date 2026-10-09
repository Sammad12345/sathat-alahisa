"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// Read in the browser only, so the static page never bakes in a stale year.
export function CurrentYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => null,
  );
  return <span dir="ltr">{year}</span>;
}
