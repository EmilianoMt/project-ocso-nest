import { IsInt, IsNumber, IsObject, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { Provider } from "src/providers/entities/provider.entity";
import { Product } from "../entities/product.entity";

export class CreateProductDto extends Product{
    @IsString()
    @IsUUID('4')
    @IsOptional()
    productId: string;

    @IsString()
    @MaxLength(40)
    productName: string;
    
    @IsNumber()
    price: number;	
    
    @IsInt()
    countSeal: number;
    
    @IsObject()
    provider: Provider;
}
