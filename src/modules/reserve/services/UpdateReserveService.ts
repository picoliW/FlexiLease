import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { NotFoundError } from "@shared/errors/NotFoundError";
import { ObjectId } from "mongodb";
import { IReserveRepository } from "../domain/repositories/IReserveRepository";
import { ICarRepository } from "@modules/cars/domain/repositories/ICarRepository";
import Reserve from "../infra/typeorm/entities/Reserve";
import { IUpdateReserve } from "../domain/models/IUpdateReserve";
import { differenceInDays, parse } from "date-fns";

@injectable()
class UpdateReserveService {
  constructor(
    @inject("ReserveRepository")
    private reserveRepository: IReserveRepository,
    @inject("CarRepository")
    private carRepository: ICarRepository,
  ) {}

  public async execute({
    _id,
    id_user,
    start_date,
    end_date,
  }: IUpdateReserve): Promise<Reserve> {
    const reserve = await this.reserveRepository.findById(new ObjectId(_id));
    if (!reserve) {
      throw new NotFoundError("Reserve not found");
    }

    if (id_user) reserve.id_user = id_user;
    if (start_date) reserve.start_date = start_date;
    if (end_date) reserve.end_date = end_date;

    const car = await this.carRepository.findById(new ObjectId(reserve.id_car));
    if (!car) {
      throw new NotFoundError("Car not found");
    }

    if (reserve.start_date && reserve.end_date) {
      const startDate = parse(reserve.start_date, "dd/MM/yyyy", new Date());
      const endDate = parse(reserve.end_date, "dd/MM/yyyy", new Date());
      const days = differenceInDays(endDate, startDate);

      const final_value = (car.value_per_day * days).toFixed(2);
      reserve.final_value = final_value;
    }

    await this.reserveRepository.save(reserve);

    return reserve;
  }
}

export default UpdateReserveService;
