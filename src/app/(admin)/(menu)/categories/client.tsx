'use client';

import Link from 'next/link';
import { useState } from 'react';
import useSWR from 'swr';
import { CategoryService } from '@/api-client';
import {
  BusFront,
  Bike,
  TrainFront,
  CircleParking,
  Fuel,
  UtensilsCrossed,
  Sandwich,
  Wine,
  Apple,
  IceCreamCone,
  Pizza,
  Cake,
  Shirt,
  ShoppingCart,
  ShoppingBag,
  CirclePercent,
  Film,
  Clapperboard,
  TvMinimalPlay,
} from 'lucide-react';

const tabs = ['Expense', 'Income'] as const;
type TabType = (typeof tabs)[number];

interface Category {
  id: string;
  name: string;
  type: number;
  color: string;
  icon: string;
}

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

const fetchCategories = async (tab: TabType): Promise<Category[]> => {
  const response =
    tab === 'Expense'
      ? await CategoryService.getAllExpenseCategories()
      : await CategoryService.getAllIncomeCategories();

  return response.data as Category[];
};

export default function CategoryList() {
  const [activeTab, setActiveTab] = useState<TabType>('Expense');

  const {
    data: categories,
    isLoading,
    error,
  } = useSWR(['categories', activeTab], () => fetchCategories(activeTab));

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Link
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          href="/categories/add"
        >
          Create Category
        </Link>
      </div>

      <div className="max-w-lg mx-auto mt-10 px-4 text-gray-800 dark:text-gray-100">
        {/* Tabs */}
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-full p-1 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab
                  ? 'bg-white dark:bg-gray-900 shadow text-black dark:text-white'
                  : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Category List */}
        {isLoading ? (
          <p className="text-center text-sm">Loading {activeTab} categories...</p>
        ) : error ? (
          <p className="text-center text-sm text-red-500">Failed to load categories</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {categories?.map((category) => {
              const IconComponent = iconMap[category.icon];
              return (
                <div
                  key={category.id}
                  className="flex items-center space-x-3 p-3 border rounded-lg shadow-sm"
                >
                  <div
                    className="p-2 rounded-full"
                    style={{ backgroundColor: category.color }}
                  >
                    {IconComponent ? (
                      <IconComponent size={20} color="#fff" />
                    ) : (
                      <span className="text-xs text-white">?</span>
                    )}
                  </div>
                  <div className="text-sm font-medium">{category.name}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
