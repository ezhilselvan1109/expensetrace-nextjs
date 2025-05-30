import useSWR from "swr";
import { DebtService } from "@/api-client";
import { Debt } from "../types";

const fetchAllDebts = async (page: number) => {
  const res = await DebtService.getAllDebt(page);
  return res.data;
};

const fetchLendingDebts = async (page: number) => {
  const res = await DebtService.getAllLendingDebt(page);
  return res.data;
};

const fetchBorrowingDebts = async (page: number) => {
  const res = await DebtService.getAllBorrowingDebt(page);
  return res.data;
};

export function useDebts(type: "All" | "Lending" | "Borrowing", page: number) {
  const getKey = () => {
    switch (type) {
      case "Lending":
        return [`lending`, page];
      case "Borrowing":
        return [`borrowing`, page];
      default:
        return [`debts`, page];
    }
  };

  const fetcher = () => {
    switch (type) {
      case "Lending":
        return fetchLendingDebts(page);
      case "Borrowing":
        return fetchBorrowingDebts(page);
      default:
        return fetchAllDebts(page);
    }
  };

  const { data, error, isLoading, mutate } = useSWR(getKey(), fetcher);

  return {
    debts: (data?.content as Debt[]) || [],
    totalPages: data?.totalPages || 1,
    isLoading,
    isError: error,
    mutate,
  };
}
