import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTaskCategoryDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Sports' })
    @Transform(({ value }) => value.trim())
    name: string;

}
