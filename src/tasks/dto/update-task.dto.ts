import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateTaskDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    title: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    description?: string;

    @IsOptional()
    @IsBoolean()
    completed?: boolean;
}