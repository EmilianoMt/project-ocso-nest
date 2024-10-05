import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsOptional } from 'class-validator';
import { Product } from "src/products/entities/product.entity";

@Entity()
export class Provider {


    @PrimaryGeneratedColumn('uuid')
    providerId: string;

    @Column('text')
    providerName: string;

    @Column('text',{
        unique: true
    })
    providerEmail: string;

    @Column('text',{
        nullable: true,
    })
    providerPhoneNumber: string;

    @OneToMany(()=> Product, (product) => product.provider)
    products: Product[];
}
