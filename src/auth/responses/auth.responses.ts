import { ApiResponseOptions } from '@nestjs/swagger';

export const AuthResponseSchemas = {
    userRegistered: <ApiResponseOptions>{
        status: 201,
        description: 'User successfully registered',
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string', example: 'User successfully registered' },
                token: { type: 'string', example: 'jwt-token' },
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', example: 'uuid' },
                        fullname: { type: 'string', example: 'John Doe' },
                        email: { type: 'string', example: 'john@gmail.com' },
                        createdAt: { type: 'string', format: 'date-time', example: new Date() },
                        updatedAt: { type: 'string', format: 'date-time', example: new Date() },
                    },
                },
            },
        },
    },
    userLogin: <ApiResponseOptions>{
        status: 200,
        description: 'User successfully logged in',
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string', example: 'User successfully logged in' },
                token: { type: 'string', example: 'jwt-token' },
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', example: 'uuid' },
                        fullname: { type: 'string', example: 'John Doe' },
                        email: { type: 'string', example: 'john@gmail.com' },
                        createdAt: { type: 'string', format: 'date-time', example: new Date() },
                        updatedAt: { type: 'string', format: 'date-time', example: new Date() },
                    },
                },
            },
        },
    },
    emailConflict: <ApiResponseOptions>{
        status: 409,
        description: 'Email already exists',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 409 },
                message: { type: 'string', example: 'Email already exists' },
                error: { type: 'string', example: 'Conflict' },
            },
        },
    },
    unauthorized: <ApiResponseOptions>{
        status: 401,
        description: 'Incorrect email or password',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 401 },
                message: { type: 'string', example: 'Incorrect email or password' },
                error: { type: 'string', example: 'Unauthorized' },
            },
        },
    },
};
