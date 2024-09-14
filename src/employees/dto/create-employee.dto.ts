import { IsEmail, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateEmployeeDto {
    @IsString()
    @IsUUID('4')
    @IsOptional()    
    id: string;
    
    @IsString()
    @MaxLength(20)
    name: string;
    
    @IsString()
    @MaxLength(20)
    lastName: string;
    
    @MaxLength(10)
    @IsString()
    phoneNumber: string;

    @IsString()
    @IsEmail()
    email: string;
}
