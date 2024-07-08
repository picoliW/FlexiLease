import { inject, injectable } from "tsyringe";
import { IReserveRepository } from "../domain/repositories/IReserveRepository";
import Reserve from "../infra/typeorm/entities/Reserve";
import { IListReserveParams } from "../domain/models/IListReserveParams";
import { IFilterParams } from "@modules/cars/domain/models/IFilterParams";

@injectable()
class ListReserveService {
  constructor(
    @inject("ReserveRepository")
    private reserveRepository: IReserveRepository,
  ) {}

  public async execute({
    limit,
    offset,
    filters,
  }: IListReserveParams & { filters?: IFilterParams }): Promise<{
    reserves: Reserve[];
    total: number;
  }> {
    const conditions: { [key: string]: any } = {};

    if (filters) {
      Object.keys(filters).forEach(key => {
        conditions[key] = filters[key];
      });
    }

    const [reserves, total] = await this.reserveRepository.findWithFilters(
      conditions,
      limit,
      offset,
    );

    return { reserves, total };
  }
}

export default ListReserveService;
