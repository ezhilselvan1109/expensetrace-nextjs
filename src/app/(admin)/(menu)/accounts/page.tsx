import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import SegmentedTabs from "./client";

export const metadata: Metadata = {
  title: "Blank Page | ExpenseTrace",
  description: "This is Blank Page ExpenseTrace",
};

export default function AccountsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Accounts" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <SegmentedTabs />
      </div>
    </div>
  );
}
