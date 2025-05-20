/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CategoryRequestDto = {
    name?: string;
    /**
     * Category Type: 1=EXPENSE, 2=INCOME
     */
    type?: CategoryRequestDto.type;
    color?: string;
    icon?: string;
};
export namespace CategoryRequestDto {
    /**
     * Category Type: 1=EXPENSE, 2=INCOME
     */
    export enum type {
        _1 = '1',
        _2 = '2',
    }
}

