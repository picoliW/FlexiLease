import { Exclude, Type } from "class-transformer";
import { Column, Entity, ObjectIdColumn } from "typeorm";
import { Accessory } from "./dtos/Acessory";
import { IsArray, ValidateNested } from "class-validator";

@Entity("cars")
class Car {
  @ObjectIdColumn()
  @Exclude()
  id: string;

  @Column()
  model: string;

  @Column()
  color: string;

  @Column()
  year: string;

  @Column()
  value_per_day: number;

  @Column("jsonb")
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Accessory)
  accessories: Accessory[];

  @Column()
  number_of_passengers: number;
}

export default Car;
