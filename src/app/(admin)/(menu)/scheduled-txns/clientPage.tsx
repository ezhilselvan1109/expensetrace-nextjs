"use client";
import React, { useState } from "react";

export default function DebtsPage() {
  const [activeTab, setActiveTab] = useState<"Upcoming" | "Completed">("Upcoming");
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Scheduled Transactions</h1>
        <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
          + Add Transaction
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 dark:bg-gray-800 rounded-full p-1 mb-6  mx-auto">
        {["Upcoming", "Completed"].map((tab) => (
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
      <div className="text-center">
        {activeTab === "Upcoming" ? (
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">No Scheduled Transactions Set</h2>
            <p className="text-gray-600 dark:text-gray-400">Scheduled Transactions help you automate the tracking of recurring expenses,incomes, and transfers,ensuring you never miss a beat in your financial tracking.</p>
          </div>
        ) : (
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">No Completed Scheduled Transactions</h2>
            <p className="text-gray-600 dark:text-gray-400">Looks like none of your Scheduled Transactions have Completed all their occurrences</p>
          </div>
        )}
      </div>
    </div>
  );
}
