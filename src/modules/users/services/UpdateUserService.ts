import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { ObjectId } from "mongodb";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import User from "../infra/typeorm/entities/User";
import { NotFoundError } from "@shared/errors/NotFoundError";
import { IUpdateUser } from "../domain/models/IUpdateUser";

@injectable()
class UpdateUserService {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,
  ) {}

  public async execute({
    _id,
    name,
    cpf,
    birth,
    email,
    password,
    cep,
    qualified,
  }: IUpdateUser): Promise<Partial<User>> {
    const user = await this.userRepository.findById(new ObjectId(_id));

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const updatedFields: Partial<User> = {};

    if (name) {
      user.name = name;
      updatedFields.name = name;
    }
    if (cpf) {
      user.cpf = cpf;
      updatedFields.cpf = cpf;
    }
    if (birth) {
      user.birth = birth;
      updatedFields.birth = birth;
    }
    if (email) {
      user.email = email;
      updatedFields.email = email;
    }
    if (password) {
      user.password = password;
      updatedFields.password = password;
    }
    if (cep) {
      user.cep = cep;
      updatedFields.cep = cep;
    }
    if (qualified) {
      user.qualified = qualified;
      updatedFields.qualified = qualified;
    }

    await this.userRepository.save(user);

    return updatedFields;
  }
}

export default UpdateUserService;
