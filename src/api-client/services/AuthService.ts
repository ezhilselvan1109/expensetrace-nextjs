/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse } from '../models/ApiResponse';
import type { LoginRequestDto } from '../models/LoginRequestDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * User logout
     * Logs out the current user by clearing the JWT cookie.
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static logout(): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/logout',
        });
    }
    /**
     * User login
     * Authenticates the user with email and password, and sets a JWT in an HTTP-only cookie upon successful login.
     * @param requestBody
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static login(
        requestBody: LoginRequestDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
