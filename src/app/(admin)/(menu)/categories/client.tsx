'use client';

import { useState } from 'react';

const tabs = ['Expense', 'Income'];


export default function Client() {
  const [activeTab, setActiveTab] = useState('Expense');
  const [form, setForm] = useState({
    name: '',
    color: '',
    icon: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFormChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };


  const buildPayload = () => {
    const base = {
      name: form.name,
      type: activeTab === 'Expense' ? '1' : '2',
      color:form.color,
      icon:form.icon
    };
    return base;
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage('');
    try {
      const payload = buildPayload();

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        await response.json();
        setMessage('✅ categorie added successfully');
      } else {
        const error = await response.text();
        setMessage(`❌ Failed: ${error}`);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage(`❌ Error: ${err.message}`);
      } else {
        setMessage(`❌ An unexpected error occurred`);
      }
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

  return (
    <div className="w-full max-w-md mx-auto mt-10 px-4 text-gray-800 dark:text-gray-100">
      {/* Tabs */}
      <div className="flex bg-gray-100 dark:bg-gray-800 rounded-full p-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 text-sm font-medium rounded-full py-2 transition-all duration-200 ${activeTab === tab
              ? 'bg-white dark:bg-gray-900 shadow text-black dark:text-white'
              : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Form Content */}
      <div className="mt-6 space-y-6">
        <form className="space-y-6">
          <PillInput
            id="name"
            label="Name"
            value={form.name}
            onChange={(e) => handleFormChange('name', e.target.value)}
          />

          <PillInput
            id="color"
            label="Color"
            value={form.color}
            onChange={(e) => handleFormChange('color', e.target.value)}
          />

          <PillInput
            id="icon"
            label="icon"
            value={form.icon}
            onChange={(e) => handleFormChange('icon', e.target.value)}
          />


          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-3 rounded-full flex justify-center items-center gap-2 transition ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
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
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}
            {loading ? 'Submitting...' : `Add ${activeTab}`}
          </button>

          {message && (
            <div className={`text-center text-sm mt-4 ${message.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
