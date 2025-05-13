import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Multiple from "@/components/selection/multiple";
import Content from "@/components/table/Content";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Transactions | ExpenseTrace",
  description: "This is Transactions Page ExpenseTrace",
};

export default function TransactionsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Transactions" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <Multiple/>
        <Content />
      </div>
    </div>
  );
}
