'use client';

import { AccountService } from '@/api-client';
import type { ApiResponse } from '@/api-client';
import Switch from '@/components/form/switch/Switch';
import { HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useSWR from 'swr';

type AccountType = 'wallet' | 'bank' | 'creditCard' | 'cash';

type Account = {
  id: string;
  name: string;
  balance: number;
  extra: string | null;
  default: boolean;
};

type RawAccount = {
  id: string;
  name: string;
  currentBalance?: number;
  currentAvailableLimit?: number;
  totalCreditLimit?: number;
  default?: boolean;
};

function fetcher<T>(fn: () => Promise<ApiResponse>): () => Promise<T | undefined> {
  return async () => {
    const res = await fn();
    return res.data as T | undefined;
  };
}

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

const formatCurrency = (amount: number | null | undefined) =>
  `₹${amount?.toLocaleString('en-IN') ?? '0.00'}`;

export default function ClientPage() {
  const router = useRouter();
  const [showBalance, setShowBalance] = useState(true);

  const {
    data: wallet,
    isLoading: loadingWallet,
  } = useSWR('wallet', fetcher(AccountService.getAllWalletAccountsByUser));

  const {
    data: bank,
    isLoading: loadingBank,
  } = useSWR('bank', fetcher(AccountService.getAllBankAccountsByUser));

  const {
    data: creditCard,
    isLoading: loadingCredit,
  } = useSWR('creditCard', fetcher(AccountService.getAllCreditCardAccountsByUser));

  const {
    data: cash,
    isLoading: loadingCash,
  } = useSWR('cash', fetcher(AccountService.getAllCashAccountsByUser));

  const {
    data: availableAmount,
    isLoading: loadingAvailable,
  } = useSWR('availableAmount', fetcher(AccountService.getAvailableAmount));

  const {
    data: creditUsedAmount,
    isLoading: loadingCreditUsed,
  } = useSWR('creditUsedAmount', fetcher(AccountService.getCreditAvailable));

  const accountData: Record<AccountType, Account[]> = {
    wallet: transform(Array.isArray(wallet) ? wallet : []),
    bank: transform(Array.isArray(bank) ? bank : []),
    creditCard: transform(Array.isArray(creditCard) ? creditCard : []),
    cash: transform(Array.isArray(cash) ? cash : []),
  };

  const sectionHeaders: Record<AccountType, string> = {
    bank: '🏦 Bank Accounts',
    wallet: '👛 Wallets',
    creditCard: '💳 Credit Cards',
    cash: '💸 Cash',
  };

  return (
    <div className="min-h-screen sm:px-8 sm:py-10 bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">All Accounts</h1>
          <Link href="/accounts/help" className="text-blue-600 hover:text-blue-800">
            <HelpCircle size={20} />
          </Link>
        </div>
        <button
          onClick={() => router.push('/accounts/add')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl shadow transition"
        >
          + Add Account
        </button>
      </div>

      <div className="flex flex-row justify-between items-start md:items-center gap-4 mb-6">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Transactions based balance, actual may vary.
        </p>
        <label className="inline-flex items-center cursor-pointer">
          <Switch label={"Show Balance"} defaultChecked={showBalance} onChange={() => setShowBalance(!showBalance)}/>
        </label>
      </div>

      <div className="mx-auto max-w-5xl sm:p-10 space-y-12">

        {/* Totals Section */}
        <div className="grid grid-cols-2 gap-6">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 hover:shadow-md transition cursor-pointer">
            <div className="text-sm text-gray-900 dark:text-gray-100 font-medium mb-2">
              Available Balance
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {loadingAvailable ? (
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
              ) : showBalance ? (
                formatCurrency(typeof availableAmount === 'number' ? availableAmount : Number(availableAmount ?? 0))
              ) : (
                '•••••'
              )}
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 hover:shadow-md transition cursor-pointer">
            <div className="text-sm text-gray-900 dark:text-gray-100 font-medium mb-2">
              Available Credit
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {loadingCreditUsed ? (
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
              ) : showBalance ? (
                formatCurrency(typeof creditUsedAmount === 'number' ? creditUsedAmount : Number(creditUsedAmount ?? 0))
              ) : (
                '•••••'
              )}
            </div>
          </div>
        </div>

        {/* Account Groups */}
        {Object.entries(sectionHeaders).map(([type, label]) => {
          const accType = type as AccountType;
          const loading =
            (accType === 'wallet' && loadingWallet) ||
            (accType === 'bank' && loadingBank) ||
            (accType === 'creditCard' && loadingCredit) ||
            (accType === 'cash' && loadingCash);

          const accounts = accountData[accType];
          if (!loading && !accounts?.length) return null;
          return (
            <section key={type} className="mb-10">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-5">
                {label}
              </h2>

              {loading ? (
                <div className="space-y-4">
                  {[...Array(1)].map((_, i) => (
                    <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse" />
                  ))}
                </div>
              ) : accounts?.length ? (
                <ul className="space-y-4">
                  {accounts.map((acc) => (
                    <li
                      key={acc.id}
                      className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow border border-gray-200 dark:border-gray-700 hover:shadow-md transition cursor-pointer"
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
                          {showBalance ? formatCurrency(acc.balance) : '•••••'}
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
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No accounts found.</p>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
