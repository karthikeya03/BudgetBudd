"use client"; // Mark this as a Client Component

import { Transactions } from "@/components/Transactions"; // Adjust the import path as needed

export default function TransactionsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>
      <Transactions />
    </div>
  );
}