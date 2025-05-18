
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Transactions | ExpenseTrace",
  description: "This is Transactions Page ExpenseTrace",
};

export default function TransactionsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">New Transaction</h1>
       <TransactionsPage/>
    </div>
  );
}
