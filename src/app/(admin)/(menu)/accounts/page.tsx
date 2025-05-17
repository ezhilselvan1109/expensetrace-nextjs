import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React, { Suspense } from "react";
import List from "./list";

export const metadata: Metadata = {
  title: "Account | ExpenseTrace",
  description: "This is Account ExpenseTrace",
};

export default function AccountsPage() {
  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Accounts" />
        <Suspense fallback={<div>Loading...</div>}>
          <List />
        </Suspense>
    </div>
  );
}
