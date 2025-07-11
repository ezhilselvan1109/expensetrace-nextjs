import { Metadata } from "next";
import React from "react";
import ClientPage from "./clientPage";

export const metadata: Metadata = {
  title: "Scheduled Txns | ExpenseTrace",
  description: "This is Scheduled Txns Page for ExpenseTrace",
};

export default function ScheduledTxnsPage() {
  return (
      <div className="min-h-screen dark:border-gray-800">
        <ClientPage />
      </div>
    );
}
