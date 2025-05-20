/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse } from '../models/ApiResponse';
import type { CategoryRequestDto } from '../models/CategoryRequestDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CategoryService {
    /**
     * Get category by ID
     * Fetches a specific category owned by the user
     * @param id
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static getCategoryById(
        id: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/categories/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update category
     * Updates an existing category owned by the user
     * @param id
     * @param requestBody
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static updateCategory(
        id: string,
        requestBody: CategoryRequestDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/categories/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete category by ID
     * Deletes a category owned by the user
     * @param id
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static deleteCategory(
        id: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/categories/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Get all categories
     * Retrieves all categories for the authenticated user
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static getAllCategories(): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/categories',
        });
    }
    /**
     * Add a category
     * Creates a new category for the authenticated user
     * @param requestBody
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static addCategory(
        requestBody: CategoryRequestDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/categories',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
