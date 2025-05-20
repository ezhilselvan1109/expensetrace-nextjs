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
     * Update an existing user
     * Updates user information for the specified ID with the provided details.
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
     * Adds a new user to the system. Throws an error if the user already exists.
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
     * Retrieve a user by ID
     * Fetches a user from the database using the provided user ID.
     * @param id
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static getUserById(
        id: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/users/user/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Delete a user by ID
     * Removes a user from the system based on the provided user ID.
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
