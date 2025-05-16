'use client';

import { useState } from 'react';

const tabs = ['Bank Account', 'Wallet', 'Credit Card'];
const paymentTypes = ['UPI', 'Check', 'Debit Card', 'Internet Banking'];
const daysOfMonth = Array.from({ length: 31 }, (_, i) => i + 1);

export default function SegmentedTabs() {
  const [activeTab, setActiveTab] = useState('Bank Account');
  const [paymentModes, setPaymentModes] = useState([
    { id: Date.now(), name: '', type: 'UPI' },
  ]);

  const [billingStartDay, setBillingStartDay] = useState(1);
  const [dueDateDay, setDueDateDay] = useState(1);

  const handleChange = (id: number, field: 'name' | 'type', value: string) => {
    setPaymentModes((prev) =>
      prev.map((mode) =>
        mode.id === id ? { ...mode, [field]: value } : mode
      )
    );
  };

  const addPaymentMode = () => {
    setPaymentModes([
      ...paymentModes,
      { id: Date.now(), name: '', type: 'UPI' },
    ]);
  };

  const removePaymentMode = (id: number) => {
    setPaymentModes((prev) => prev.filter((mode) => mode.id !== id));
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

  // Segmented day picker as inline buttons
  const DaySegmentedPicker = ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: number;
    onChange: (val: number) => void;
  }) => (
    <div>
      <label className="block mb-1 font-semibold">{label}</label>
      <div className="flex flex-wrap gap-1 max-h-36 overflow-y-auto border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-900">
        {daysOfMonth.map((day) => (
          <button
            key={day}
            type="button"
            onClick={() => onChange(day)}
            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition ${
              value === day
                ? 'bg-blue-600 text-white shadow'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-700'
            }`}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-md mx-auto mt-10 px-4 text-gray-800 dark:text-gray-100">
      {/* Tabs */}
      <div className="flex bg-gray-100 dark:bg-gray-800 rounded-full p-1">
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

      {/* Content */}
      <div className="mt-6 space-y-6">
        {activeTab === 'Bank Account' && (
          <form className="space-y-6">
            <PillInput id="bank-name" label="Name" />
            <PillInput id="bank-balance" label="Current Balance" type="number" />

            <div>
              <label className="block mb-2 font-medium">
                Linked Payment Modes
              </label>

              {paymentModes.map((mode, index) => (
                <div key={mode.id} className="mb-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <input
                      type="text"
                      value={mode.name}
                      onChange={(e) =>
                        handleChange(mode.id, 'name', e.target.value)
                      }
                      placeholder={`Payment Mode Name ${index + 1}`}
                      className="flex-1 rounded-full bg-gray-100 dark:bg-gray-800 px-5 py-3 text-gray-800 dark:text-gray-100 shadow-inner border border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
                    />
                    {paymentModes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePaymentMode(mode.id)}
                        className="text-red-600 dark:text-red-400 hover:underline text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {paymentTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleChange(mode.id, 'type', type)}
                        className={`px-4 py-1 text-sm rounded-full border transition ${
                          mode.type === type
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addPaymentMode}
                className="mt-2 text-blue-600 dark:text-blue-400 hover:underline text-sm"
              >
                + Add Payment Mode
              </button>
            </div>
          </form>
        )}

        {activeTab === 'Wallet' && (
          <form className="space-y-6">
            <PillInput id="wallet-name" label="Name" />
            <PillInput id="wallet-balance" label="Current Balance" type="number" />
          </form>
        )}

        {activeTab === 'Credit Card' && (
          <form className="space-y-6">
            <PillInput id="card-name" label="Name" />
            <PillInput
              id="card-available-limit"
              label="Current Available Limit"
              type="number"
            />
            <PillInput
              id="card-total-limit"
              label="Total Credit Limit"
              type="number"
            />
            <DaySegmentedPicker
              label="Billing Cycle Start Date (Day of Month)"
              value={billingStartDay}
              onChange={setBillingStartDay}
            />
            <DaySegmentedPicker
              label="Payment Due Date (Day of Month)"
              value={dueDateDay}
              onChange={setDueDateDay}
            />
          </form>
        )}
      </div>
    </div>
  );
}
