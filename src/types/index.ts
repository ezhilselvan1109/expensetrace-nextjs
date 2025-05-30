export enum DebtsType {
  LENDING = 1,
  BORROWING = 2,
}

export enum DebtTransactionType {
  PAID = 1,
  RECEIVED = 2,
  ADJUSTMENT = 3,
}

export interface Debt {
  id: string;
  personName: string;
  dueDate: string;
  additionalDetail: string;
  type: DebtsType;
}

export interface DebtTransaction {
  id: string;
  date: string;
  time: string;
  amount: number;
  description: string;
  type: DebtTransactionType;
  accountId: string;
}
