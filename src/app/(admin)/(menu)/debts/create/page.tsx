import { Metadata } from "next";
import React, { Suspense } from "react";
import CreateDebtPage from "./client";

export const metadata: Metadata = {
  title: "create Debt | ExpenseTrace",
  description: "This is Debts Page for ExpenseTrace",
};

export default function DebtPage() {
  return (
    <div className="min-h-screen px-2 py-3 dark:border-gray-800 xl:px-10 xl:py-12">
      <Suspense fallback={<div>Loading...</div>}>
        <CreateDebtPage />
      </Suspense>
    </div>
  );
}
