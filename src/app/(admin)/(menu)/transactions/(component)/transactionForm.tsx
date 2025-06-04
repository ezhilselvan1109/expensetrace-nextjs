'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { AccountService, CategoryService, TransactionRequestDTO, TransactionsService } from '@/api-client';
import toast from 'react-hot-toast';
import { FiTag, FiCreditCard, FiFileText } from 'react-icons/fi';

type FormData = {
  type: string;
  date: string;
  time: string;
  amount: string;
  categoryId: string;
  accountId: string;
  description?: string;
};

type TransactionFormProps = {
  initialData?: Partial<FormData & { id: string }>;
};

type AccountOptionItem = {
  id: string;
  name: string;
  default: boolean;
  type: number;
};

type CategoryOptionItem = {
  id: string;
  name: string;
  color: string;
  icon: string;
  type: number;
};

const tabs = ['Expense', 'Income', 'Transfer'] as const;

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
      amount: initialData?.amount || '',
      categoryId: initialData?.categoryId || '',
      accountId: initialData?.accountId || '',
      description: initialData?.description || '',
    },
  });

  const [categories, setCategories] = useState<CategoryOptionItem[]>([]);
  const [accounts, setAccounts] = useState<AccountOptionItem[]>([]);
  const activeType = watch('type');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await CategoryService.getAllCategories();
        setCategories(res.data as CategoryOptionItem[]);
        if (!(res.data ?? []).find((cat: CategoryOptionItem) => cat.id === watch('categoryId'))) {
          setValue('categoryId', '');
        }
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };

    const fetchAccounts = async () => {
      try {
        const res = await AccountService.getAllAccounts();
        setAccounts(res.data as AccountOptionItem[]);
        if (!(res.data ?? []).find((acc: AccountOptionItem) => acc.id === watch('accountId'))) {
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
      const payload: TransactionRequestDTO = {
        type: data.type as TransactionRequestDTO.type,
        date: data.date,
        amount: parseFloat(data.amount),
        categoryId: data.categoryId,
        accountId: data.accountId,
        description: data.description,
      };
      if (initialData?.id) {
        await TransactionsService.updateTransaction(initialData.id, payload);
        reset();
        router.push('/transactions');
      } else {
        await TransactionsService.createTransaction(payload);
        reset();
        router.push('/transactions');
      }
    } catch (error) {
      console.error('Failed to submit transaction', error);
      toast.error('Failed to submit transaction.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl w-full space-y-6"
    >
      {/* Tabs */}
      <div className="flex bg-gray-100 dark:bg-gray-800 rounded-full p-1 mb-6 max-w-md mx-auto">
        {tabs.map((tab, index) => {
          const value = (index + 1).toString();
          const active = watch('type') === value;
          return (
            <button
              type="button"
              key={tab}
              onClick={() => setValue('type', value)}
              className={`flex-1 text-sm font-medium rounded-full py-2 transition-all duration-200 ${active
                ? "bg-white dark:bg-gray-900 shadow text-black dark:text-white"
                : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
                }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Grid Fields */}
      <div className="grid grid-cols-2 gap-4">

        {/* Date */}
        <div>
          <label className="block mb-1 font-medium">Date</label>
          <input
              type="date"
              {...register('date', { required: true })}
              className="w-full pr-3 py-2 dark:bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">Required</p>}
          </div>

        {/* Time */}
        <div>
          <label className="block mb-1 font-medium">Time</label>
          <input
              type="time"
              {...register('time', { required: true })}
              className="w-full pr-3 py-2 dark:bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.time && <p className="text-red-500 text-sm mt-1">Required</p>}
          </div>
      </div>

      {/* Amount */}
      <div>
        <label className="block mb-1 font-medium">Amount</label>
        <input
            type="number"
            step="0.01"
            {...register('amount', { required: true, min: 0.01 })}
            placeholder="e.g. 100.00"
            className="w-full pr-3 py-2 dark:bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.amount && <p className="text-red-500 text-sm mt-1">Enter a valid amount</p>}
        </div>
      {/* Category with preview */}
      <div>
        <label className="block mb-1 font-medium">Category</label>
        <div className="relative">
          <FiTag className="absolute left-3 top-3 text-gray-400" />
          <select
            {...register('categoryId', { required: true })}
            className="w-full appearance-none pl-10 pr-8 py-2 bg-gray-100 dark:bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        {watch('categoryId') && (
          <div className="text-sm mt-1 flex items-center gap-2 text-gray-600 dark:text-gray-300">
            {
              categories.find((c) => c.id === watch('categoryId'))?.name || ''
            }
          </div>
        )}
        {errors.categoryId && <p className="text-red-500 text-sm mt-1">Required</p>}
      </div>

      {/* Account with preview */}
      <div>
        <label className="block mb-1 font-medium">Account</label>
        <div className="relative">
          <FiCreditCard className="absolute left-3 top-3 text-gray-400" />
          <select
            {...register('accountId', { required: true })}
            className="w-full appearance-none pl-10 pr-8 py-2 bg-gray-100 dark:bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select account</option>
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>{acc.name}</option>
            ))}
          </select>
        </div>
        {watch('accountId') && (
          <div className="text-sm mt-1 text-gray-600 dark:text-gray-300">
            {accounts.find((a) => a.id === watch('accountId'))?.name}
          </div>
        )}
        {errors.accountId && <p className="text-red-500 text-sm mt-1">Required</p>}
      </div>

      {/* Description */}
      <div className="relative">
        <FiFileText className="absolute left-3 top-3 text-gray-400" />
        <textarea
          {...register('description')}
          rows={3}
          placeholder="Notes or description"
          className="w-full pl-10 pr-3 py-2 bg-gray-100 dark:bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit Button */}
      <div className="text-right">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
        >
          {initialData ? (isSubmitting ? 'Updating...' : 'Update Transaction') : isSubmitting ? 'Saving...' : 'Add Transaction'}
        </button>
      </div>
    </form>

  );
};

export default TransactionForm;
