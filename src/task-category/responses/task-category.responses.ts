import { ApiResponseOptions } from '@nestjs/swagger';

export const TaskCategoryResponseSchemas = {
    categoryCreated: <ApiResponseOptions>{
        status: 201,
        description: 'Task category created successfully',
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Task category created successfully' },
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', example: 'uuid' },
                        name: { type: 'string', example: 'Education' },
                        createdAt: { type: 'string', format: 'date-time', example: '2024-08-21T10:20:30Z' },
                        updatedAt: { type: 'string', format: 'date-time', example: '2024-08-21T10:20:30Z' },
                    },
                },
            },
        },
    },
    categoryConflict: <ApiResponseOptions>{
        status: 409,
        description: 'Conflict: Category with this name already exists',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 409 },
                message: { type: 'string', example: 'You already have a category with this name' },
                error: { type: 'string', example: 'Conflict' },
            },
        },
    },
    categoryRetrieved: <ApiResponseOptions>{
        status: 200,
        description: 'Task category retrieved successfully',
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Task category retrieved successfully' },
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', example: 'uuid' },
                        name: { type: 'string', example: 'Education' },
                        statusOverview: {
                            type: 'object',
                            properties: {
                                TODO: { type: 'number', example: 5 },
                                IN_PROGRESS: { type: 'number', example: 3 },
                                COMPLETED: { type: 'number', example: 7 },
                                EXPIRED: { type: 'number', example: 1 },
                            },
                        },
                        createdAt: { type: 'string', format: 'date-time', example: '2024-08-21T10:20:30Z' },
                        updatedAt: { type: 'string', format: 'date-time', example: '2024-08-21T10:20:30Z' },
                    },
                },
            },
        },
    },
    categoryNotFound: <ApiResponseOptions>{
        status: 404,
        description: 'Task category not found',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 404 },
                message: { type: 'string', example: 'Task category not found' },
                error: { type: 'string', example: 'Not Found' },
            },
        },
    },
    categoryDeleted: <ApiResponseOptions>{
        status: 200,
        description: 'Task category deleted successfully',
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Task category deleted successfully' },
            },
        },
    },
};
