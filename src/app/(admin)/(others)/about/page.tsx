import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = {
  title: "About | ExpenseTrace",
  description: "This is About Page ExpenseTrace",
};

export default function AboutPage() {
  const aboutMeText = `Hey, I'm Ezhil Selvan, the Indian developer behind Expence Trace. I've been working on this app since 2025, and it has come a long way since then.`;

  return (
    <div>
      <PageBreadcrumb pageTitle="About" />
      <div className=" rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-[630px] text-center">

          <div className="flex justify-center mb-4">
            <Image
              width={154}
              height={32}
              src="/images/logo/logo-icon.svg"
              alt="logo"
            />
          </div>
          <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
            Expense Trace
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
            ExpenseTrace helps you stay on top of your personal finances. Easily track your daily expenses, see where your money goes, and make smarter decisions with simple insights and clean visuals. It’s your money — take control of it.
          </p>
        </div>
      </div>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90" x-text="pageName">
        About me
      </h2>
      <div className="rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-[630px] text-center">
          <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
            Card Title Here
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
          {aboutMeText}
          </p>
        </div>
      </div>
    </div>
  );
}
