/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LocalTime } from './LocalTime';
export type TransactionRequestDTO = {
    /**
     * Transaction Type: 1=INCOME, 2=EXPENSE, 3=TRANSFER
     */
    type?: TransactionRequestDTO.type;
    date?: string;
    time?: LocalTime;
    amount?: number;
    categoryId?: string;
    accountId?: string;
    description?: string;
    tagIds?: Array<string>;
};
export namespace TransactionRequestDTO {
    /**
     * Transaction Type: 1=INCOME, 2=EXPENSE, 3=TRANSFER
     */
    export enum type {
        _1 = '1',
        _2 = '2',
        _3 = '3',
    }
}

