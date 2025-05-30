import useSWR from "swr";
import { DebtTransactionsService } from "@/api-client";
import { DebtTransaction } from "@/types";

const fetchAllAdjustmentDebtTransactions = async (debtId:string,page: number) => {
  const res = await DebtTransactionsService.getAllAdjustmentDebtTransactions(debtId,page);
  return res.data;
};

const fetchAllDebtTransactions = async (debtId:string,page: number) => {
  const res = await DebtTransactionsService.getAllDebtTransactions(debtId,page);
  return res.data;
};

const fetchAllPaidDebtTransactions = async (debtId:string,page: number) => {
  const res = await DebtTransactionsService.getAllPaidDebtTransactions(debtId,page);
  return res.data;
};

const fetchAllReceivedDebtTransactions = async (debtId:string,page: number) => {
  const res = await DebtTransactionsService.getAllReceivedDebtTransactions(debtId,page);
  return res.data;
};

export function useDebtTransactions(debtId: string, type: 'ALL' | 'PAID' | 'RECEIVED' | 'ADJUSTMENT', page: number) {
  const getKey = () => {
    switch (type) {
      case "PAID":
        return [`${debtId}/paid`, page];
      case "ADJUSTMENT":
        return [`${debtId}/adjustment`, page];
      case "RECEIVED":
        return [`${debtId}/received`, page];
      default:
        return [`${debtId}/all`, page];
    }
  };

  const fetcher = () => {
    switch (type) {
      case "PAID":
        return fetchAllPaidDebtTransactions(debtId,page);
      case "ADJUSTMENT":
        return fetchAllAdjustmentDebtTransactions(debtId,page);
      case "RECEIVED":
        return fetchAllReceivedDebtTransactions(debtId,page);
      default:
        return fetchAllDebtTransactions(debtId, page);
    }
  };

  const { data, error, isLoading, mutate } = useSWR(getKey(), fetcher);

  return {
    transactions: (data?.content as DebtTransaction[]) || [],
    totalPages: data?.totalPages || 1,
    isLoading,
    isError: error,
    mutate,
  };
}
