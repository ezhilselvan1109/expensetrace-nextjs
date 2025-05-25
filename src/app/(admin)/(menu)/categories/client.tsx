'use client';

import { useState } from 'react';

const tabs = ['Expense', 'Income'];

const colorOptions = [
  { label: 'Red', value: '#EF4444' },
  { label: 'Blue', value: '#3B82F6' },
  { label: 'Green', value: '#10B981' },
  { label: 'Yellow', value: '#F59E0B' },
  { label: 'Purple', value: '#8B5CF6' },
  { label: 'Gray', value: '#6B7280' },
];

const iconOptions = {
  food: [
    { label: '🍔', value: '🍔' },
    { label: '🍕', value: '🍕' },
    { label: '🍣', value: '🍣' },
    { label: '🍜', value: '🍜' },
  ],
  travel: [
    { label: '✈️', value: '✈️' },
    { label: '🚆', value: '🚆' },
    { label: '🚌', value: '🚌' },
    { label: '🚗', value: '🚗' },
  ],
  shopping: [
    { label: '🛒', value: '🛒' },
    { label: '🛍️', value: '🛍️' },
    { label: '👗', value: '👗' },
    { label: '📦', value: '📦' },
  ],
  others: [
    { label: '💡', value: '💡' },
    { label: '⚽', value: '⚽' },
    { label: '🎮', value: '🎮' },
    { label: '📚', value: '📚' },
    { label: '⚪️', value: '⚪️' }, // default icon
  ],
};

export default function Client() {
  const [activeTab, setActiveTab] = useState('Expense');
  const [form, setForm] = useState({
    name: '',
    color: '#3B82F6', // default blue
    icon: '⚪️', // default icon
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFormChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const buildPayload = () => ({
    name: form.name,
    type: activeTab === 'Expense' ? '1' : '2',
    color: form.color,
    icon: form.icon,
  });

  const handleSubmit = async () => {
    setLoading(true);
    setMessage('');
    try {
      const payload = buildPayload();

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        await response.json();
        setMessage('✅ Category added successfully');
      } else {
        const error = await response.text();
        setMessage(`❌ Failed: ${error}`);
      }
    } catch (err: unknown) {
      if (err instanceof Error) setMessage(`❌ Error: ${err.message}`);
      else setMessage('❌ An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const PillInput = ({
    id,
    label,
    type = 'text',
    value,
    onChange,
    placeholder,
  }: {
    id: string;
    label: string;
    type?: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
  }) => (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder || label}
      className="w-full rounded-full bg-gray-100 dark:bg-gray-800 px-5 py-3 text-gray-800 dark:text-gray-100 shadow-inner border border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
    />
  );

  const ColorPicker = ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (color: string) => void;
  }) => (
    <div className="flex gap-3 flex-wrap justify-center md:justify-start">
      {colorOptions.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`w-10 h-10 rounded-full transition-all border-2 flex justify-center items-center text-white text-xl ${
            value === opt.value
              ? 'border-black dark:border-white scale-110 shadow-lg'
              : 'border-transparent opacity-70 hover:opacity-100'
          }`}
          style={{ backgroundColor: opt.value }}
          aria-label={`Select color ${opt.label}`}
        />
      ))}
    </div>
  );

  const IconCategory = ({
    category,
    icons,
    selected,
    onSelect,
    color,
  }: {
    category: string;
    icons: { label: string; value: string }[];
    selected: string;
    onSelect: (icon: string) => void;
    color: string;
  }) => (
    <div className="mb-6">
      <h4 className="text-lg font-semibold mb-3 capitalize text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-600 pb-1">
        {category}
      </h4>
      <div className="flex flex-wrap gap-3">
        {icons.map((opt) => {
          const isSelected = selected === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSelect(opt.value)}
              className={`text-3xl rounded-full px-3 py-1 transition border-2 flex justify-center items-center ${
                isSelected
                  ? 'border-black dark:border-white scale-110 shadow'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
              style={{
                backgroundColor: isSelected ? color : 'transparent',
              }}
              aria-label={`Select icon ${opt.label}`}
            >
              {opt.value}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-lg mx-auto mt-10 px-4 text-gray-800 dark:text-gray-100">
      {/* Tabs */}
      <div className="flex bg-gray-100 dark:bg-gray-800 rounded-full p-1 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 text-sm font-medium rounded-full py-2 transition-all duration-200 ${
              activeTab === tab
                ? 'bg-white dark:bg-gray-900 shadow text-black dark:text-white'
                : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* First row: Icon with bg + name input */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <div
          className="w-16 h-16 rounded-full flex justify-center items-center text-4xl flex-shrink-0"
          style={{ backgroundColor: form.color }}
          aria-label="Selected icon preview"
        >
          {form.icon}
        </div>

        <div className="flex-grow">
          <PillInput
            id="name"
            label="Category Name"
            value={form.name}
            onChange={(e) => handleFormChange('name', e.target.value)}
          />
        </div>
      </div>

      {/* Second row: Color picker */}
      <div className="mb-6">
        <ColorPicker
          value={form.color}
          onChange={(color) => handleFormChange('color', color)}
        />
      </div>

      {/* Third row: Icon categories */}
      <div>
        {Object.entries(iconOptions).map(([category, icons]) => (
          <IconCategory
            key={category}
            category={category}
            icons={icons}
            selected={form.icon}
            onSelect={(icon) => handleFormChange('icon', icon)}
            color={form.color}
          />
        ))}
      </div>

      {/* Submit button */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className={`w-full mt-4 py-3 rounded-full flex justify-center items-center gap-2 transition ${
          loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        } text-white`}
      >
        {loading && (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        )}
        {loading ? 'Submitting...' : `Add ${activeTab}`}
      </button>

      {message && (
        <div
          className={`text-center text-sm mt-4 ${
            message.startsWith('✅') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
