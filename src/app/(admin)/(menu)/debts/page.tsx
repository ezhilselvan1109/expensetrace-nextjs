import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import CreateDebtPage from "./client";

export const metadata: Metadata = {
  title: "Debts | ExpenseTrace",
  description: "This is Debts Page for ExpenseTrace",
};

export default function DebtsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Debts" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-[630px] text-center">
          <CreateDebtPage/>
        </div>
      </div>
    </div>
  );
}
