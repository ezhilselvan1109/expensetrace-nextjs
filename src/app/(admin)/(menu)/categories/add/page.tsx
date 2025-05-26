import { Metadata } from "next";
import React from "react";
import CategoryForm from "../(component)/form";

export const metadata: Metadata = {
  title: "Categories Add | ExpenseTrace",
  description: "This is Categories Page ExpenseTrace",
};

export default function CategoriesAddPage() {
  return (
    <div className="min-h-screen rounded-xl rounded-2xl border border-gray-200 bg-white px-2 py-3 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
      <CategoryForm />
    </div>
  );
}