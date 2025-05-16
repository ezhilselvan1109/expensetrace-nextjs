import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React, { Suspense } from "react";
import SegmentedTabs from "./client";

export const metadata: Metadata = {
  title: "Blank Page | ExpenseTrace",
  description: "This is Blank Page ExpenseTrace",
};

export default function AccountsPage() {
  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Accounts" />
        <Suspense fallback={<div>Loading...</div>}>
          <SegmentedTabs />
        </Suspense>
    </div>
  );
}
