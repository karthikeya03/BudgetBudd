"use client";

import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

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

export function Charts() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget>({});

  // Load transactions and budgets from localStorage on component mount
  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem("transactions") || "[]");
    const savedBudgets = JSON.parse(localStorage.getItem("budgets") || "{}");
    setTransactions(savedTransactions);
    setBudgets(savedBudgets);
  }, []);

  // Calculate monthly expenses
  const getMonthlyExpenses = () => {
    const monthlyData: { [month: string]: number } = {};
    transactions.forEach((txn) => {
      const month = new Date(txn.date).toLocaleString("default", { month: "long" });
      monthlyData[month] = (monthlyData[month] || 0) + txn.amount;
    });
    return Object.keys(monthlyData).map((month) => ({
      month,
      expenses: monthlyData[month],
    }));
  };

  // Calculate category-wise spending
  const getCategorySpending = () => {
    const categoryData: { [category: string]: number } = {};
    transactions.forEach((txn) => {
      categoryData[txn.category] = (categoryData[txn.category] || 0) + txn.amount;
    });
    return Object.keys(categoryData).map((category) => ({
      category,
      amount: categoryData[category],
    }));
  };

  // Calculate budget vs actual spending
  const getBudgetVsActual = () => {
    const comparisonData: { [month: string]: { budget: number; actual: number } } = {};
    transactions.forEach((txn) => {
      const month = new Date(txn.date).toLocaleString("default", { month: "long" });
      if (!comparisonData[month]) {
        comparisonData[month] = { budget: 0, actual: 0 };
      }
      comparisonData[month].actual += txn.amount;
    });
    Object.keys(budgets).forEach((month) => {
      if (!comparisonData[month]) {
        comparisonData[month] = { budget: 0, actual: 0 };
      }
      comparisonData[month].budget = Object.values(budgets[month]).reduce((sum, amount) => sum + amount, 0);
    });
    return Object.keys(comparisonData).map((month) => ({
      month,
      budget: comparisonData[month].budget,
      actual: comparisonData[month].actual,
    }));
  };

  // Colors for the pie chart
  const COLORS = ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0"];

  return (
    <section className="charts-container">
      <h1>Spending Insights</h1>
      <div className="charts-grid">
        {/* Monthly Expenses Bar Chart */}
        <div className="chart-card">
          <h2>Monthly Expenses</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={getMonthlyExpenses()}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="expenses" fill="#36a2eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category-Wise Spending Pie Chart */}
        <div className="chart-card">
          <h2>Category-Wise Spending</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={getCategorySpending()}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {getCategorySpending().map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Budget vs Actual Comparison Chart */}
        <div className="chart-card">
          <h2>Budget vs Actual</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={getBudgetVsActual()}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="budget" fill="#4bc0c0" />
              <Bar dataKey="actual" fill="#ff6384" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}