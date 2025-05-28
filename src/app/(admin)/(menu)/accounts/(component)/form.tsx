'use client';

import { AccountService } from '@/api-client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const tabs = ['Bank Account', 'Wallet', 'Credit Card'];
const paymentTypes = ['UPI', 'Check', 'Debit Card', 'Internet Banking'];
const daysOfMonth = Array.from({ length: 31 }, (_, i) => i + 1);

const paymentTypeMap: Record<string, string> = {
  'UPI': '1',
  'Check': '2',
  'Debit Card': '3',
  'Internet Banking': '4',
};

export default function Form() {
  const [activeTab, setActiveTab] = useState('Bank Account');
  const router = useRouter();
  const [paymentModes, setPaymentModes] = useState([
    { id: Date.now(), name: '', type: 'UPI' },
  ]);

  const [billingStartDay, setBillingStartDay] = useState(1);
  const [dueDateDay, setDueDateDay] = useState(1);
  const [form, setForm] = useState({
    name: '',
    currentBalance: '',
    availableCredit: '',
    creditLimit: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFormChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

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

  const buildPayload = () => {
    const base = {
      name: form.name,
      type: activeTab === 'Bank Account' ? '1' : activeTab === 'Wallet' ? '2' : '3',
    };

    if (activeTab === 'Bank Account') {
      return {
        ...base,
        currentBalance: Number(form.currentBalance),
        paymentModesDto: paymentModes.map(({ name, type }) => ({
          name,
          type: paymentTypeMap[type] || '1',
        })),
      };
    } else if (activeTab === 'Wallet') {
      return {
        ...base,
        currentBalance: Number(form.currentBalance),
      };
    } else if (activeTab === 'Credit Card') {
      return {
        ...base,
        availableCredit: Number(form.availableCredit),
        creditLimit: Number(form.creditLimit),
        billingStart: new Date(2025, 0, billingStartDay).toISOString().split('T')[0],
        dueDate: new Date(2025, 0, dueDateDay).toISOString().split('T')[0],
      };
    }

    return base;
  };

  const handleSubmit = async () => {
  setLoading(true);
  setMessage('');
  try {
    const payload = buildPayload();
    if (activeTab === 'Bank Account') {
      await AccountService.addBankAccount(payload);
    } else if (activeTab === 'Wallet') {
      await AccountService.addWallet(payload);
    } else if (activeTab === 'Credit Card') {
      await AccountService.addDebitCard(payload);
    }
    setMessage('✅ Account added successfully');
    router.push('/accounts/add')
  } catch (err: unknown) {
    if (err instanceof Error) {
      setMessage(`❌ Error: ${err.message}`);
    } else {
      setMessage('❌ Error: Something went wrong');
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
            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition ${value === day
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

          {(activeTab === 'Bank Account' || activeTab === 'Wallet') && (
            <PillInput
              id="balance"
              label="Current Balance"
              type="number"
              value={form.currentBalance}
              onChange={(e) => handleFormChange('currentBalance', e.target.value)}
            />
          )}

          {activeTab === 'Credit Card' && (
            <>
              <PillInput
                id="available-credit"
                label="Available Credit"
                type="number"
                value={form.availableCredit}
                onChange={(e) => handleFormChange('availableCredit', e.target.value)}
              />
              <PillInput
                id="credit-limit"
                label="Credit Limit"
                type="number"
                value={form.creditLimit}
                onChange={(e) => handleFormChange('creditLimit', e.target.value)}
              />
              <DaySegmentedPicker
                label="Billing Start Day"
                value={billingStartDay}
                onChange={setBillingStartDay}
              />
              <DaySegmentedPicker
                label="Due Date Day"
                value={dueDateDay}
                onChange={setDueDateDay}
              />
            </>
          )}

          {activeTab === 'Bank Account' && (
            <div>
              <label className="block mb-2 font-medium">Linked Payment Modes</label>
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
                        className={`px-4 py-1 text-sm rounded-full border transition ${mode.type === type
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
          )}

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
            {loading ? 'Submitting...' : 'Add Account'}
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
