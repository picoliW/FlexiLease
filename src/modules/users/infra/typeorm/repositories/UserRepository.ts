import { Repository } from "typeorm";
import User from "../entities/User";
import { dataSource } from "@shared/infra/typeorm";
import { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository";
import { ICreateUser } from "@modules/users/domain/models/ICreateUser";
import { ObjectId } from "mongodb";

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
    patio,
    complement,
    neighborhood,
    locality,
    uf,
  }: ICreateUser): Promise<User> {
    const user = this.ormRepository.create({
      name,
      cpf,
      birth,
      email,
      password,
      cep,
      qualified,
      patio,
      complement,
      neighborhood,
      locality,
      uf,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    await this.ormRepository.save(user);
    return user;
  }

  public async findById(id: ObjectId): Promise<User | null> {
    const user = await this.ormRepository.findOne({
      where: { _id: id },
    });
    return user;
  }

  public async find(): Promise<User[]> {
    const users = await this.ormRepository.find();
    return users;
  }

  public async remove(user: User): Promise<void> {
    await this.ormRepository.remove(user);
  }

  public async update(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async findByCPF(cpf: string): Promise<User | null> {
    const user = await this.ormRepository.findOne({
      where: { cpf },
    });
    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });
    return user;
  }
}

export default UsersRepository;
