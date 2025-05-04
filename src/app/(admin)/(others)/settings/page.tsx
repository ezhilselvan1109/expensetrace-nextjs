import { Metadata } from "next";
import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Client from "./client";

export const metadata: Metadata = {
  title: "Settings | ExpenseTrace",
  description: "This is Settings Page ExpenseTrace",
};

export default function SettingsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Settings" />
      <Client />
    </div>
  );
}
