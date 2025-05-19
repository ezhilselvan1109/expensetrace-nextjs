'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ArrowDownCircle, ArrowUpCircle, Repeat } from 'lucide-react';

type Transaction = {
  id: string;
  type: number;
  date: string;
  time: string;
  amount: number;
  description: string;
};

type PaginatedResponse = {
  content: Transaction[];
  totalPages: number;
  number: number;
  totalElements: number;
};

export default function ClientPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;

  const router = useRouter();

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const res = await axios.get<{
          data: PaginatedResponse;
        }>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions?page=${page}&size=${pageSize}`, {
          withCredentials: true,
        });

        setTransactions(res.data.data.content);
        setTotalPages(res.data.data.totalPages);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [page]);

  const renderIcon = (type: number) => {
    if (type === 1) return <ArrowDownCircle className="text-green-500" size={18} />;
    if (type === 2) return <ArrowUpCircle className="text-red-500" size={18} />;
    return <Repeat className="text-blue-500" size={18} />;
  };

  const renderTypeText = (type: number) => {
    return type === 1 ? 'Income' : type === 2 ? 'Expense' : 'Transfer';
  };

  const handlePrevious = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Transactions</h1>
        <button
          onClick={() => router.push('/transactions/add')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl shadow transition"
        >
          + Add Transaction
        </button>
      </div>

      {loading ? (
        <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-26 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse" />
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
                {transactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer"
                    onClick={() => router.push(`/transactions/update/${tx.id}`)}
                  >
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-100">{tx.date}</td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-100">{tx.time}</td>
                    <td className="px-6 py-4 flex items-center gap-2 text-gray-800 dark:text-gray-100">
                      {renderIcon(tx.type)}
                      <span>{renderTypeText(tx.type)}</span>
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-gray-800 dark:text-gray-100">
                      ${tx.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-100">
                      {tx.description || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4 mt-4">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                onClick={() => router.push(`/transactions/update/${tx.id}`)}
                className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow border border-gray-200 dark:border-gray-700 hover:shadow-md transition cursor-pointer"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                    {renderIcon(tx.type)}
                    <span>{renderTypeText(tx.type)}</span>
                  </div>
                  <div className="text-base font-bold text-gray-800 dark:text-white">
                    ${tx.amount.toFixed(2)}
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  {tx.date} at {tx.time}
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-200">
                  {tx.description || '-'}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={handlePrevious}
              disabled={page === 0}
              className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white disabled:opacity-50"
            >
              Previous
            </button>
            <span className="self-center text-gray-700 dark:text-gray-300">
              Page {page + 1} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={page >= totalPages - 1}
              className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
