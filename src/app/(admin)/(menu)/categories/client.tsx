'use client';

import Link from 'next/link';
import { useState } from 'react';

const tabs = ['Expense', 'Income'] as const;


export default function CategoryForm() {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>('Expense');

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold">Categories</h1>
        </div>
        <Link
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          href="/categories/add"
        >
          Create Categorie
        </Link>
      </div>
      <div className="max-w-lg mx-auto mt-10 px-4 text-gray-800 dark:text-gray-100">
        {/* Tabs */}
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-full p-1 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${activeTab === tab
                ? 'bg-white dark:bg-gray-900 shadow text-black dark:text-white'
                : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
