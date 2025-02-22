"use client";

import { useState, useEffect } from "react";

interface Transaction {
  description: string;
  amount: number;
  date: string;
  category: string;
}

export function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem("transactions") || "[]");
    setTransactions(savedTransactions);
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!description || !amount || !date || !category) {
      alert("All fields are required!");
      return;
    }
    const newTransaction: Transaction = {
      description,
      amount: parseFloat(amount),
      date,
      category,
    };
    setTransactions([...transactions, newTransaction]);
    setDescription("");
    setAmount("");
    setDate("");
    setCategory("");
  };

  const deleteTransaction = (index: number) => {
    const updatedTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(updatedTransactions);
  };

  return (
    <main className="transactions-main" id="transactions-main">
      <div className="transactions-container">
        <div className="form-container">
          <h1>Add Transaction</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="description">Description</label>
              <input
                id="description"
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="amount">Amount</label>
              <input
                id="amount"
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="date">Date</label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="category">Category</label>
              <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <button type="submit" className="w-full">Add Transaction</button>
          </form>
        </div>

        <div className="table-container">
          <h1>Transaction History</h1>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td>{transaction.description}</td>
                    <td>${transaction.amount.toFixed(2)}</td>
                    <td>{transaction.date}</td>
                    <td>{transaction.category}</td>
                    <td>
                      <button onClick={() => deleteTransaction(index)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
