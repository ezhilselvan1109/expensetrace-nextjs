import React from 'react';
import TransactionForm from '../transactionForm';

export default function AddTransactionPage() {
  return (
    <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
      <TransactionForm />
    </div>
  );
}
