import { Metadata } from "next";
import React from "react";
import Client from "./client";

export const metadata: Metadata = {
  title: "Categories | ExpenseTrace",
  description: "This is Categories Page ExpenseTrace",
};

export default function CategoriesPage() {
  return (
    <div className="min-h-screen lg:rounded-2xl lg:rounded-2xl lg:border lg:border-gray-200 lg:bg-white px-2 py-3 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
      <Client />
    </div>
  );
}
