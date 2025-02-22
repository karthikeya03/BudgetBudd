"use client"; // Mark this as a Client Component

import { Dashboard } from "@/components/Dashboard"; // Adjust the import path as needed

export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <Dashboard />
    </div>
  );
}