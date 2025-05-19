'use client';

import { useRouter } from 'next/navigation';
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

const formatCurrency = (amount: number | null | undefined) =>
  `₹${amount?.toLocaleString('en-IN') ?? '0.00'}`;

export default function ClientPage() {
  const [accountsByType, setAccountsByType] = useState<Record<AccountType, Account[]>>({
    wallet: [],
    bank: [],
    creditCard: [],
    cash: [],
  });

  const [availableAmount, setAvailableAmount] = useState<number | null>(null);
  const [creditUsedAmount, setCreditUsedAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

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
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/credit/available`, {
            credentials: 'include',
          }),
        ]);

        if (!availableRes.ok || !creditRes.ok) throw new Error('Failed to fetch totals');

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
    <div className="min-h-screen sm:px-8 sm:py-10 bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Accounts</h1>
        <button
          onClick={() => router.push('/accounts/add')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-xl shadow text-sm sm:text-base"
        >
          + Add Account
        </button>
      </div>

      <div className="mx-auto max-w-5xl sm:p-10">
        {loading ? (
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-30 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            {/* Totals Section */}
            <div className="mb-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 shadow-sm hover:shadow-md">
                <div className="text-sm text-green-800 dark:text-green-200 font-medium mb-2">
                  🧮 Total Available Balance
                </div>
                <div className="text-3xl font-bold text-green-900 dark:text-green-100">
                  {formatCurrency(availableAmount)}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 shadow-sm hover:shadow-md">
                <div className="text-sm text-red-800 dark:text-red-200 font-medium mb-2">
                  💳 Credit Used
                </div>
                <div className="text-3xl font-bold text-red-900 dark:text-red-100">
                  {formatCurrency(creditUsedAmount)}
                </div>
              </div>
            </div>

            {/* Account Groups */}
            {Object.entries(sectionHeaders).map(([type, label]) =>
              accountsByType[type as AccountType]?.length ? (
                <section key={type} className="mb-10">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-5">
                    {label}
                  </h2>
                  <ul className="space-y-4">
                    {accountsByType[type as AccountType].map((acc) => (
                      <li
                        key={acc.id}
                        className="p-5 sm:p-6 rounded-2xl bg-gray-100 dark:bg-gray-700 shadow hover:shadow-md transition cursor-pointer"
                      >
                        <div className="flex justify-between items-center">
                          <div className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                            {acc.name}
                            {acc.default && (
                              <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full font-semibold">
                                Default
                              </span>
                            )}
                          </div>
                          <div className="text-base font-semibold text-gray-700 dark:text-gray-300">
                            {formatCurrency(acc.balance)}
                          </div>
                        </div>
                        {acc.extra && (
                          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            {acc.extra}
                          </div>
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
