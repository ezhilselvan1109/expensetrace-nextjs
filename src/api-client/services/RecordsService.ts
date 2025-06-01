/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse } from '../models/ApiResponse';
import type { RecordRequestDto } from '../models/RecordRequestDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RecordsService {
    /**
     * get debt Record
     * get debt Record by id for the authenticated user
     * @param id
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static getRecord(
        id: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/records/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * update debt Record
     * update debt Record for the authenticated user
     * @param id
     * @param requestBody
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static updateRecord(
        id: string,
        requestBody: RecordRequestDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/records/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * delete debt Record
     * delete debt Record for the authenticated user
     * @param id
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static deleteRecord(
        id: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/records/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Add a new debt Record
     * Create a new debt Record for the authenticated user
     * @param debtId
     * @param requestBody
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static addRecord(
        debtId: string,
        requestBody: RecordRequestDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/records/{debtId}',
            path: {
                'debtId': debtId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get total received
     * @param debtId
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static getTotalReceived(
        debtId: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/records/{debtId}/total-received',
            path: {
                'debtId': debtId,
            },
        });
    }
    /**
     * Get total-paid
     * @param debtId
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static getTotalPaid(
        debtId: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/records/{debtId}/total-paid',
            path: {
                'debtId': debtId,
            },
        });
    }
    /**
     * get all paid debt Record
     * get all paid debt Record for the authenticated user
     * @param debtId
     * @param page
     * @param size
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static getAllPaidRecords(
        debtId: string,
        page?: number,
        size: number = 10,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/records/{debtId}/paid',
            path: {
                'debtId': debtId,
            },
            query: {
                'page': page,
                'size': size,
            },
        });
    }
    /**
     * get all debt Record with pagination
     * get all debt Record with pagination for the authenticated user
     * @param debtId
     * @param page
     * @param size
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static getAllRecords(
        debtId: string,
        page?: number,
        size: number = 10,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/records/{debtId}/all',
            path: {
                'debtId': debtId,
            },
            query: {
                'page': page,
                'size': size,
            },
        });
    }
    /**
     * get all adjustment debt Record
     * get all adjustment debt Record for the authenticated user
     * @param debtId
     * @param page
     * @param size
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static getAllAdjustmentRecords(
        debtId: string,
        page?: number,
        size: number = 10,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/records/{debtId}/adjustment',
            path: {
                'debtId': debtId,
            },
            query: {
                'page': page,
                'size': size,
            },
        });
    }
    /**
     * get all debt Record
     * get all debt Record for the authenticated user
     * @param debtId
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static getAllRecords1(
        debtId: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/records/id/{debtId}',
            path: {
                'debtId': debtId,
            },
        });
    }
    /**
     * get all received debt Record
     * get all received debt Record for the authenticated user
     * @param debtId
     * @param page
     * @param size
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static getAllReceivedRecords(
        debtId: string,
        page?: number,
        size: number = 10,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/records/id/{debtId}/received',
            path: {
                'debtId': debtId,
            },
            query: {
                'page': page,
                'size': size,
            },
        });
    }
}
