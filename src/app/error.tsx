"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="grid place-content-center w-screen h-screen">
      <p className="font-semibold text-2xl mb-3">{error.message}</p>
      <Button
        variant="destructive"
        onClick={() => reset()}
        className="w-fit mx-auto"
      >
        Try Again
      </Button>
    </div>
  );
}
