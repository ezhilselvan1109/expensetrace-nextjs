export enum DebtsType {
  LENDING = 1,
  BORROWING = 2,
}

export enum RecordType {
  PAID = 1,
  RECEIVED = 2,
  ADJUSTMENT = 3,
}

export interface Debt {
  id: string;
  personName: string;
  dueDate: string;
  amount:number;
  additionalDetail: string;
  type: DebtsType;
}

export interface Record {
  id: string;
  date: string;
  time: string;
  amount: number;
  description: string;
  type: RecordType;
  accountId: string;
}

export interface User {
  id:string;
  firstName:string;
  lastName:string;
  email:string;
}

