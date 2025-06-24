import { Metadata } from "next";
import React from "react";
import DebtsPage from "./client";

export const metadata: Metadata = {
  title: "Debts | ExpenseTrace",
  description: "This is Debts Page for ExpenseTrace",
};

export default function DebtPage() {
  return (
      <div className="min-h-screen dark:border-gray-800">
        <DebtsPage/>
      </div>
  );
}
