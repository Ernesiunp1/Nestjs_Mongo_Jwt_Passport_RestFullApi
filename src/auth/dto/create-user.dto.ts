import { IsString, IsEmail, IsBoolean, IsOptional, IsMongoId } from "class-validator";


export class CreateUserDto {

   @IsMongoId()
   @IsOptional()
   _id: string;

    @IsString()
    name: string

    @IsString()
    surname: string

    @IsEmail()
    @IsString()
    email: string

    @IsString()
    password: string

    @IsString()
    number: string

    @IsBoolean()
    @IsOptional()
    active: boolean

}


