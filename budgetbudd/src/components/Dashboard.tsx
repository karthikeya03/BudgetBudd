"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface Transaction {
  description: string;
  amount: number;
  date: string;
  category: string;
}

interface Budget {
  [month: string]: {
    [category: string]: number;
  };
}

export function Budgeting() {
  const [budgets, setBudgets] = useState<Budget>({});
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [month, setMonth] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  // Load budgets and transactions from localStorage on component mount
  useEffect(() => {
    const savedBudgets = JSON.parse(localStorage.getItem("budgets") || "{}");
    setBudgets(savedBudgets);
    const savedTransactions = JSON.parse(localStorage.getItem("transactions") || "[]");
    setTransactions(savedTransactions);
  }, []);

  // Save budgets and transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("budgets", JSON.stringify(budgets));
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [budgets, transactions]);

  // Handle form submission for adding a new budget
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!month || !category || !amount || parseFloat(amount) <= 0) {
      alert("Please fill out all fields correctly.");
      return;
    }

    const updatedBudgets = { ...budgets };
    if (!updatedBudgets[month]) {
      updatedBudgets[month] = {};
    }
    updatedBudgets[month][category] = parseFloat(amount);
    setBudgets(updatedBudgets);
    setMonth("");
    setCategory("");
    setAmount("");
  };

  // Delete a budget
  const deleteBudget = (month: string, category: string) => {
    if (confirm(`Are you sure you want to delete the budget for ${category} in ${month}?`)) {
      const updatedBudgets = { ...budgets };
      delete updatedBudgets[month][category];
      if (Object.keys(updatedBudgets[month]).length === 0) {
        delete updatedBudgets[month];
      }
      setBudgets(updatedBudgets);
    }
  };

  // Calculate total expenses
  const totalExpenses = transactions.reduce((sum, txn) => sum + txn.amount, 0);

  // Get recent transactions (last 5)
  const recentTransactions = transactions.slice(-5);

  // Calculate category-wise spending
  const categoryData = transactions.reduce((acc, txn) => {
    acc[txn.category] = (acc[txn.category] || 0) + txn.amount;
    return acc;
  }, {} as Record<string, number>);

  // Format data for the pie chart
  const chartData = Object.keys(categoryData).map((category) => ({
    name: category,
    value: categoryData[category],
  }));

  // Colors for the pie chart
  const COLORS = ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0"];

  return (
    <section id="budgeting" className="budget-container p-8">
      <h1 className="text-2xl font-bold mb-4">Budgeting</h1>

      {/* Total Expenses Card */}
      <div className="dashboard-card bg-white p-4 rounded-lg shadow-md mb-4">
        <h2 className="text-lg font-semibold mb-2">Total Expenses</h2>
        <p className="text-xl">${totalExpenses.toFixed(2)}</p>
      </div>

      {/* Recent Transactions Card */}
      <div className="dashboard-card bg-white p-4 rounded-lg shadow-md mb-4">
        <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>
        <ul>
          {recentTransactions.map((txn, index) => (
            <li key={index} className="mb-2">
              {txn.description} - ${txn.amount.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>

      {/* Category Breakdown Card */}
      <div className="dashboard-card bg-white p-4 rounded-lg shadow-md mb-4">
        <h2 className="text-lg font-semibold mb-2">Category Breakdown</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Form for adding budgets */}
      <form onSubmit={handleSubmit} className="budget-form bg-white p-4 rounded-lg shadow-md mb-4">
        <h2 className="text-lg font-semibold mb-4">Add Budget</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="month">Month</Label>
            <Input
              id="month"
              type="text"
              placeholder="Month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Add Budget
          </Button>
        </div>
      </form>

      {/* Budget list with delete option */}
      <div className="budget-list bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Budgets</h2>
        {Object.keys(budgets).map((month) =>
          Object.keys(budgets[month]).map((category) => (
            <div key={`${month}-${category}`} className="budget-item flex justify-between items-center mb-2">
              <span>
                {month} - {category}: ${budgets[month][category].toFixed(2)}
              </span>
              <Button
                variant="destructive"
                onClick={() => deleteBudget(month, category)}
              >
                Delete
              </Button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export function Dashboard() {
  return null; // Renders nothing
}