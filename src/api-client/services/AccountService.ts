/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse } from '../models/ApiResponse';
import type { BankAccountRequestDto } from '../models/BankAccountRequestDto';
import type { CreditCardAccountRequestDto } from '../models/CreditCardAccountRequestDto';
import type { WalletAccountRequestDto } from '../models/WalletAccountRequestDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AccountService {
    /**
     * Set default payment mode
     * Update default payment mode for the authenticated user
     * @param id
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static updateDefaultPaymentMode(
        id: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/accounts/{id}/default-payment-mode',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update account
     * Update account information by ID
     * @param id
     * @param requestBody
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static updateWalletAccount(
        id: string,
        requestBody: WalletAccountRequestDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/accounts/wallet/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Update account
     * Update account information by ID
     * @param id
     * @param requestBody
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static updateCreditCardAccount(
        id: string,
        requestBody: CreditCardAccountRequestDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/accounts/credit-card/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Update bank account
     * Update bank account information by ID
     * @param id
     * @param requestBody
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static updateBankAccount(
        id: string,
        requestBody: BankAccountRequestDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/accounts/bank/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get wallet account
     * Retrieve an all wallet account
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static getAllWalletAccountsByUser(): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/accounts/wallet',
        });
    }
    /**
     * Add a new wallet account
     * Create a new wallet account for the authenticated user
     * @param requestBody
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static addWallet(
        requestBody: WalletAccountRequestDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/accounts/wallet',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Add a new DebitCard account
     * Create a new DebitCard account for the authenticated user
     * @param requestBody
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static addDebitCard(
        requestBody: CreditCardAccountRequestDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/accounts/debit-card',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get bank account
     * Retrieve an all bank account
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static getAllBankAccountsByUser(): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/accounts/bank',
        });
    }
    /**
     * Add a new bank account
     * Create a new bank account for the authenticated user
     * @param requestBody
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static addBankAccount(
        requestBody: BankAccountRequestDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/accounts/bank',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get default payment mode
     * Retrieve the default payment mode for the authenticated user
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static getDefaultPaymentMode(): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/accounts/default-payment-mode',
        });
    }
    /**
     * Get credit-amount
     * Retrieve the available-amount for the authenticated user
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static getCreditOutstanding(): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/accounts/credit/outstanding',
        });
    }
    /**
     * Get credit-amount
     * Retrieve the available-amount for the authenticated user
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static getCreditAvailable(): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/accounts/credit/available',
        });
    }
    /**
     * Get all credit card account
     * Retrieve an all credit card account
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static getAllCreditCardAccountsByUser(): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/accounts/credit-card',
        });
    }
    /**
     * Get all cash in account
     * Retrieve an all cash account
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static getAllCashAccountsByUser(): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/accounts/cash',
        });
    }
    /**
     * Get available-amount
     * Retrieve the available-amount for the authenticated user
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static getAvailableAmount(): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/accounts/available-amount',
        });
    }
    /**
     * Get all accounts
     * Retrieve all available accounts grouped by account type
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static getAllAccounts(): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/accounts/all',
        });
    }
    /**
     * Get account by ID
     * Retrieve an account using its ID
     * @param id
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static getAccountById(
        id: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/accounts/account/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Delete account
     * Delete an account by its ID
     * @param id
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static deleteAccount(
        id: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/accounts/account/{id}',
            path: {
                'id': id,
            },
        });
    }
}
