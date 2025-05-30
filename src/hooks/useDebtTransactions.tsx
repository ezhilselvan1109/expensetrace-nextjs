// hooks/useDebtTransactions.ts
import useSWR from "swr";
import { DebtTransactionsService } from "@/api-client";
import { DebtTransaction } from "@/types";

const fetchDebtTransactions = async (id: string): Promise<DebtTransaction[]> => {
  const res = await DebtTransactionsService.getAllDebtTransaction(id);
  return Array.isArray(res.data) ? res.data : [];
};

export function useDebtTransactions(id: string | undefined) {
  const shouldFetch = !!id;
  const { data, error, isLoading, mutate } = useSWR(
    shouldFetch ? [`/api/v1/debts/${id}/transactions`] : null,
    () => fetchDebtTransactions(id!)
  );

  return {
    transactions: data || [],
    isLoading,
    isError: !!error,
    mutate,
  };
}
