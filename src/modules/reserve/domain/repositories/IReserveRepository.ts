import Reserve from "@modules/reserve/infra/typeorm/entities/Reserve";
import { ICreateReserve } from "../models/ICreateReserve";

export interface IReserveRepository {
  create({
    id_user,
    start_date,
    end_date,
    id_car,
  }: ICreateReserve): Promise<Reserve>;
  save(reserve: Reserve): Promise<Reserve>;
}
