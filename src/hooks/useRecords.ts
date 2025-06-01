import useSWR from "swr";
import { RecordsService } from "@/api-client";
import { Record } from "@/types";

const fetchAllAdjustmentRecords = async (debtId: string, page: number) => {
  const res = await RecordsService.getAllAdjustmentRecords(debtId, page);
  return res.data;
};

const fetchAllRecords = async (debtId: string, page: number) => {
  const res = await RecordsService.getAllRecords(debtId, page);
  return res.data;
};

const fetchAllPaidRecords = async (debtId: string, page: number) => {
  const res = await RecordsService.getAllPaidRecords(debtId, page);
  return res.data;
};

const fetchAllReceivedRecords = async (debtId: string, page: number) => {
  const res = await RecordsService.getAllReceivedRecords(debtId, page);
  return res.data;
};

const fetchTotalReceived = async (debtId: string) => {
  const res = await RecordsService.getTotalReceived(debtId);
  return res.data;
};

const fetchTotalPaid = async (debtId: string) => {
  const res = await RecordsService.getTotalPaid(debtId);
  return res.data;
};

export function useRecords(debtId: string, type: 'ALL' | 'PAID' | 'RECEIVED' | 'ADJUSTMENT', page: number) {
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
        return fetchAllPaidRecords(debtId, page);
      case "ADJUSTMENT":
        return fetchAllAdjustmentRecords(debtId, page);
      case "RECEIVED":
        return fetchAllReceivedRecords(debtId, page);
      default:
        return fetchAllRecords(debtId, page);
    }
  };

  const { data, error, isLoading, mutate } = useSWR(getKey(), fetcher);

  return {
    records: (data?.content as Record[]) || [],
    totalPages: data?.totalPages || 1,
    totalElements: data?.totalElements || 0,
    isLoading,
    isError: error,
    mutate,
  };
}

export function useRecord(debtId: string, type: 1 | 2) {
  const getKey = () => {
    switch (type) {
      case 1:
        return [`${debtId}/total-paid`];
      case 2:
        return [`${debtId}/total-received`];
    }
  };

  const fetcher = () => {
    switch (type) {
      case 1:
        return fetchTotalPaid(debtId);
      case 2:
        return fetchTotalReceived(debtId);
    }
  };

  const { data, error, isLoading, mutate } = useSWR(getKey(), fetcher);

  return {
    data: (data as number | undefined),
    isLoading,
    isError: error,
    mutate,
  };
}
