import { Repository } from "typeorm";
import User from "../entities/User";
import { dataSource } from "@shared/infra/typeorm";
import { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository";
import { ICreateUser } from "@modules/users/domain/models/ICreateUser";

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;
  constructor() {
    this.ormRepository = dataSource.getRepository(User);
  }

  public async create({
    name,
    cpf,
    birth,
    email,
    password,
    cep,
    qualified,
  }: ICreateUser): Promise<User> {
    const user = this.ormRepository.create({
      name,
      cpf,
      birth,
      email,
      password,
      cep,
      qualified,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    await this.ormRepository.save(user);
    return user;
  }
}

export default UsersRepository;
