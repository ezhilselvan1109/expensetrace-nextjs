/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse } from '../models/ApiResponse';
import type { TransactionRequestDTO } from '../models/TransactionRequestDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TransactionsService {
    /**
     * Get transaction by ID
     * @param id
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static getTransaction(
        id: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/transactions/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update transaction
     * @param id
     * @param requestBody
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static updateTransaction(
        id: string,
        requestBody: TransactionRequestDTO,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/transactions/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete transaction
     * @param id
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static deleteTransaction(
        id: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/transactions/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Get all transactions with pagination
     * @param page
     * @param size
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static getAllTransactions(
        page?: number,
        size: number = 10,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/transactions',
            query: {
                'page': page,
                'size': size,
            },
        });
    }
    /**
     * Create a transaction
     * @param requestBody
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static createTransaction(
        requestBody: TransactionRequestDTO,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/transactions',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get all transactions
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static getAllTransactions1(): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/transactions/all',
        });
    }
    /**
     * Get all transaction by account ID
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static getAllTransactionByAccountId(): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/transactions/account/{id}',
        });
    }
}
