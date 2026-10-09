import { notFound } from "next/navigation";

// Any unmatched path inside a locale renders that locale's not-found page (with the site layout).
export default function CatchAll() {
  notFound();
}
