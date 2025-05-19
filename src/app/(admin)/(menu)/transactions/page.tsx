import { Metadata } from "next";
import React from "react";
import ClientPage from "./clientPage";

export const metadata: Metadata = {
  title: "Transactions | ExpenseTrace",
  description: "This is Transactions Page ExpenseTrace",
};

export default function TransactionsPage() {
  return (
    <div className="min-h-screen px-2 py-3 dark:border-gray-800 xl:px-10 xl:py-12">
      <ClientPage />
    </div>
  );
}
