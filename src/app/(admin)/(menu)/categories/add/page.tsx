import { Metadata } from "next";
import React, { Suspense } from "react";
import CategoryForm from "../(component)/form";

export const metadata: Metadata = {
  title: "Categories Add | ExpenseTrace",
  description: "This is Categories Page ExpenseTrace",
};

export default function CategoriesAddPage() {
  return (
    <div>
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-[630px] text-center">
          <Suspense fallback={<div>Loading...</div>}>
            <CategoryForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}