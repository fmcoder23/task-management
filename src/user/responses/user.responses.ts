import { ApiResponseOptions } from '@nestjs/swagger';

export const UserResponseSchemas = {
    userRetrieved: <ApiResponseOptions>{
        status: 200,
        description: 'User details retrieved successfully',
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Success' },
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', example: 'uuid' },
                        fullname: { type: 'string', example: 'John Doe' },
                        email: { type: 'string', example: 'john@gmail.com' },
                        photo: { type: 'string', example: 'photo_name.jpg' },
                        createdAt: { type: 'string', format: 'date-time', example: '2024-08-21T10:20:30Z' },
                        updatedAt: { type: 'string', format: 'date-time', example: '2024-08-21T10:20:30Z' },
                    },
                },
            },
        },
    },
    userNotFound: <ApiResponseOptions>{
        status: 404,
        description: 'User not found',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 404 },
                message: { type: 'string', example: 'User not found' },
                error: { type: 'string', example: 'Not Found' },
            },
        },
    },
    userUpdated: <ApiResponseOptions>{
        status: 200,
        description: 'User updated successfully',
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string', example: 'User updated successfully' },
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', example: 'uuid' },
                        fullname: { type: 'string', example: 'John Doe' },
                        email: { type: 'string', example: 'john@gmail.com' },
                        photo: { type: 'string', example: 'photo_name.jpg' },
                        createdAt: { type: 'string', format: 'date-time', example: '2024-08-21T10:20:30Z' },
                        updatedAt: { type: 'string', format: 'date-time', example: '2024-08-21T10:20:30Z' },
                    },
                },
            },
        },
    },
};
