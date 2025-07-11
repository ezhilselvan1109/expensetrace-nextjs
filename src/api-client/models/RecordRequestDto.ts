/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type RecordRequestDto = {
    date?: string;
    amount?: number;
    description?: string;
    accountId?: string;
    /**
     * Debt Transaction Type: 1=PAID, 2=RECEIVED, 3=ADJUSTMENT
     */
    type?: RecordRequestDto.type;
};
export namespace RecordRequestDto {
    /**
     * Debt Transaction Type: 1=PAID, 2=RECEIVED, 3=ADJUSTMENT
     */
    export enum type {
        _1 = '1',
        _2 = '2',
        _3 = '3',
    }
}

