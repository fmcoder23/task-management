import { ApiResponseOptions } from '@nestjs/swagger';

export const UploadResponseSchemas = {
    fileUploaded: <ApiResponseOptions>{
        status: 201,
        description: 'File uploaded successfully',
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string', description: 'The name of the uploaded file' },
            },
        },
    },
    invalidFile: <ApiResponseOptions>{
        status: 400,
        description: 'Bad Request: Invalid file type or size',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 400 },
                message: { type: 'string', example: 'Invalid file type or size' },
                error: { type: 'string', example: 'Bad Request' },
            },
        },
    },
};
