// ListCarService.ts
import { inject, injectable } from "tsyringe";
import { ICarRepository } from "../domain/repositories/ICarRepository";
import Car from "../infra/typeorm/entities/Cars";
import { IListCarsParams } from "../domain/models/IListCarsParams";
import { IFilterParams } from "../domain/models/IFilterParams";

@injectable()
class ListCarService {
  constructor(
    @inject("CarRepository")
    private carRepository: ICarRepository,
  ) {}

  public async execute({
    limit,
    offset,
    filters,
  }: IListCarsParams & { filters?: IFilterParams }): Promise<{
    cars: Car[];
    total: number;
  }> {
    const conditions: { [key: string]: any } = {};

    if (filters) {
      Object.keys(filters).forEach(key => {
        conditions[key] = filters[key];
      });
    }

    const [cars, total] = await this.carRepository.findWithFilters(
      conditions,
      limit,
      offset,
    );

    return { cars, total };
  }
}

export default ListCarService;
