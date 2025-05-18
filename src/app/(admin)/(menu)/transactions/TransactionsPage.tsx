'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type Transaction = {
  id: string;
  type: number;
  date: string;
  time: string;
  amount: number;
  description: string;
};

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions`, {
          withCredentials: true,
        });
        setTransactions(res.data.data);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <button
          onClick={() => router.push('/transactions/add')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Transaction
        </button>
      </div>

      {loading ? (
        <p>Loading transactions...</p>
      ) : transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Time</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
              <th className="border border-gray-300 px-4 py-2 text-right">Amount</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr
                key={tx.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => router.push(`/transactions/update/${tx.id}`)}
              >
                <td className="border border-gray-300 px-4 py-2">{tx.date}</td>
                <td className="border border-gray-300 px-4 py-2">{tx.time}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {tx.type === 1 ? 'Income' : tx.type === 2 ? 'Expense' : 'Transfer'}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right">${tx.amount.toFixed(2)}</td>
                <td className="border border-gray-300 px-4 py-2">{tx.description || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
