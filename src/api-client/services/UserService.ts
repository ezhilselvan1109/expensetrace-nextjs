/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse } from '../models/ApiResponse';
import type { UserRequestDto } from '../models/UserRequestDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserService {
    /**
     * Update user
     * Updates existing user info by ID.
     * @param id
     * @param requestBody
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static updateUser(
        id: string,
        requestBody: UserRequestDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/users/user/{id}/update',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Create a new user
     * Adds a new user. Throws error if email already exists.
     * @param requestBody
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static addUser(
        requestBody: UserRequestDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/users/add',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get current user
     * Returns user details from JWT token context.
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static getMe(): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/users/me',
        });
    }
    /**
     * Delete a user by ID
     * Deletes user by ID.
     * @param id
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static deleteUser(
        id: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/users/user/{id}/delete',
            path: {
                'id': id,
            },
        });
    }
}
