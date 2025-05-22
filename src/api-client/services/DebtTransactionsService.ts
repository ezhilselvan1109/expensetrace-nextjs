/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse } from '../models/ApiResponse';
import type { DebtTransactionRequestDto } from '../models/DebtTransactionRequestDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DebtTransactionsService {
    /**
     * get debt Transaction
     * get debt Transaction by id for the authenticated user
     * @param id
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static getDebtTransaction(
        id: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/debts-transactions/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * update debt Transaction
     * update debt Transaction for the authenticated user
     * @param id
     * @param requestBody
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static updateDebtTransaction(
        id: string,
        requestBody: DebtTransactionRequestDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/debts-transactions/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * delete debt Transaction
     * delete debt Transaction for the authenticated user
     * @param id
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static deleteDebtTransaction(
        id: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/debts-transactions/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Add a new debt Transaction
     * Create a new debt Transaction for the authenticated user
     * @param debtId
     * @param requestBody
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static addDebtTransaction(
        debtId: string,
        requestBody: DebtTransactionRequestDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/debts-transactions/{debtId}',
            path: {
                'debtId': debtId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * get all debt Transaction
     * get all debt Transaction for the authenticated user
     * @param debtId
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static getAllDebtTransaction(
        debtId: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/debts-transactions/id/{debtId}',
            path: {
                'debtId': debtId,
            },
        });
    }
}
