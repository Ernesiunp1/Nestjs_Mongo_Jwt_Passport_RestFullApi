import { IsString, IsEmail } from "class-validator";
import { LoginUser } from "./user.interface";


export class LoginUserDto {
   
    @IsEmail()
    @IsString()
    email: string
    @IsString()
    password: string

}
