import { inject, injectable } from "tsyringe";
import Reserve from "../infra/typeorm/entities/Reserve";
import { ICreateReserve } from "../domain/models/ICreateReserve";
import { IReserveRepository } from "../domain/repositories/IReserveRepository";
import { ICarRepository } from "@modules/cars/domain/repositories/ICarRepository";
import { differenceInDays, parse } from "date-fns";
import { ObjectId } from "mongodb";

@injectable()
class CreateReserveService {
  constructor(
    @inject("ReserveRepository")
    private reserveRepository: IReserveRepository,
    @inject("CarRepository")
    private carRepository: ICarRepository,
  ) {}

  public async execute({
    id_user,
    start_date,
    end_date,
    id_car,
  }: ICreateReserve): Promise<Reserve> {
    const car = await this.carRepository.findById(new ObjectId(id_car));

    if (!car) {
      throw new Error("Car not found");
    }

    const startDate = parse(start_date, "dd/MM/yyyy", new Date());
    const endDate = parse(end_date, "dd/MM/yyyy", new Date());
    const days = differenceInDays(endDate, startDate);
    const final_value = (car.value_per_day * days).toFixed(2);

    const reserve = await this.reserveRepository.create({
      id_user,
      start_date,
      end_date,
      id_car,
      final_value,
    });

    await this.reserveRepository.save(reserve);

    return reserve;
  }
}

export default CreateReserveService;
