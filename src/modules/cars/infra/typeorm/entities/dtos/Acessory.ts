import { IsString } from "class-validator";

export class Accessory {
  @IsString()
  description: string;
}
