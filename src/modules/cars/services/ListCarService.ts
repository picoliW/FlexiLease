import { inject, injectable } from "tsyringe";
import { ICarRepository } from "../domain/repositories/ICarRepository";
import Car from "../infra/typeorm/entities/Cars";
import { IListCarsParams } from "../domain/models/IListCarsParams";

@injectable()
class ListCarService {
  constructor(
    @inject("CarRepository")
    private carRepository: ICarRepository,
  ) {}
  public async execute({
    limit,
    offset,
  }: IListCarsParams): Promise<{ cars: Car[]; total: number }> {
    const [cars, total] = await this.carRepository.findWithPagination(
      limit,
      offset,
    );

    return { cars, total };
  }
}

export default ListCarService;
