'use client';

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { DebtService } from "@/api-client";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  PlusCircle,
  Repeat,
  Trash2,
} from "lucide-react";
import Modal from "../(component)/modal";
import { DebtTransaction } from "@/types";
import { useDebtTransactions } from "@/hooks/useDebtTransactions";

export default function DebtTransactionsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'ALL' | 'PAID' | 'RECEIVED' | 'ADJUSTMENT'>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [tabPage, setTabPage] = useState({
    ALL: 0,
    PAID: 0,
    RECEIVED: 0,
    ADJUSTMENT: 0
  });

  const page = tabPage[activeTab];
  const { transactions, totalPages, isLoading } = useDebtTransactions(id as string, activeTab, page);
  console.log("transactions : " + transactions)
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

  const renderIcon = (type: number, size: number) => {
    if (type === 1) return <ArrowUpCircle className="text-red-600" size={size} />;
    if (type === 2) return <ArrowDownCircle className="text-green-600" size={size} />;
    return <Repeat className="text-blue-500" size={18} />;
  };

  const renderTypeText = (type: number) =>
    type === 1 ? "PAID" : type === 2 ? "RECEIVED" : type === 3 ? "ADJUSTMENT" : "ALL";


  const handleCreateTransaction = (type: number) => {
    setIsModalOpen(false);
    if (!id) return;
    router.push(`/debts/${id}/create?type=${type}`);
  };

  // const confirmDelete = () => {
  //   setIsDeleteModalOpen(true);
  // };

  const handleDeleteDebt = async () => {
    if (!id) return;
    try {
      await DebtService.deleteDebt(id as string);
      alert("Debt deleted successfully.");
      router.push("/debts");
    } catch (error) {
      console.error("Failed to delete debt", error);
      alert("Failed to delete debt. Please try again.");
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-wrap justify-between items-center gap-2 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Debt Transactions
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <PlusCircle size={16} />
          Add Record
        </button>
      </div>

      <div className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 hover:shadow-md transition cursor-pointer">
        <div className="flex flex-col mb-2">
          <div className="text-sm text-gray-900 dark:text-gray-100 font-medium mb-2">
            Total Payable
          </div>
          <div className="text-3xl font-bold text-red-600">
            {`₹`+600.0}
          </div>
          <div className="flex text-sm text-gray-600">
            Incorrect? <span className="flex text-gray-900 dark:text-gray-100">Edit</span>
          </div>
        </div>

        <div className="flex justify-between mb-2">
          <div className="flex flex-row items-center gap-2">
            {renderIcon(1, 45)}
            <div className="flex flex-col">
              <div className="text-sm text-gray-900 dark:text-gray-100 font-medium mb-2">
                Total Paid
              </div>
              <div className="text-md">
                {`₹`+600.0}
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2">
            {renderIcon(2, 45)}
            <div className="flex flex-col"><div className="text-sm text-gray-900 dark:text-gray-100 font-medium mb-2">
              Total Received
            </div>
              <div className="text-md">
                {`₹`+600.0}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Due
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {transactions.length} records
          </div>
        </div>
      </div>

      {/* <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Showing {transactions.length} transactions
        </div>
        <button
          onClick={confirmDelete}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
        >
          <Trash2 size={16} />
          Delete Debt
        </button>
      </div> */}

      {/* Tabs */}
      <div className="border-gray-200 dark:border-neutral-700 mb-4">
        <nav
          className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 rounded-xl"
          role="tablist"
        >
          {['ALL', 'PAID', 'RECEIVED', 'ADJUSTMENT'].map((value) => (
            <button
              key={value}
              onClick={() => setActiveTab(value as typeof activeTab)}
              type="button"
              className={`flex-1 text-sm font-medium rounded-xl py-2 transition-all duration-200
                ${activeTab === value
                  ? 'bg-white dark:bg-gray-900 shadow text-black dark:text-white'
                  : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'}
              `}
              role="tab"
              aria-selected={activeTab === value}
            >
              {value.charAt(0) + value.slice(1).toLowerCase()}
            </button>
          ))}
        </nav>
      </div>

      {isLoading ? (
        <div className="space-y-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-26 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : transactions.length === 0 ? (
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
                {transactions.map((transaction: DebtTransaction) => (
                  <tr
                    key={transaction.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer"
                    onClick={() => router.push(`/debts/${id}/transactions/${transaction.id}`)}
                  >
                    <td className="px-6 py-4 text-gray-800 dark:text-white">{transaction.date || '-'}</td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{transaction.time || '-'}</td>
                    <td className="px-6 py-4 flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      {renderIcon(transaction.type, 18)}
                      <span>{renderTypeText(transaction.type)}</span>
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-gray-800 dark:text-white">
                      {typeof transaction.amount === "number" ? `$${transaction.amount.toFixed(2)}` : '-'}
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{transaction.description || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4 mt-4">
            {transactions.map((transaction: DebtTransaction) => (
              <div
                key={transaction.id}
                onClick={() => router.push(`/debts/${id}/transactions/${transaction.id}`)}
                className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow border border-gray-200 dark:border-gray-700 hover:shadow-md transition cursor-pointer"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                    {renderIcon(transaction.type, 18)}
                    <span>{renderTypeText(transaction.type)}</span>
                  </div>
                  <div className="text-base font-bold text-gray-800 dark:text-white">
                    {typeof transaction.amount === "number" ? `$${transaction.amount.toFixed(2)}` : '-'}
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  {transaction.date || '-'} at {transaction.time || '-'}
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-200">{transaction.description || '-'}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          disabled={page === 0}
          onClick={() =>
            setTabPage((prev) => ({
              ...prev,
              [activeTab]: Math.max(0, prev[activeTab] - 1),
            }))
          }
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm disabled:opacity-50"
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() =>
              setTabPage((prev) => ({
                ...prev,
                [activeTab]: index,
              }))
            }
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
          onClick={() =>
            setTabPage((prev) => ({
              ...prev,
              [activeTab]: prev[activeTab] + 1,
            }))
          }
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm disabled:opacity-50"
        >
          Next
        </button>
      </div>
      {/* Add Record Modal */}
      {isModalOpen && (
        <Modal
          title="Add Record"
          description="Select what you want to trace:"
          buttons={buttons}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <Modal
          title="Delete Debt"
          description="Are you sure you want to delete this debt? This action cannot be undone."
          buttons={[
            {
              label: "Yes, Delete",
              description: "This will permanently remove the debt",
              icon: <Trash2 size={20} />,
              bgColorClass: "bg-red-50 dark:bg-red-900/20",
              iconColorClass: "bg-red-600 text-white",
              textColorClass: "text-red-600",
              hoverBgColorClass: "hover:bg-red-100 dark:hover:bg-red-800",
              onClick: handleDeleteDebt,
            },
            {
              label: "Cancel",
              description: "Go back without deleting",
              icon: <Repeat size={20} />,
              bgColorClass: "bg-gray-50 dark:bg-gray-800",
              iconColorClass: "bg-gray-400 text-white",
              textColorClass: "text-gray-700 dark:text-gray-200",
              hoverBgColorClass: "hover:bg-gray-100 dark:hover:bg-gray-700",
              onClick: () => setIsDeleteModalOpen(false),
            },
          ]}
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
}
