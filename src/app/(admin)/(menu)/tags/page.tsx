import { Metadata } from "next";
import React from "react";
import ClientPage from "./clientPage";

export const metadata: Metadata = {
  title: "Tags | ExpenseTrace",
  description: "This is Tags Page ExpenseTrace",
};

export default function TagsPage() {
  return (
    <div className="min-h-screen dark:border-gray-800">
      <ClientPage/>
    </div>
  );
}
