import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Status } from '@prisma/client';

export class UpdateTaskDto extends CreateTaskDto {

    @IsOptional()
    @IsString()
    @IsEnum(Status)
    @ApiPropertyOptional({ example: Status.COMPLETED })
    status: Status;

}
