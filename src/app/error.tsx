"use client";
import useNotification from "@/hooks/useNotification";
import { useRouter } from "next/navigation";
import React from "react";

export default function ErrorBoundary({ error }: { error: Error }) {
  const { handleError } = useNotification();
  const { back, refresh } = useRouter();
  if (error) {
    handleError("An Error Occurred", error.message);
    return refresh();
  }
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <pre className="text-sm">{error.message}</pre>
  //     </div>
  //   );
}
