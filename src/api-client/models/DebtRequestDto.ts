/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type DebtRequestDto = {
    personName?: string;
    dueDate?: string;
    additionalDetail?: string;
    /**
     * Debts Type: 1=LENDING, 2=BORROWING
     */
    type?: DebtRequestDto.type;
};
export namespace DebtRequestDto {
    /**
     * Debts Type: 1=LENDING, 2=BORROWING
     */
    export enum type {
        _1 = '1',
        _2 = '2',
    }
}

