"use client";
import { HelpCircle } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function DebtsPage() {
  const [activeTab, setActiveTab] = useState<"Monthly" | "Yearly">("Monthly");
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold">Budgets</h1>
          <Link href="/budgets/help" className="text-blue-600 hover:text-blue-800">
            <HelpCircle size={20} />
          </Link>
        </div>
        <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
          + Add Budgets
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 dark:bg-gray-800 rounded-full p-1 mb-6 mx-auto">
        {["Monthly", "Yearly"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as typeof activeTab)}
            className={`flex-1 text-sm font-medium rounded-full py-2 transition-all duration-200 ${activeTab === tab
              ? "bg-white dark:bg-gray-900 shadow text-black dark:text-white"
              : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="text-center text-gray-500 dark:text-gray-400 py-12 text-lg max-w-md mx-auto space-y-2">
        <p className="font-semibold text-xl">Set Up your first {activeTab} Budget</p>
        <p>
          Budgeting is one of one of the most important steps you can take to manage your finances effectively.
          <Link href="/budgets/help" className="text-blue-600 hover:underline">Learn more</Link>
        </p>
      </div>
    </div>
  );
}
