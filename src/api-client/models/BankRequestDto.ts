/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaymentModeRequestDto } from './PaymentModeRequestDto';
export type BankRequestDto = {
    name?: string;
    currentBalance?: number;
    linkedPaymentModes?: Array<PaymentModeRequestDto>;
};

