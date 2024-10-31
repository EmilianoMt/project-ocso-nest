import { IsEmail, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { Manager } from "../entities/manager.entity";
import { Location } from "src/locations/entities/location.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateManagerDto extends Manager{
    
    @ApiProperty({
        default: 'Juan Perez'
    })
    @IsString() 
    @MaxLength(80)  
    managerFullName: string;

    @ApiProperty({
        default: 1000
    })
    @IsNumber()
    managerSalary: number;
    
    @ApiProperty({
        default: 'JuanPez@gmail.com'
    })
    @IsString()
    @IsEmail()
    managerEmail: string;
    
    @ApiProperty({
        default: '1234567890'
    })
    @IsString()
    @MaxLength(16)
    managerPhoneNumber: string;

    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    location: Location;
}
