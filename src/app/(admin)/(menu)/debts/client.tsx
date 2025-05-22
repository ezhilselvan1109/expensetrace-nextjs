"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Debt, DebtsType } from "../../../../../types";
import { DebtService } from "@/api-client";
import DebtTable from "./(component)/debtTable";

export default function DebtsPage() {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"All" | "Lending" | "Borrowing">("All");
  const router = useRouter();

  useEffect(() => {
    fetchDebts();
  }, []);

  const fetchDebts = async () => {
    setLoading(true);
    try {
      const res = await DebtService.getAllDebt();
      setDebts(res.data);
    } finally {
      setLoading(false);
    }
  };

  const filtered = (type: DebtsType) => debts.filter(d => d.type === type);

  // Select debts based on active tab
  const debtsToShow =
    activeTab === "All"
      ? debts
      : activeTab === "Lending"
      ? filtered(DebtsType.LENDING)
      : filtered(DebtsType.BORROWING);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Debts</h1>
      <div className="flex bg-gray-100 dark:bg-gray-800 rounded-full p-1 mb-6 max-w-md mx-auto">
        {["All", "Lending", "Borrowing"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as typeof activeTab)}
            className={`flex-1 text-sm font-medium rounded-full py-2 transition-all duration-200 ${
              activeTab === tab
                ? "bg-white dark:bg-gray-900 shadow text-black dark:text-white"
                : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <DebtTable debts={debtsToShow} loading={loading} onClick={id => router.push(`/debts/${id}`)} />
    </div>
  );
}
