import { Repository } from "typeorm";
import { dataSource } from "@shared/infra/typeorm";
import Reserve from "../entities/Reserve";
import { ICreateReserve } from "@modules/reserve/domain/models/ICreateReserve";
import { IReserveRepository } from "@modules/reserve/domain/repositories/IReserveRepository";

class ReserveRepository implements IReserveRepository {
  private ormRepository: Repository<Reserve>;
  constructor() {
    this.ormRepository = dataSource.getRepository(Reserve);
  }

  public async create({
    id_user,
    start_date,
    end_date,
    id_car,
    final_value,
  }: ICreateReserve): Promise<Reserve> {
    const reserve = this.ormRepository.create({
      id_user,
      start_date,
      end_date,
      id_car,
      final_value,
    });

    await this.ormRepository.save(reserve);

    return reserve;
  }

  public async save(reserve: Reserve): Promise<Reserve> {
    await this.ormRepository.save(reserve);
    return reserve;
  }
}

export default ReserveRepository;
