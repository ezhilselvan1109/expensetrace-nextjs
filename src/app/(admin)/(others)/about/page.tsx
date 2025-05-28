import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = {
  title: "About | ExpenseTrace",
  description: "Learn more about ExpenseTrace and the developer behind it.",
};

export default function AboutPage() {
  const aboutMeText = `Hey, I'm Ezhil Selvan, the Indian developer behind Expense Trace. I've been working on this app since 2025, and it has come a long way since then.`;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-10">
      <PageBreadcrumb pageTitle="About" />

      {/* App Info Section */}
      <section className="rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] sm:px-8 sm:py-10">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center mb-6">
            <Image
              width={154}
              height={32}
              src="/images/logo/logo-icon.svg"
              alt="ExpenseTrace logo"
              priority
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white/90 mb-4">
            ExpenseTrace
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            ExpenseTrace helps you stay on top of your personal finances. Easily track your daily expenses, see where your money goes, and make smarter decisions with simple insights and clean visuals. It’s your money — take control of it.
          </p>
        </div>
      </section>

      {/* About Developer Section */}
      <section className="rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] sm:px-8 sm:py-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white/90 mb-4">
            About the Developer
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            {aboutMeText}
          </p>
        </div>
      </section>
    </div>
  );
}
