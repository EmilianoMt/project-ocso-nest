import { IsArray, IsString, MaxLength } from "class-validator";
import { Region } from "../entities/region.entity";
import { ApiProperty } from "@nestjs/swagger";


export class CreateRegionDto extends Region {

    @ApiProperty({
        default: 'Region 1'
    })
    @IsString()
    @MaxLength(100)
    regionName: string;
    
    @ApiProperty({
        default: ['State 1', 'State 2']
    })
    @IsArray()
    regionStates: string[];
}
    