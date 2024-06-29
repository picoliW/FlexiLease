import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import { ICreateUser } from "../domain/models/ICreateUser";
import User from "../infra/typeorm/entities/User";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}
  public async execute({
    name,
    cpf,
    birth,
    email,
    password,
    cep,
    qualified,
  }: ICreateUser): Promise<User> {
    const user = await this.usersRepository.create({
      name,
      cpf,
      birth,
      email,
      password,
      cep,
      qualified,
    });

    await this.usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
