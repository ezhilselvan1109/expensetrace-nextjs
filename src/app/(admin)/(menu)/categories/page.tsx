import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React, { Suspense } from "react";
import Client from "./client";

export const metadata: Metadata = {
  title: "Categories | ExpenseTrace",
  description: "This is Categories Page ExpenseTrace",
};

export default function CategoriesPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Categories" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-[630px] text-center">
          <Suspense fallback={<div>Loading...</div>}>
            <Client />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
