"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Debt, DebtsType } from "../../../../../types";
import { DebtService } from "@/api-client";
import DebtTable from "./(component)/debtTable";

export default function DebtsPage() {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"All" | "Lending" | "Borrowing">("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const router = useRouter();

  useEffect(() => {
    fetchDebts(page);
  }, [page]);

  const fetchDebts = async (pageNum: number) => {
    setLoading(true);
    try {
      const res = await DebtService.getAllDebt(pageNum);
      setDebts((res.data?.content as Debt[]) || []);
      setTotalPages(res.data?.totalPages || 1);
    } finally {
      setLoading(false);
    }
  };

  const filtered = (type: DebtsType) => debts.filter(d => d.type === type);

  const debtsToShow =
    activeTab === "All"
      ? debts
      : activeTab === "Lending"
        ? filtered(DebtsType.LENDING)
        : filtered(DebtsType.BORROWING);

  const handleCreateDebt = (type: DebtsType) => {
    setIsModalOpen(false);
    router.push(`/debts/create?type=${type}`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Debts</h1>
        <button
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setIsModalOpen(true)}
        >
          Create Debt
        </button>
      </div>

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

      <DebtTable debts={debtsToShow} loading={loading} onClick={id => router.push(`/debts/${id}`)} />

      {/* Pagination Controls */}
      {/* Numbered Pagination Controls */}
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

      {/* Create Debt Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 sm:px-6">
          <div className="relative w-full max-w-sm sm:max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">

            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="text-start">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Add Debt</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                Select what you want to track:
              </p>

              <div className="flex flex-col gap-4">
                <button
                  onClick={() => handleCreateDebt(DebtsType.LENDING)}
                  className="w-full flex text-start items-center gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-800 transition"
                >
                  <div className="flex-shrink-0 p-2 rounded-full bg-green-600 text-white flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-green-800 dark:text-green-300 font-semibold">Lend Money</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Record money you have lent to someone
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleCreateDebt(DebtsType.BORROWING)}
                  className="w-full flex text-start items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-800 transition"
                >
                  <div className="flex-shrink-0 p-2 rounded-full bg-red-600 text-white flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-red-800 dark:text-red-300 font-semibold">Borrow Money</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Track money you owe to someone
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
