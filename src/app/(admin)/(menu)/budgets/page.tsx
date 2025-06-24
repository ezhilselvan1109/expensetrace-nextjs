import { Metadata } from "next";
import React from "react";
import ClientPage from "./clientPage";

export const metadata: Metadata = {
  title: "Budgets | ExpenseTrace",
  description: "This is Budgets Page for ExpenseTrace",
};

export default function BudgetsPage() {
  return (
      <div className="min-h-screen dark:border-gray-800">
        <ClientPage />
      </div>
    );
}
