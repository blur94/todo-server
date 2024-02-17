"use client";
import React from "react";

export default function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="flex justify-center items-center h-screen">
      <pre className="text-sm">{error.message}</pre>
    </div>
  );
}
