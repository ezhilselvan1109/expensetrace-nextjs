"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { DebtsType } from "../../../../../types";
import DebtTable from "./(component)/debtTable";
import { ArrowDownCircle, ArrowUpCircle, HelpCircle } from "lucide-react";
import Modal from "./(component)/modal";
import Link from "next/link";
import { useDebts } from "@/hooks/useDebts";

export default function DebtsPage() {
  const [activeTab, setActiveTab] = useState<"All" | "Lending" | "Borrowing">("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(0);

  const router = useRouter();
  const { debts, totalPages, isLoading } = useDebts(activeTab, page);

  const handleCreateDebt = (type: DebtsType) => {
    setIsModalOpen(false);
    router.push(`/debts/create?type=${type}`);
  };

  const buttons = [
    {
      label: "Lend Money",
      description: "Record money you have lent to someone",
      icon: <ArrowUpCircle size={20} />,
      bgColorClass: "bg-green-50 dark:bg-green-900/20",
      textColorClass: "text-green-600",
      iconColorClass: "bg-green-600 text-white",
      hoverBgColorClass: "hover:bg-green-100 dark:hover:bg-green-800",
      onClick: () => handleCreateDebt(DebtsType.LENDING),
    },
    {
      label: "Borrow Money",
      description: "Track money you owe to someone",
      icon: <ArrowDownCircle size={20} />,
      bgColorClass: "bg-red-50 dark:bg-red-900/20",
      iconColorClass: "bg-red-600 text-white",
      textColorClass: "text-red-600",
      hoverBgColorClass: "hover:bg-red-100 dark:hover:bg-red-800",
      onClick: () => handleCreateDebt(DebtsType.BORROWING),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold">Debts</h1>
          <Link href="/debts/help" className="text-blue-600 hover:text-blue-800">
            <HelpCircle size={20} />
          </Link>
        </div>
        <button
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setIsModalOpen(true)}
        >
          Create Debt
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 dark:bg-gray-800 rounded-full p-1 mb-6 max-w-md mx-auto">
        {["All", "Lending", "Borrowing"].map((tab) => (
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

      {/* Table */}
      <DebtTable activeTab={activeTab} debts={debts} loading={isLoading} onClick={id => router.push(`/debts/${id}`)} />

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          disabled={page === 0}
          onClick={() => setPage(p => Math.max(0, p - 1))}
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm disabled:opacity-50"
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setPage(index)}
            className={`px-3 py-1 rounded text-sm transition ${index === page
              ? "bg-blue-600 text-white"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage(p => p + 1)}
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal
          title="Add Debt"
          description="Select what you want to track:"
          buttons={buttons}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
