import Reserve from "@modules/reserve/infra/typeorm/entities/Reserve";
import { ICreateReserve } from "../models/ICreateReserve";
import { ObjectId } from "mongodb";

export interface IReserveRepository {
  create({
    id_user,
    start_date,
    end_date,
    id_car,
  }: ICreateReserve): Promise<Reserve>;
  save(reserve: Reserve): Promise<Reserve>;
  findByCarAndDate(
    id_car: string,
    start_date: string,
    end_date: string,
  ): Promise<Reserve[]>;
  findByUserAndDateRange(
    id_user: string,
    start_date: string,
    end_date: string,
  ): Promise<Reserve[]>;
  find(): Promise<Reserve[]>;
  findByParams(params: Record<string, any>): Promise<Reserve[]>;
  findWithPagination(
    limit: number,
    offset: number,
  ): Promise<[Reserve[], number]>;
  findById(id: ObjectId): Promise<Reserve | null>;
  update(reserve: Reserve): Promise<Reserve>;
  remove(reserve: Reserve): Promise<void>;
}
