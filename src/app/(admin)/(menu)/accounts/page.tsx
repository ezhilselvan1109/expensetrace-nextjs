import { Metadata } from 'next';
import React, { Suspense } from 'react';
import ClientPage from './clientPage';

export const metadata: Metadata = {
  title: 'Accounts | ExpenseTrace',
  description: 'This is Accounts Page of ExpenseTrace',
};

export default function AccountsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 sm:px-8 sm:py-10">
      <Suspense
        fallback={
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
              <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
              <div className="h-10 w-40 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-40 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse"
                />
              ))}
            </div>
          </div>
        }
      >
        <ClientPage />
      </Suspense>
    </div>
  );
}
