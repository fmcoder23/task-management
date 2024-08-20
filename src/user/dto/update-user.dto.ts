import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UpdateUserDto {

    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => value.trim())
    @MinLength(3)
    @ApiProperty({ example: "John Doe" })
    fullname: string;

    @IsEmail()
    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    @ApiProperty({ example: "john@gmail.com" })
    email: string;

    @IsString()
    @MinLength(5)
    @ApiPropertyOptional({ example: "1234" })
    password: string;

    @IsString()
    @ApiPropertyOptional({ example: "photo_name.jpg" })
    @Transform(({ value }) => value.trim())
    photo: string;
}
