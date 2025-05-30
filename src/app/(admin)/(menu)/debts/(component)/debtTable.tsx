'use client';

import React from "react";
import { Debt } from "../../../../../types";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import Link from "next/link";

export default function DebtTable({
  debts,
  loading,
  onClick,
  activeTab,
}: {
  debts: Debt[];
  loading?: boolean;
  onClick: (id: string) => void;
  activeTab: "All" | "Lending" | "Borrowing";
}) {

  const renderIcon = (type: number) => {
    return type === 1 ? (
      <ArrowUpCircle className="text-green-600" size={18} />
    ) : (
      <ArrowDownCircle className="text-red-600" size={18} />
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      {loading ? (
        <div className="space-y-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-26 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : debts.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-12 text-lg max-w-md mx-auto space-y-2">
          {activeTab === "All" ? (
            <>
              <p className="font-semibold text-xl">Track your debts effortlessly</p>
              <p>
                Managing money lent or borrowed has never been easier. Keep track of who owes you or what you owe, all in one place.{" "}
                <Link href="/debts/help" className="text-blue-600 hover:underline">Learn more</Link>
              </p>
            </>
          ) : activeTab === "Lending" ? (
            <>
              <p className="font-semibold text-xl">No lending activity yet</p>
              <p>
                You haven&#39;t lent any money yet. Once you do, you can track it here to stay on top of your repayments.{" "}
                <Link href="/debts/help" className="text-blue-600 hover:underline">Learn more</Link>
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold text-xl">No borrowing activity yet</p>
              <p>
                You haven&#39;t borrowed any money yet. Once you do, you can track it here to stay on top of your repayments.{" "}
                <Link href="/debts/help" className="text-blue-600 hover:underline">Learn more</Link>
              </p>
            </>
          )}
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden border border-gray-200 dark:border-gray-700">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold text-sm">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Due Date</th>
                  <th className="px-6 py-4">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {debts.map((debt) => (
                  <tr
                    key={debt.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition"
                    onClick={() => onClick(debt.id)}
                  >
                    <td className="px-6 py-4 text-gray-800 dark:text-white">{debt.personName}</td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{debt.dueDate}</td>
                    <td className="px-6 py-4 flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      {renderIcon(debt.type)}
                      {debt.type === 1 ? "Lending" : "Borrowing"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4 mt-4">
            {debts.map((debt) => (
              <div
                key={debt.id}
                onClick={() => onClick(debt.id)}
                className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow border border-gray-200 dark:border-gray-700 hover:shadow-md transition cursor-pointer"
              >
                <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {debt.personName}
                </div>
                <div className="flex justify-between text-gray-700 dark:text-gray-300 text-sm">
                  <div>
                    <span className="font-medium">Due: </span>{debt.dueDate}
                  </div>
                  <div className="flex items-center gap-1">
                    {renderIcon(debt.type)}
                    <span>{debt.type === 1 ? "Lending" : "Borrowing"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
