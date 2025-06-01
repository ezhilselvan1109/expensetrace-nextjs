import { Metadata } from "next";
import React from "react";
import DebtTransactionsPage from "./client";

export const metadata: Metadata = {
  title: "Debts | ExpenseTrace",
  description: "This is Debts Page for ExpenseTrace",
};

export default function DebtPage() {
  return (
    <div className="min-h-screen px-2 py-3 dark:border-gray-800 md:px-1 md:py-1">
      <DebtTransactionsPage/>
    </div>
  );
}
