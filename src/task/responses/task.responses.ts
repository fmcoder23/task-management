import { ApiResponseOptions } from '@nestjs/swagger';

export const TaskResponseSchemas = {
    taskCreated: <ApiResponseOptions>{
        status: 201,
        description: 'Task created successfully',
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Task created successfully' },
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', example: 'uuid' },
                        title: { type: 'string', example: 'New Task' },
                        description: { type: 'string', example: 'This is a new task' },
                        priority: { type: 'string', example: 'HIGH' },
                        status: { type: 'string', example: 'TODO' },
                        createdAt: { type: 'string', format: 'date-time', example: '2024-08-21T10:20:30Z' },
                        updatedAt: { type: 'string', format: 'date-time', example: '2024-08-21T10:20:30Z' },
                    },
                },
            },
        },
    },
    taskRetrieved: <ApiResponseOptions>{
        status: 200,
        description: 'Tasks retrieved successfully',
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Tasks retrieved successfully' },
                data: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string', example: 'uuid' },
                            title: { type: 'string', example: 'New Task' },
                            description: { type: 'string', example: 'This is a new task' },
                            priority: { type: 'string', example: 'HIGH' },
                            status: { type: 'string', example: 'TODO' },
                            createdAt: { type: 'string', format: 'date-time', example: '2024-08-21T10:20:30Z' },
                            updatedAt: { type: 'string', format: 'date-time', example: '2024-08-21T10:20:30Z' },
                        },
                    },
                },
            },
        },
    },
    taskNotFound: <ApiResponseOptions>{
        status: 404,
        description: 'Task not found',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 404 },
                message: { type: 'string', example: 'Task not found' },
                error: { type: 'string', example: 'Not Found' },
            },
        },
    },
    taskUpdated: <ApiResponseOptions>{
        status: 200,
        description: 'Task updated successfully',
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Task updated successfully' },
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', example: 'uuid' },
                        title: { type: 'string', example: 'Updated Task' },
                        description: { type: 'string', example: 'This is an updated task' },
                        priority: { type: 'string', example: 'MEDIUM' },
                        status: { type: 'string', example: 'IN_PROGRESS' },
                        createdAt: { type: 'string', format: 'date-time', example: '2024-08-21T10:20:30Z' },
                        updatedAt: { type: 'string', format: 'date-time', example: '2024-08-21T10:20:30Z' },
                    },
                },
            },
        },
    },
    taskDeleted: <ApiResponseOptions>{
        status: 200,
        description: 'Task deleted successfully',
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Task deleted successfully' },
            },
        },
    },
};
