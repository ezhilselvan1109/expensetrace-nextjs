'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import MultiSelectDropdown from './multiSelectDropdown';

type FormData = {
  type: string;
  date: string;
  time: string;
  amount: string;
  categoryId: string;
  accountId: string;
  description?: string;
};

const TransactionForm = () => {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [selectedTagNames, setSelectedTagNames] = useState<string[]>([]);

  // Track active tab for transaction type buttons
  const [activeType, setActiveType] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      type: '',
      date: new Date().toISOString().slice(0, 10),
      time: new Date().toISOString().slice(11, 16),
    },
  });

  // Sync activeType state with react-hook-form's 'type' field
  useEffect(() => {
    if (activeType) {
      setValue('type', activeType, { shouldValidate: true });
    }
  }, [activeType, setValue]);

  // Set default active type on mount if none selected
  useEffect(() => {
    if (!activeType) {
      setActiveType('1'); // Default to 'Income'
    }
  }, [activeType]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [accRes, catRes, tagRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/all`, { withCredentials: true }),
          axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`, { withCredentials: true }),
          axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tags/all`, { withCredentials: true }),
        ]);

        setAccounts(Object.values(accRes.data.data).flat());
        setCategories(catRes.data.data);
        setTags(tagRes.data.data);
      } catch (err) {
        console.error('Failed to load form data:', err);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions`,
        {
          type: parseInt(data.type),
          date: data.date,
          time: data.time,
          amount: parseFloat(data.amount),
          category: { id: data.categoryId },
          account: { id: data.accountId },
          description: data.description,
          tags: tags
            .filter((tag) => selectedTagNames.includes(tag.name))
            .map((tag) => ({ id: tag.id })),
        },
        { withCredentials: true }
      );

      reset();
      setSelectedTagNames([]);
      setActiveType('1'); // Reset to default Income tab
      alert('✅ Transaction created!');
    } catch (error) {
      console.error('Error creating transaction:', error);
      alert('❌ Failed to create transaction.');
    }
  };

  const tabs = [
    { label: 'Income', value: '1' },
    { label: 'Expense', value: '2' },
    { label: 'Transfer', value: '3' },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-6"
      noValidate
    >
      <h2 className="text-2xl font-bold text-gray-800">Add New Transaction</h2>

      {/* Transaction Type as segmented buttons */}
      <div>
        <label className="block font-medium text-gray-700 mb-2">Transaction Type</label>
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-full p-1 select-none">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveType(tab.value)}
              className={`flex-1 text-sm font-medium rounded-full py-2 transition-all duration-200 ${
                activeType === tab.value
                  ? 'bg-white dark:bg-gray-900 shadow text-black dark:text-white'
                  : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {errors.type && (
          <p className="text-sm text-red-600 mt-1">{errors.type.message || 'Type is required.'}</p>
        )}
        {/* Hidden input to register with react-hook-form */}
        <input type="hidden" {...register('type', { required: 'Transaction type is required.' })} value={activeType} readOnly />
      </div>

      {/* Date and Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            {...register('date', { required: 'Date is required.' })}
            className="w-full border rounded-lg p-2"
          />
          {errors.date && <p className="text-sm text-red-600 mt-1">{errors.date.message}</p>}
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Time</label>
          <input
            type="time"
            {...register('time', { required: 'Time is required.' })}
            className="w-full border rounded-lg p-2"
          />
          {errors.time && <p className="text-sm text-red-600 mt-1">{errors.time.message}</p>}
        </div>
      </div>

      {/* Amount */}
      <div>
        <label className="block font-medium text-gray-700 mb-1">Amount</label>
        <input
          type="number"
          step="0.01"
          {...register('amount', { required: 'Amount is required.' })}
          placeholder="0.00"
          className="w-full border rounded-lg p-2"
        />
        {errors.amount && <p className="text-sm text-red-600 mt-1">{errors.amount.message}</p>}
      </div>

      {/* Category */}
      <div>
        <label className="block font-medium text-gray-700 mb-1">Category</label>
        <select
          {...register('categoryId', { required: 'Category is required.' })}
          className="w-full border rounded-lg p-2"
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.categoryId && <p className="text-sm text-red-600 mt-1">{errors.categoryId.message}</p>}
      </div>

      {/* Account */}
      <div>
        <label className="block font-medium text-gray-700 mb-1">Account</label>
        <select
          {...register('accountId', { required: 'Account is required.' })}
          className="w-full border rounded-lg p-2"
        >
          <option value="">Select account</option>
          {accounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.name}
            </option>
          ))}
        </select>
        {errors.accountId && <p className="text-sm text-red-600 mt-1">{errors.accountId.message}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block font-medium text-gray-700 mb-1">Description</label>
        <input
          type="text"
          {...register('description')}
          placeholder="Optional note"
          className="w-full border rounded-lg p-2"
        />
      </div>

      {/* Tags (using custom dropdown) */}
      <div>
        <label className="block font-medium text-gray-700 mb-1">Tags</label>
        <MultiSelectDropdown
          options={tags.map((tag) => tag.name)}
          selected={selectedTagNames}
          setSelected={setSelectedTagNames}
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white rounded-lg py-3 flex items-center justify-center hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin h-5 w-5 mr-2" />
              Submitting...
            </>
          ) : (
            'Submit Transaction'
          )}
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
