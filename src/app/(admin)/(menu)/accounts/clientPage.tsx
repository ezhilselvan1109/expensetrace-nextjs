'use client';

import { AccountService } from '@/api-client';
import { HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type AccountType = 'wallet' | 'bank' | 'creditCard' | 'cash';

type Account = {
  id: string;
  name: string;
  balance: number;
  extra: string | null;
  default: boolean;
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
    const fetchAccounts = async () => {
      try {
        const [
          walletRes,
          bankRes,
          creditRes,
          cashRes,
          availableRes,
          creditUsedRes,
        ] = await Promise.all([
          AccountService.getAllWalletAccountsByUser(),
          AccountService.getAllBankAccountsByUser(),
          AccountService.getAllCreditCardAccountsByUser(),
          AccountService.getAllCashAccountsByUser(),
          AccountService.getAvailableAmount(),
          AccountService.getCreditAvailable(),
        ]);

        setAvailableAmount(typeof availableRes.data === 'number' ? availableRes.data : null);
        setCreditUsedAmount(typeof creditUsedRes.data === 'number' ? creditUsedRes.data : null);

        type RawAccount = {
          id: string;
          name: string;
          currentBalance?: number;
          currentAvailableLimit?: number;
          totalCreditLimit?: number;
          default?: boolean;
        };

        const transform = (data: RawAccount[]): Account[] =>
          data.map((item) => ({
            id: item.id,
            name: item.name,
            balance: item.currentBalance ?? item.currentAvailableLimit ?? 0,
            extra: item.totalCreditLimit
              ? `Limit: ₹${item.totalCreditLimit.toLocaleString()}`
              : null,
            default: item.default ?? false,
          }));

        setAccountsByType({
          wallet: transform(Array.isArray(walletRes.data) ? walletRes.data : []),
          bank: transform(Array.isArray(bankRes.data) ? bankRes.data : []),
          creditCard: transform(Array.isArray(creditRes.data) ? creditRes.data : []),
          cash: transform(Array.isArray(cashRes.data) ? cashRes.data : []),
        });
      } catch (err) {
        console.error('Failed to load accounts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const sectionHeaders: Record<AccountType, string> = {
    bank: '🏦 Bank Accounts',
    wallet: '👛 Wallets',
    creditCard: '💳 Credit Cards',
    cash: '💸 Cash',
  };

  return (
    <div className="min-h-screen sm:px-8 sm:py-10 bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-row sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">All Accounts</h1>
          <Link href="/accounts/help" className="text-blue-600 hover:text-blue-800">
            <HelpCircle size={20} />
          </Link>
        </div>
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
            <div className="mb-12 grid grid-cols-1 grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border shadow-sm hover:shadow-md">
                <div className="text-sm text-green-800 dark:text-green-200 font-medium mb-2">
                  Available Balance
                </div>
                <div className="text-3xl font-bold text-green-900 dark:text-green-100">
                  {formatCurrency(availableAmount)}
                </div>
              </div>

              <div className="p-6 rounded-2xl border shadow-sm hover:shadow-md">
                <div className="text-sm text-red-800 dark:text-red-200 font-medium mb-2">
                  Available Credit
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
                        className="p-5 sm:p-6 rounded-2xl shadow hover:shadow-md transition cursor-pointer"
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
