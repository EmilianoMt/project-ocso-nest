import { ApiProperty } from "@nestjs/swagger";
import { Employee } from "src/employees/entities/employee.entity";
import { Manager } from "src/managers/entities/manager.entity";
import { Region } from "src/regions/entities/region.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Location {
    @PrimaryGeneratedColumn('increment')
    locationId: number;

    @ApiProperty({
        default: 'OCSO JUAREZ',
    })
    @Column('text')
    locationName: string;

    @ApiProperty({
        default: 'Av. 1, S/N, Col. Centro, 77500 ',
    })
    @Column('text')
    locationAddress: string;

    @ApiProperty({
        default: [23,11],
    })
    @Column('int',{
        array: true
    }
        
    )
    locationLatLng: number[];
    
    @OneToOne(()=>Manager,{
        eager: true
    })
    @JoinColumn({
        name: 'managerId',   
    })
    manager: Manager | string;

    @ManyToOne(()=>Region, (region)=> region.locations)
    @JoinColumn({
        name: 'regionId'
    })
    region: Region;

    @OneToMany(() => Employee, (employee) => employee.location)
    employees: Employee[];
}
