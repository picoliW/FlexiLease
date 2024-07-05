import { Exclude } from "class-transformer";
import { IsString } from "class-validator";
import { ObjectId } from "mongodb";

export class Accessory {
  @IsString()
  id: ObjectId;

  @IsString()
  description: string;
}
