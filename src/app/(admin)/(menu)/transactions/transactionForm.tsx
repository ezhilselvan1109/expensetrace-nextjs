'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type FormData = {
  type: string; // '1' | '2' | '3'
  date: string; // yyyy-mm-dd
  time: string; // hh:mm
  amount: string; // number string
  categoryId: string;
  accountId: string;
  description?: string;
};

type TransactionFormProps = {
  initialData?: Partial<FormData & { id: string }>;
};

type OptionItem = {
  id: string;
  name: string;
};

const TransactionForm: React.FC<TransactionFormProps> = ({ initialData }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      type: initialData?.type || '1',
      date: initialData?.date || new Date().toISOString().slice(0, 10),
      time: initialData?.time || new Date().toISOString().slice(11, 16),
      amount: initialData ? initialData.amount : '',
      categoryId: initialData?.categoryId || '',
      accountId: initialData?.accountId || '',
      description: initialData?.description || '',
    },
  });

  const [categories, setCategories] = useState<OptionItem[]>([]);
  const [accounts, setAccounts] = useState<OptionItem[]>([]);

  const activeType = watch('type');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories?type=${activeType}`,
          { withCredentials: true }
        );
        setCategories(res.data.data);
        if (!res.data.data.find((cat: OptionItem) => cat.id === watch('categoryId'))) {
          setValue('categoryId', '');
        }
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };

    const fetchAccounts = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/all`,
          { withCredentials: true }
        );
        setAccounts(res.data.data);
        if (!res.data.data.find((acc: OptionItem) => acc.id === watch('accountId'))) {
          setValue('accountId', '');
        }
      } catch (error) {
        console.error('Failed to fetch accounts', error);
      }
    };

    fetchCategories();
    fetchAccounts();
  }, [activeType, setValue, watch]);

  const onSubmit = async (data: FormData) => {
    try {
      if (initialData?.id) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions/${initialData.id}`,
          {
            type: parseInt(data.type),
            date: data.date,
            time: data.time,
            amount: parseFloat(data.amount),
            categoryId: data.categoryId,
            accountId: data.accountId,
            description: data.description,
          },
          { withCredentials: true }
        );
        alert('✅ Transaction updated!');
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions`,
          {
            type: parseInt(data.type),
            date: data.date,
            time: data.time,
            amount: parseFloat(data.amount),
            categoryId: data.categoryId,
            accountId: data.accountId,
            description: data.description,
          },
          { withCredentials: true }
        );
        alert('✅ Transaction created!');
        reset();
      }
    } catch (error) {
      console.error('Failed to submit transaction', error);
      alert('❌ Failed to submit transaction.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md">
      {/* Type */}
      <div>
        <label className="block font-semibold mb-1">Transaction Type</label>
        <select
          {...register('type', { required: true })}
          className="w-full border border-gray-300 rounded px-3 py-2"
          disabled={!!initialData?.id}
        >
          <option value="1">Income</option>
          <option value="2">Expense</option>
          <option value="3">Transfer</option>
        </select>
        {errors.type && <p className="text-red-600 text-sm mt-1">Please select a type</p>}
      </div>

      {/* Date */}
      <div>
        <label className="block font-semibold mb-1">Date</label>
        <input
          type="date"
          {...register('date', { required: true })}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        {errors.date && <p className="text-red-600 text-sm mt-1">Date is required</p>}
      </div>

      {/* Time */}
      <div>
        <label className="block font-semibold mb-1">Time</label>
        <input
          type="time"
          {...register('time', { required: true })}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        {errors.time && <p className="text-red-600 text-sm mt-1">Time is required</p>}
      </div>

      {/* Amount */}
      <div>
        <label className="block font-semibold mb-1">Amount</label>
        <input
          type="number"
          step="0.01"
          {...register('amount', { required: true, min: 0.01 })}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="0.00"
        />
        {errors.amount && <p className="text-red-600 text-sm mt-1">Enter a valid amount</p>}
      </div>

      {/* Category */}
      <div>
        <label className="block font-semibold mb-1">Category</label>
        <select
          {...register('categoryId', { required: true })}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.categoryId && <p className="text-red-600 text-sm mt-1">Category is required</p>}
      </div>

      {/* Account */}
      <div>
        <label className="block font-semibold mb-1">Account</label>
        <select
          {...register('accountId', { required: true })}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Select account</option>
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.name}
            </option>
          ))}
        </select>
        {errors.accountId && <p className="text-red-600 text-sm mt-1">Account is required</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block font-semibold mb-1">Description (optional)</label>
        <textarea
          {...register('description')}
          rows={3}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Notes or description"
        />
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {initialData ? (isSubmitting ? 'Updating...' : 'Update Transaction') : isSubmitting ? 'Saving...' : 'Add Transaction'}
        </button>

        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => {
            if (initialData?.id) {
              router.back();
            } else {
              reset();
            }
          }}
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
