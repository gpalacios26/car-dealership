import { IsString, MinLength } from "class-validator";

export class CreateCarDto {

    @IsString()
    @MinLength(2)
    readonly brand: string;

    @IsString()
    @MinLength(2)
    readonly model: string;
}