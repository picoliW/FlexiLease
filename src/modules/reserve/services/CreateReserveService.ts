import { inject, injectable } from "tsyringe";
import Reserve from "../infra/typeorm/entities/Reserve";
import { ICreateReserve } from "../domain/models/ICreateReserve";
import { IReserveRepository } from "../domain/repositories/IReserveRepository";
import { ICarRepository } from "@modules/cars/domain/repositories/ICarRepository";

import { differenceInDays, parse } from "date-fns";
import { ObjectId } from "mongodb";
import { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository";
import { ConflictError } from "@shared/errors/ConflictError";
import { NotFoundError } from "@shared/errors/NotFoundError";
import { BadRequestError } from "@shared/errors/BadRequestError";

@injectable()
class CreateReserveService {
  constructor(
    @inject("ReserveRepository")
    private reserveRepository: IReserveRepository,
    @inject("CarRepository")
    private carRepository: ICarRepository,
    @inject("UsersRepository")
    private userRepository: IUsersRepository,
  ) {}

  public async execute({
    id_user,
    start_date,
    end_date,
    id_car,
  }: ICreateReserve): Promise<Reserve> {
    const user = await this.userRepository.findById(new ObjectId(id_user));
    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (user.qualified !== "sim") {
      throw new BadRequestError("User does not have a valid drivers license");
    }

    const car = await this.carRepository.findById(new ObjectId(id_car));
    if (!car) {
      throw new NotFoundError("Car not found");
    }

    const startDate = parse(start_date, "dd/MM/yyyy", new Date());
    const endDate = parse(end_date, "dd/MM/yyyy", new Date());
    const days = differenceInDays(endDate, startDate);

    const existingReservations = await this.reserveRepository.findByCarAndDate(
      id_car,
      start_date,
      end_date,
    );
    if (existingReservations.length > 0) {
      throw new ConflictError("Car is already reserved for the selected dates");
    }

    const userReservations =
      await this.reserveRepository.findByUserAndDateRange(
        id_user,
        start_date,
        end_date,
      );
    if (userReservations.length > 0) {
      throw new ConflictError(
        "User already has a reservation for the selected dates",
      );
    }

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
