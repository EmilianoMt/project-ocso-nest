import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsOptional } from 'class-validator';
import { Product } from "src/products/entities/product.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Provider {


    @PrimaryGeneratedColumn('uuid')
    providerId: string;

    @ApiProperty({
        default: 'Coca Cola',
    })
    @Column('text')
    providerName: string;

    @ApiProperty({
        default: 'cocaColaBuisness@gmail.com',
    })
    @Column('text',{
        unique: true
    })
    providerEmail: string;

    @ApiProperty({
        default: '12345678',
    })
    @Column('text',{
        nullable: true,
    })
    providerPhoneNumber: string;

    @OneToMany(()=> Product, (product) => product.provider)
    products: Product[];
}
