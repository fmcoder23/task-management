import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    @ApiProperty({ example: "john@gmail.com" })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: "12345" })
    password: string;
}
