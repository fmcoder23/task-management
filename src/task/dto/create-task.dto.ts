import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Priority } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {

    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => value.trim())
    @ApiProperty({ example: "Todo title" })
    title: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim())
    @ApiPropertyOptional({ example: "Todo description" })
    description: string;
    
    @IsOptional()
    @IsDate()
    @Transform(({ value }) => new Date(value))
    @ApiPropertyOptional({ example: new Date() })
    dueDate: Date;
    
    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim())
    @ApiPropertyOptional({ example: "photo_name.jpg" })
    photo: string;
    
    @IsOptional()
    @IsString()
    @IsEnum(Priority)
    @ApiPropertyOptional({ example: Priority.LOW })
    priority: Priority;
    
    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim())
    @ApiPropertyOptional({ example: "Category id" })
    categoryId: string;

}
