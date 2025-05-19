import TableHeader from "@/components/table/Header";
import TableContent from "@/components/table/Content";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard | ExpenseTrace",
  description: "This is Dashboard page for ExpenseTrace",
};

export default function Dashboard() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
          <TableHeader />
          <TableContent />
        </div>
      </div>
    </div>
  );
}
