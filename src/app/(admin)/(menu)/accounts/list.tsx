'use client';

import { useEffect, useState } from 'react';

type AccountApiItem = {
  id: string;
  name: string;
  currentBalance?: number;
  currentAvailableLimit?: number;
  totalCreditLimit?: number;
  default?: boolean;
};

type Account = {
  id: string;
  name: string;
  balance: number;
  extra: string | null;
  default: boolean;
};

type AccountType = 'wallet' | 'bank' | 'creditCard' | 'cash';

type ApiResponse = {
  message: string;
  data: AccountApiItem[];
};

export default function List() {
  const [accountsByType, setAccountsByType] = useState<Record<AccountType, Account[]>>({
    wallet: [],
    bank: [],
    creditCard: [],
    cash: [],
  });

  const [availableAmount, setAvailableAmount] = useState<number | null>(null);
  const [creditUsedAmount, setCreditUsedAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urls: Record<AccountType, string> = {
          wallet: '/accounts/wallet',
          bank: '/accounts/bank',
          creditCard: '/accounts/credit-card',
          cash: '/accounts/cash',
        };

        const responses = await Promise.all(
          Object.entries(urls).map(async ([key, url]) => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
              method: 'GET',
              credentials: 'include',
            });

            if (!res.ok) throw new Error(`Failed to fetch ${key}`);

            const data: ApiResponse = await res.json();
            return { key: key as AccountType, data: data.data };
          })
        );

        const [availableRes, creditRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/available-amount`, {
            credentials: 'include',
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/credit-amount`, {
            credentials: 'include',
          }),
        ]);

        if (!availableRes.ok || !creditRes.ok) {
          throw new Error('Failed to fetch totals');
        }

        const availableJson = await availableRes.json();
        const creditJson = await creditRes.json();

        setAvailableAmount(availableJson.data);
        setCreditUsedAmount(creditJson.data);

        const grouped: Record<AccountType, Account[]> = {
          wallet: [],
          bank: [],
          creditCard: [],
          cash: [],
        };

        responses.forEach(({ key, data }) => {
          grouped[key] = data.map((item: AccountApiItem): Account => ({
            id: item.id,
            name: item.name,
            balance: item.currentBalance ?? item.currentAvailableLimit ?? 0,
            extra:
              item.totalCreditLimit !== undefined
                ? `Limit: ₹${item.totalCreditLimit.toLocaleString()}`
                : null,
            default: item.default ?? false,
          }));
        });

        setAccountsByType(grouped);
      } catch (err) {
        console.error('Error fetching accounts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const sectionHeaders: Record<AccountType, string> = {
    bank: '🏦 Bank Accounts',
    wallet: '👛 Wallets',
    creditCard: '💳 Credit Cards',
    cash: '💸 Cash',
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10 sm:px-6 sm:py-14 lg:px-14 lg:py-16">
      <div className="mx-auto w-full max-w-4xl rounded-3xl border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800 p-8 sm:p-10 shadow-lg">
        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400 text-lg font-medium">Loading...</p>
        ) : (
          <>
            {/* Totals Row */}
            <div className="mb-14 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-8 relative">
              {/* Total Available Balance */}
              <div className="flex-1 rounded-2xl p-7 bg-gradient-to-tr from-green-100 to-green-50 dark:from-green-900 dark:to-green-800 border border-green-300 dark:border-green-700 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-center">
                <div className="text-sm font-semibold text-green-900 dark:text-green-100 mb-3 tracking-widest uppercase select-none">
                  🧮 Total Available Balance
                </div>
                <div className="text-4xl font-extrabold text-green-800 dark:text-green-300 leading-tight">
                  ₹{availableAmount?.toLocaleString() ?? '0.00'}
                </div>
              </div>

              {/* Separator line on larger screens */}
              <div className="hidden sm:block w-px bg-gray-300 dark:bg-gray-600 mx-6 self-stretch" />

              {/* Credit Used */}
              <div className="flex-1 rounded-2xl p-7 bg-gradient-to-tr from-red-100 to-red-50 dark:from-red-900 dark:to-red-800 border border-red-300 dark:border-red-700 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-center">
                <div className="text-sm font-semibold text-red-900 dark:text-red-100 mb-3 tracking-widest uppercase select-none">
                  💳 Credit Used
                </div>
                <div className="text-4xl font-extrabold text-red-800 dark:text-red-300 leading-tight">
                  ₹{creditUsedAmount?.toLocaleString() ?? '0.00'}
                </div>
              </div>
            </div>

            {/* Account Sections */}
            {Object.entries(sectionHeaders).map(([type, label]) =>
              accountsByType[type as AccountType]?.length ? (
                <section key={type} className="mb-12">
                  <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100 border-b border-gray-300 dark:border-gray-700 pb-3">
                    {label}
                  </h2>
                  <ul className="space-y-5">
                    {accountsByType[type as AccountType].map((acc) => (
                      <li
                        key={acc.id}
                        className="p-6 rounded-2xl bg-gray-100 dark:bg-gray-700 shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                      >
                        <div className="flex justify-between items-center">
                          <div className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-3">
                            {acc.name}
                            {acc.default && (
                              <span className="inline-block px-3 py-1 text-xs font-bold bg-blue-600 text-white rounded-full select-none tracking-wide">
                                Default
                              </span>
                            )}
                          </div>
                          <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                            ₹{acc.balance.toLocaleString()}
                          </div>
                        </div>
                        {acc.extra && (
                          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                            {acc.extra}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null
            )}
          </>
        )}
      </div>
    </div>
  );
}
