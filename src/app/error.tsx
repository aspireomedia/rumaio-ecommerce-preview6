"use client";

import { ErrorExperience } from "@/components/ErrorExperience";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <ErrorExperience reset={reset} />;
}
