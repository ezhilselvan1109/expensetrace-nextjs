'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import TransactionForm from './transactionForm';
import { Loader2, Trash2, Pencil } from 'lucide-react';

export default function TransactionManager() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formDefaults, setFormDefaults] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions`, {
        withCredentials: true,
      });
      setTransactions(res.data.data || []);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleEdit = async (id: string) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions/${id}`, {
        withCredentials: true,
      });
      const data = res.data.data;
      setEditingId(id);
      setFormDefaults({
        ...data,
        type: String(data.type),
        amount: String(data.amount),
        time: data.time.slice(0, 5),
      });
    } catch (err) {
      console.error('Failed to load transaction:', err);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this transaction?');
    if (!confirmed) return;

    try {
      setLoading(true);
      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions/${id}`, {
        withCredentials: true,
      });
      await fetchTransactions();
    } catch (err) {
      console.error('Delete failed:', err);
      alert('❌ Delete failed');
    } finally {
      setLoading(false);
    }
  };

  const handleFormSuccess = async () => {
    setEditingId(null);
    setFormDefaults(null);
    await fetchTransactions();
  };

  return (
    <div className="space-y-10">
      <TransactionForm
        editId={editingId}
        defaultValues={formDefaults}
        onSuccess={handleFormSuccess}
      />

      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Transactions</h2>
        {loading && <Loader2 className="animate-spin" />}
        <ul className="space-y-4">
          {transactions.map((tx) => (
            <li
              key={tx.id}
              className="border p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="font-medium">
                  {tx.type === 1 ? 'Income' : tx.type === 2 ? 'Expense' : 'Transfer'} - $
                  {tx.amount}
                </p>
                <p className="text-sm text-gray-600">
                  {tx.date} {tx.time}
                </p>
                {tx.description && <p className="text-sm">{tx.description}</p>}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(tx.id)}
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  <Pencil size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(tx.id)}
                  className="text-red-600 hover:underline flex items-center gap-1"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
