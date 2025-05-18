'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import TransactionForm from '../../transactionForm';

export default function UpdateTransactionPage() {
  const params = useParams();
  const router = useRouter();
  const transactionId = params.id;

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!transactionId) return;

    const fetchTransaction = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions/${transactionId}`,
          { withCredentials: true }
        );
        setInitialData(res.data.data);
      } catch (error) {
        console.error('Failed to fetch transaction:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [transactionId]);

  if (loading) return <p>Loading transaction...</p>;
  if (!initialData) return <p>Transaction not found.</p>;

  return (
    <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
      <TransactionForm initialData={initialData} />
    </div>
  );
}
