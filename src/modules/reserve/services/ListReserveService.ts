import { inject, injectable } from "tsyringe";
import { IReserveRepository } from "../domain/repositories/IReserveRepository";
import Reserve from "../infra/typeorm/entities/Reserve";
import { IListReserveParams } from "../domain/models/IListReserveParams";

@injectable()
class ListReserveService {
  constructor(
    @inject("ReserveRepository")
    private reserveRepository: IReserveRepository,
  ) {}

  public async execute({
    limit,
    offset,
  }: IListReserveParams): Promise<{ reserves: Reserve[]; total: number }> {
    const [reserves, total] = await this.reserveRepository.findWithPagination(
      limit,
      offset,
    );

    return { reserves, total };
  }
}

export default ListReserveService;
