import { Metadata } from "next";
import React from "react";
import Client from "./client";

export const metadata: Metadata = {
  title: "Categories | ExpenseTrace",
  description: "This is Categories Page ExpenseTrace",
};

export default function CategoriesPage() {
  return (
    <div className="min-h-screen dark:border-gray-800 dark:bg-white/[0.03]">
      <Client />
    </div>
  );
}
