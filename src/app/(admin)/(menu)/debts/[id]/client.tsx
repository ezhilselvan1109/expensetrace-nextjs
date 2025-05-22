'use client';

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { DebtTransaction } from "../../../../../../types";
import { DebtTransactionsService } from "@/api-client";
import { ArrowDownCircle, ArrowUpCircle, Repeat } from "lucide-react";
import Modal from "../(component)/modal";

export default function DebtTransactionsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [transactions, setTransactions] = useState<DebtTransaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'ALL' | 'PAID' | 'RECEIVED' | 'ADJUSTMENT'>('ALL');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const buttons = [
    {
      label: "Money Received",
      description: "Trace money you have received from someone",
      icon: <ArrowDownCircle size={20} />,
      bgColorClass: "bg-green-50 dark:bg-green-900/20",
      textColorClass: "text-green-600",
      iconColorClass: "bg-green-600 text-white",
      hoverBgColorClass: "hover:bg-green-100 dark:hover:bg-green-800",
      onClick: () => handleCreateTransaction(2),
    },
    {
      label: "Money Paid",
      description: "Trace money you have paid to someone",
      icon: <ArrowUpCircle size={20} />,
      bgColorClass: "bg-red-50 dark:bg-red-900/20",
      iconColorClass: "bg-red-600 text-white",
      textColorClass: "text-red-600",
      hoverBgColorClass: "hover:bg-red-100 dark:hover:bg-red-800",
      onClick: () => handleCreateTransaction(1),
    },
  ];

  useEffect(() => {
    if (!id) return;
    fetchTransactions();
  }, [id]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await DebtTransactionsService.getAllDebtTransaction(id as string);
      setTransactions((res.data as DebtTransaction[]) || []);
    } catch (error) {
      console.error("Failed to fetch transactions", error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  // Changed icons and colors here:
  const renderIcon = (type: number) => {
    if (type === 1) return <ArrowUpCircle className="text-red-600" size={18} />;      // PAID — now red up arrow
    if (type === 2) return <ArrowDownCircle className="text-green-600" size={18} />;  // RECEIVED — now green down arrow
    return <Repeat className="text-blue-500" size={18} />;
  };

  const renderTypeText = (type: number) =>
    type === 1 ? "PAID" : type === 2 ? "RECEIVED" : "ADJUSTMENT";

  const filteredTransactions = transactions.filter((tx) => {
    if (activeTab === 'ALL') return true;
    if (activeTab === 'PAID') return tx.type === 1;
    if (activeTab === 'RECEIVED') return tx.type === 2;
    if (activeTab === 'ADJUSTMENT') return tx.type === 3;
    return true;
  });

  // Redirect to create transaction page with type query param
  const handleCreateTransaction = (type: number) => {
    setIsModalOpen(false);
    if (!id) return;
    router.push(`/debts/${id}/create?type=${type}`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Debt Transactions
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Record
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-neutral-700 mb-4">
        <nav
          className="flex justify-center gap-4 flex-wrap"
          aria-label="Tabs"
          role="tablist"
          aria-orientation="horizontal"
        >
          {['ALL', 'PAID', 'RECEIVED', 'ADJUSTMENT'].map((value) => (
            <button
              key={value}
              onClick={() => setActiveTab(value as typeof activeTab)}
              type="button"
              className={`py-2 px-4 rounded-md text-sm font-medium
                ${activeTab === value
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-700'}
              `}
              role="tab"
              aria-selected={activeTab === value}
            >
              {value.charAt(0) + value.slice(1).toLowerCase()}
            </button>
          ))}
        </nav>
      </div>

      {loading ? (
        <div className="space-y-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-26 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : filteredTransactions.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-12 text-lg">
          No transactions found.
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden border border-gray-200 dark:border-gray-700">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold text-sm">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Time</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                  <th className="px-6 py-4">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredTransactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer"
                    onClick={() => router.push(`/debts/${id}/transactions/${tx.id}`)}
                  >
                    <td className="px-6 py-4 text-gray-800 dark:text-white">{tx.date || '-'}</td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{tx.time || '-'}</td>
                    <td className="px-6 py-4 flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      {renderIcon(tx.type)}
                      <span>{renderTypeText(tx.type)}</span>
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-gray-800 dark:text-white">
                      {typeof tx.amount === "number" ? `$${tx.amount.toFixed(2)}` : '-'}
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{tx.description || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4 mt-4">
            {filteredTransactions.map((tx) => (
              <div
                key={tx.id}
                onClick={() => router.push(`/debts/${id}/transactions/${tx.id}`)}
                className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow border border-gray-200 dark:border-gray-700 hover:shadow-md transition cursor-pointer"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                    {renderIcon(tx.type)}
                    <span>{renderTypeText(tx.type)}</span>
                  </div>
                  <div className="text-base font-bold text-gray-800 dark:text-white">
                    {typeof tx.amount === "number" ? `$${tx.amount.toFixed(2)}` : '-'}
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  {tx.date || '-'} at {tx.time || '-'}
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-200">{tx.description || '-'}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {isModalOpen && (
        <Modal
          title="Add Record"
          description="Select what you want to trace:"
          buttons={buttons}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
