import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Region {
    @PrimaryGeneratedColumn('increment')
    regionId: number;

    @Column('text',{
        unique: true
    })
    regionName: string;

    @Column('text',{
        array: true
    })
    regionStates: string[];
}
