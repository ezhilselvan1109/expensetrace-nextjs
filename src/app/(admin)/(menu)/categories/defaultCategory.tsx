'use client';

import { useState } from 'react';
import { Pencil, Folder } from 'lucide-react';
import { mutate } from 'swr';

import { CategoryService } from '@/api-client';
import Modal from './(component)/model';

type Category = {
  id: string;
  name: string;
  type: number;
  icon: string; // Added icon property
  color: string;
};

interface Props {
  iconMap: Record<string, React.ElementType>;
  defaultCategorie: Category | undefined;
  defaultIsLoading: boolean;
  defaultError: boolean;
  categories: Category[];
}

export default function DefaultCategoryEditor({
  iconMap,
  defaultCategorie,
  defaultIsLoading,
  defaultError,
  categories,
}: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  
  const handleSetDefault = async (catId: string) => {
    setUpdating(true);
    try {
      const selected = categories.find((cat) => cat.id === catId);
      if (!selected) return;

      if (selected.type === 1) {
        await CategoryService.updateDefaultExpenseCategory(selected.id);
      } else if (selected.type === 2) {
        await CategoryService.updateDefaultIncomeCategory(selected.id);
      }
      mutate(['defaultCategorie', selected.type === 1 ? 'Expense' : 'Income'], selected, false);
      setSelectedCategoryId(null);
      setModalOpen(false);
    } catch (error) {
      console.error('Failed to update default category', error);
    } finally {
      setUpdating(false);
    }
  };

  const buttonItems = categories
  .filter((cat) => cat.id !== defaultCategorie?.id)
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
      setSelectedCategoryId(cat.id);
      await handleSetDefault(cat.id);
    },
  }));

  return (
    <div className="pb-4">
      {defaultIsLoading ? (
        <div className="h-26 pb-2 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
      ) : defaultError ? (
        <p className="text-center text-sm text-red-500">Failed to load default category</p>
      ) : (
        <div className="flex flex-row justify-between items-center p-3 border rounded-lg shadow-sm">
          <div>
            <div className="text-sm font-semibold">Default Category</div>
            <span className="text-xs text-gray-600 dark:text-gray-300">
              {defaultCategorie?.name}
            </span>
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

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Select Default Category"
        description="Choose a category to set as default."
        buttons={buttonItems}
        selectedId={selectedCategoryId}
        onSelect={(id) => setSelectedCategoryId(id)}
        onConfirm={() => {
          if (selectedCategoryId) {
            handleSetDefault(selectedCategoryId);
          }
        }}
        confirmDisabled={!selectedCategoryId}
        loading={updating}
        confirmText="Set Default"
      />
    </div>
  );
}
