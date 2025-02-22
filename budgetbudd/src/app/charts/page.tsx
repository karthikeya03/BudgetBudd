"use client"; // Mark this as a Client Component

import { Charts } from "@/components/Charts";
export default function ChartsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Charts</h1>
      <Charts />
    </div>
  );
}