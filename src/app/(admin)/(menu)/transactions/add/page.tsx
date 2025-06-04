import React from 'react';
import TransactionForm from '../(component)/transactionForm';

export default function AddTransactionPage() {
  return (
    <div className="min-h-screen px-2 py-3 xl:px-10 xl:py-12">
      <div className="flex flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Add Transaction</h1>
      </div>
      <TransactionForm />
    </div>
  );
}
