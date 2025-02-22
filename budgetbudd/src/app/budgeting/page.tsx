"use client";

import { Budgeting } from "@/components/Budgeting"; // Adjust the import path as needed

export default function BudgetingPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Budgeting</h1>
      <Budgeting />
    </div>
  );
}