'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { AccountService, CategoryService, TransactionRequestDTO, TransactionsService } from '@/api-client';
import toast from 'react-hot-toast';
import { FiFileText } from 'react-icons/fi';
import { Category } from '@/types';
import useSWR from 'swr';
import Modal from '@/components/common/model';
import { Folder, Pencil } from 'lucide-react';
import {
  BusFront, Bike, TrainFront, CircleParking, Fuel, UtensilsCrossed, Sandwich,
  Wine, Apple, IceCreamCone, Pizza, Cake, Shirt, ShoppingCart, ShoppingBag,
  CirclePercent, Film, Clapperboard, TvMinimalPlay
} from 'lucide-react';

type FormData = {
  type: number;
  date: string;
  time: string;
  amount: string;
  category: CategoryOptionItem;
  account: AccountOptionItem;
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
type TabType = (typeof tabs)[number];

const iconMap: Record<string, React.ElementType> = {
  bus: BusFront,
  bike: Bike,
  train: TrainFront,
  parking: CircleParking,
  fuel: Fuel,
  utensils: UtensilsCrossed,
  sandwich: Sandwich,
  wine: Wine,
  apple: Apple,
  icecream: IceCreamCone,
  pizza: Pizza,
  cake: Cake,
  shirt: Shirt,
  cart: ShoppingCart,
  bag: ShoppingBag,
  discount: CirclePercent,
  film: Film,
  clapper: Clapperboard,
  tv: TvMinimalPlay,
};
const tabIndexToType = (index: number): TransactionRequestDTO.type => {
  switch (index) {
    case 0: return TransactionRequestDTO.type._2; // Expense = '2'
    case 1: return TransactionRequestDTO.type._1; // Income = '1'
    case 2: return TransactionRequestDTO.type._3; // Transfer = '3'
    default: return TransactionRequestDTO.type._2;
  }
};

// Helper to map TransactionRequestDTO.type to tab index
const typeToTabIndex = (type: TransactionRequestDTO.type | number): number => {
  switch (type) {
    case TransactionRequestDTO.type._2:
    case 2:
      return 0; // Expense
    case TransactionRequestDTO.type._1:
    case 1:
      return 1; // Income
    case TransactionRequestDTO.type._3:
    case 3:
      return 2; // Transfer
    default:
      return 0;
  }
};

const fetchCategories = async (tab: TabType): Promise<Category[] | undefined> => {
  if (tab === 'Expense') {
    const response = await CategoryService.getAllExpenseCategories();
    return response.data as Category[];
  }
  if (tab === 'Income') {
    const response = await CategoryService.getAllIncomeCategories();
    return response.data as Category[];
  }
  return undefined;
};

const fetchDefaultCategorie = async (tab: TabType): Promise<Category | undefined> => {
  if (tab === 'Expense') {
    const response = await CategoryService.getDefaultExpenseCategory();
    return response.data as Category;
  }
  if (tab === 'Income') {
    const response = await CategoryService.getDefaultIncomeCategory();
    return response.data as Category;
  }
  return undefined;
};

const fetchDefaultAccount = async (): Promise<AccountOptionItem> => {
  const response = await AccountService.getDefaultPaymentMode()
  return response.data as AccountOptionItem;
};

const TransactionForm: React.FC<TransactionFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [updating, setUpdating] = useState(false);
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
      type: initialData?.type || 1,
      date: initialData?.date || new Date().toISOString().slice(0, 10),
      time: initialData?.time || new Date().toISOString().slice(11, 16),
      amount: initialData?.amount || '',
      category: initialData?.category || undefined,
      account: initialData?.account || undefined,
      description: initialData?.description || '',
    },
  });
  const activeType = watch('type');
  const tabIndex = typeToTabIndex(activeType);

  const {
    data: categories
  } = useSWR(['categories', tabIndex], () => fetchCategories(tabs[tabIndex]));

  const {
    data: defaultCategorie
  } = useSWR(['defaultCategorie', tabIndex], () => fetchDefaultCategorie(tabs[tabIndex]));
  const {
    data: defaultAccounts
  } = useSWR(['defaultAccounts'], () => fetchDefaultAccount());

  const selectedCategory = watch('category');
  const selectedCategoryId = selectedCategory?.id;

  useEffect(() => {
    if (!initialData?.id && defaultCategorie) {
      setValue('category', defaultCategorie);
    }
  }, [defaultCategorie, initialData?.id, setValue]);

  useEffect(() => {
    if (defaultAccounts) {
      setValue('account', defaultAccounts);
    }
  }, [defaultAccounts, initialData?.id, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      const payload: TransactionRequestDTO = {
        type: String(data.type) as TransactionRequestDTO.type,
        date: data.date,
        amount: parseFloat(data.amount),
        categoryId: data.category.id,
        accountId: data.account.id,
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
  const handleSetDefault = async (categoryId: string) => {
    setUpdating(true);
    try {
      // Implement your logic to set default category here
      // For example, call an API to set the default category
      const foundCategory = categories?.find((cat) => cat.id === categoryId);
      if (foundCategory) {
        setValue('category', foundCategory);
      }
      setModalOpen(false);
      toast.success('Default category set!');
    } catch {
      toast.error('Failed to set default category.');
    } finally {
      setUpdating(false);
    }
  };
  const buttonItems = categories
    ?.filter((cat) => cat.id !== defaultCategorie?.id)
    .map((cat) => ({
      id: cat.id,
      label: cat.name,
      description: cat.type === 1 ? 'Expense Category' : 'Income Category',
      icon: (() => {
        const IconComponent = iconMap[cat.icon];
        return IconComponent ? <IconComponent className="w-5 h-5" /> : <Folder className="w-5 h-5" />;
      })(),
      bgColorClass:
        selectedCategoryId === cat.id
          ? 'bg-blue-600'
          : 'bg-gray-100 dark:bg-gray-800',
      textColorClass:
        selectedCategoryId === cat.id
          ? 'text-white'
          : 'text-gray-800 dark:text-white',
      iconColorClass:
        selectedCategoryId === cat.id
          ? `bg-${cat.color} text-blue-600`
          : `bg-${cat.color} text-gray-700 dark:text-gray-200`,
      hoverBgColorClass:
        selectedCategoryId === cat.id
          ? 'hover:bg-blue-700'
          : 'hover:bg-gray-200 dark:hover:bg-gray-700',
      onClick: async () => {
        setValue('category', cat);
      },
    }));
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl w-full space-y-6"
      >
        {/* Tabs */}
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-full p-1 mb-6 max-w-md mx-auto">
          {tabs.map((tab, index) => {
            const active = tabIndex === index;
            return (
              <button
                type="button"
                key={tab}
                onClick={() => setValue('type', Number(tabIndexToType(index)))}
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
        <div className="grid grid-cols-2 gap-4 items-center">
          <div>
            <label className="block mb-1 font-medium">Category</label>
            {watch('category') && (
              <div className="text-sm mt-1 flex items-center gap-2 text-gray-600 dark:text-gray-300">
                {
                  watch('category')?.name
                }
              </div>
            )}
            {errors.category && <p className="text-red-500 text-sm mt-1">Required</p>}
          </div>
          <div>
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center text-sm text-blue-600 hover:underline"
            >
              <Pencil className="w-4 h-4 mr-1" />
              Edit
            </button>
          </div>
        </div>

        {/* Account with preview */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <div>
            <label className="block mb-1 font-medium">Account</label>
            {watch('account') && (
              <div className="text-sm mt-1 flex items-center gap-2 text-gray-600 dark:text-gray-300">
                {
                  watch('account')?.name
                }
              </div>
            )}
            {errors.category && <p className="text-red-500 text-sm mt-1">Required</p>}
          </div>
          <div>
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center text-sm text-blue-600 hover:underline"
            >
              <Pencil className="w-4 h-4 mr-1" />
              Edit
            </button>
          </div>
        </div>
        <div>
          <h6>Other details</h6>
          {/* Description */}
          <div className="relative">
            <FiFileText className="absolute left-3 top-3 text-gray-400" />
            <textarea
              {...register('description')}
              rows={3}
              placeholder="write to Note"
              className="w-full pl-10 pr-3 py-2 bg-gray-100 dark:bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Select Default Category"
        description="Choose a category to set as default."
        buttons={buttonItems ?? []}
        selectedId={selectedCategoryId}
        onSelect={(id) => {
          const cat = categories?.find((c) => c.id === id);
          if (cat) setValue('category', cat);
        }}
        onConfirm={() => {
          if (selectedCategoryId) {
            handleSetDefault(selectedCategoryId);
          }
        }}
        confirmDisabled={!selectedCategoryId}
        loading={updating}
        confirmText="Set Default"
      />
    </>
  );
};

export default TransactionForm;
