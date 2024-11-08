import { IsInt, IsNumber, IsObject, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { Provider } from "src/providers/entities/provider.entity";
import { Product } from "../entities/product.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateProductDto extends Product{
    @ApiProperty({
        default: 'UUID'
    })
    @IsString()
    @IsUUID('4')
    @IsOptional()
    productId: string;

    @ApiProperty({
        default: 'Producto 1'
    })
    @IsString()
    @MaxLength(40)
    productName: string;
    
    @ApiProperty({
        default: 10
    })
    @IsNumber()
    price: number;	
    
    @ApiProperty({
        default: 2
    })
    @IsInt()
    countSeal: number;
    
    @ApiPropertyOptional()	
    @IsString()
    provider: Provider | string;
}
