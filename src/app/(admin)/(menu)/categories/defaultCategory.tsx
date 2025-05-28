'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Pencil, X, Check,
} from 'lucide-react';

import { CategoryService } from '@/api-client'; // Make sure CategoryService has setDefaultExpenseCategory and setDefaultIncomeCategory

type Category = {
  id: string;
  name: string;
  type: number;
};

type Props = {
  defaultCategorie: Category | undefined;
  defaultIsLoading: boolean;
  defaultError: boolean;
  categories: Category[];
};

export default function DefaultCategoryEditor({ defaultCategorie, defaultIsLoading, defaultError, categories }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  const handleSetDefault = async () => {
    if (!selectedCategoryId) return;

    setUpdating(true);
    try {
      const selected = categories.find((cat) => cat.id === selectedCategoryId);
      if (!selected) return;

      if (selected.type === 1) {
        await CategoryService.updateDefaultExpenseCategory(selected.id);
      } else if (selected.type === 2) {
        await CategoryService.updateDefaultIncomeCategory(selected.id);
      }

      setModalOpen(false);
      router.refresh();
    } catch (error) {
      console.error('Failed to update default category', error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className='pb-4'>
      {defaultIsLoading ? (
        <div className="h-26 pb-2 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
      ) : defaultError ? (
        <p className="text-center text-sm text-red-500">Failed to load default category</p>
      ) : (
        <div className="flex flex-row justify-between items-center p-3 border rounded-lg shadow-sm">
          <div>
            <div className="text-sm font-semibold">Default Category</div>
            <span className="text-xs text-gray-600 dark:text-gray-300">{defaultCategorie?.name}</span>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center text-sm text-blue-600 hover:underline"
          >
            <Pencil className="w-4 h-4 mr-1" />
            Edit
          </button>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Select Default Category</h2>
              <button onClick={() => setModalOpen(false)}>
                <X className="w-5 h-5 text-gray-500 hover:text-gray-700 dark:text-gray-300" />
              </button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategoryId(cat.id)}
                  className={`w-full flex justify-between items-center p-2 rounded-md border transition-all ${
                    selectedCategoryId === cat.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <span>{cat.name}</span>
                  {selectedCategoryId === cat.id && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-sm rounded-md bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSetDefault}
                disabled={!selectedCategoryId || updating}
                className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {updating ? 'Updating...' : 'Set Default'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
