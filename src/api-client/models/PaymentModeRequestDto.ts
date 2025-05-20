/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type PaymentModeRequestDto = {
    name?: string;
    /**
     * Payment mode:  1=UPI, 2=CHECK,3=DEBIT_CARD, 4=INTERNET_BANKING
     */
    type?: PaymentModeRequestDto.type;
};
export namespace PaymentModeRequestDto {
    /**
     * Payment mode:  1=UPI, 2=CHECK,3=DEBIT_CARD, 4=INTERNET_BANKING
     */
    export enum type {
        _1 = '1',
        _2 = '2',
        _3 = '3',
        _4 = '4',
    }
}

