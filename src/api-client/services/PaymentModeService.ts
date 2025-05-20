/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse } from '../models/ApiResponse';
import type { PaymentModeRequestDto } from '../models/PaymentModeRequestDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PaymentModeService {
    /**
     * Update a payment mode
     * Updates the details of an existing payment mode by its ID
     * @param id
     * @param requestBody
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static updatePaymentMode(
        id: string,
        requestBody: PaymentModeRequestDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/accounts/payment-modes/{id}/update',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Add a new payment mode
     * Creates a new payment mode for a specific account. Returns an error if it already exists.
     * @param accountId
     * @param requestBody
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static addPaymentMode(
        accountId: string,
        requestBody: PaymentModeRequestDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/accounts/payment-modes/{accountId}/add',
            path: {
                'accountId': accountId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get payment mode by ID
     * Returns a single payment mode by its ID
     * @param paymentModeId
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static getPaymentModeById(
        paymentModeId: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/accounts/payment-modes/{paymentModeId}',
            path: {
                'paymentModeId': paymentModeId,
            },
        });
    }
    /**
     * Get all payment modes for an account
     * Returns a list of all payment modes associated with a specific account by account ID
     * @param accountId
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static getAllPaymentModesByAccount(
        accountId: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/accounts/payment-modes/{accountId}/all',
            path: {
                'accountId': accountId,
            },
        });
    }
    /**
     * Get all payment modes
     * Returns a list of all available payment modes across all accounts
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static getAllPaymentModes(): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/accounts/payment-modes/all',
        });
    }
    /**
     * Delete a payment mode
     * Deletes a specific payment mode by its ID
     * @param paymentModeId
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static deletePaymentMode(
        paymentModeId: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/accounts/payment-modes/{paymentModeId}/delete',
            path: {
                'paymentModeId': paymentModeId,
            },
        });
    }
}
