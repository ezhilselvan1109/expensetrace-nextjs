import Calendar from "@/components/calendar/Calendar";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Calender | ExpenseTrace",
  description:
    "This is Calender page for ExpenseTrace",
  // other metadata
};
export default function AnalysisPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Calendar" />
      <Calendar />
    </div>
  );
}
