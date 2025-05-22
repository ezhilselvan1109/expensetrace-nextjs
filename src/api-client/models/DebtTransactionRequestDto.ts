/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LocalTime } from './LocalTime';
export type DebtTransactionRequestDto = {
    date?: string;
    time?: LocalTime;
    amount?: number;
    description?: string;
    accountId?: string;
    /**
     * Debt Transaction Type: 1=PAID, 2=RECEIVED, 3=ADJUSTMENT
     */
    type?: DebtTransactionRequestDto.type;
};
export namespace DebtTransactionRequestDto {
    /**
     * Debt Transaction Type: 1=PAID, 2=RECEIVED, 3=ADJUSTMENT
     */
    export enum type {
        _1 = '1',
        _2 = '2',
        _3 = '3',
    }
}

