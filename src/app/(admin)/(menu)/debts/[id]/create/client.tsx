'use client';

import { DebtTransactionRequestDto, DebtTransactionsService } from '@/api-client';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function CreateDebtTransactionPage() {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const parsedType = type === '1' || type === '2' || type === '3'
    ? (type as DebtTransactionRequestDto.type)
    : undefined;

  const [form, setForm] = useState<DebtTransactionRequestDto>({
    date: '',
    amount: 0,
    description: '',
    accountId: '', // Ideally you fetch account list
    type: parsedType,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await DebtTransactionsService.addDebtTransaction(id as string, form);
      router.push(`/debts/${id}`);
    } catch {
      alert('Error creating debt');
    }

  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Initial Transaction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded border"
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded border"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded border"
        />
        <input
          type="text"
          name="accountId"
          placeholder="Account ID"
          value={form.accountId}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded border"
          required
        />
        <button type="submit" className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Add Transaction
        </button>
      </form>
    </div>
  );
}
