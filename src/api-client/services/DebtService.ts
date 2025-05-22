/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse } from '../models/ApiResponse';
import type { DebtRequestDto } from '../models/DebtRequestDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DebtService {
    /**
     * get debt
     * get debt by id for the authenticated user
     * @param id
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static getDebt(
        id: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/debts/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * update debt
     * update debt for the authenticated user
     * @param id
     * @param requestBody
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static updateDebt(
        id: string,
        requestBody: DebtRequestDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/debts/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * delete debt
     * delete debt for the authenticated user
     * @param id
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static deleteDebt(
        id: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/debts/{id}',
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
    public static getAllDebt(
        page?: number,
        size: number = 10,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/debts',
            query: {
                'page': page,
                'size': size,
            },
        });
    }
    /**
     * Add a new debt
     * Create a new debt for the authenticated user
     * @param requestBody
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static addDebt(
        requestBody: DebtRequestDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/debts',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * get all debt
     * get all debt for the authenticated user
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static getAllDebt1(): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/debts/all',
        });
    }
}
