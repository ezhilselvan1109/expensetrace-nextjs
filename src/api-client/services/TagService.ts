/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse } from '../models/ApiResponse';
import type { TagRequestDto } from '../models/TagRequestDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TagService {
    /**
     * Update a tag by ID
     * Updates the tag with the specified ID using the provided details. Throws an error if the tag is not found.
     * @param id
     * @param requestBody
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static updateTag(
        id: string,
        requestBody: TagRequestDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/tags/tag/{id}/update',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Create a new tag
     * Adds a new tag for the authenticated user. Throws an error if the tag already exists.
     * @param requestBody
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static addTag(
        requestBody: TagRequestDto,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/tags/add',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get a tag by ID
     * Fetches a specific tag by its ID. Throws an error if the tag is not found.
     * @param id
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static getTagById(
        id: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/tags/tag/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Get all tags for the authenticated user
     * Returns a list of all tags created by the currently authenticated user.
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static getAllTagsByUser(): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/tags/all',
        });
    }
    /**
     * Delete a tag by ID
     * Deletes the tag with the specified ID. Throws an error if the tag is not found.
     * @param id
     * @returns ApiResponse OK
     * @throws ApiError
     */
    public static deleteTag(
        id: string,
    ): CancelablePromise<ApiResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/tags/tag/{id}/delete',
            path: {
                'id': id,
            },
        });
    }
}
