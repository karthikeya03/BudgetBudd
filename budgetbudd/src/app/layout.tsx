import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Header } from "../components/Header";
import { Transactions } from "../components/Transactions";
import { Dashboard } from "../components/Dashboard"; // Named import
import { Budgeting } from "../components/Budgeting";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BudgetBudd",
  description: "Your personal budgeting assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />

        <main>
          <section id="transactions">
            <Transactions />
          </section>

          <section id="dashboard">
            <Dashboard />
          </section>

          <section id="budgeting">
            <Budgeting />
          </section>
        </main>

        {children}
      </body>
    </html>
  );
}