import { Metadata } from "next";
import React from "react";
import Transactions from "./TransactionsPage";

export const metadata: Metadata = {
  title: "Transactions | ExpenseTrace",
  description: "This is Transactions Page ExpenseTrace",
};

export default function TransactionsPage() {
  return (
    <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-2 py-3 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
      <Transactions />
    </div>
  );
}
